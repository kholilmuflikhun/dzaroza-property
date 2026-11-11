import { createHash } from "node:crypto";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  getOrder: vi.fn(),
  isRedisConfigured: vi.fn(),
  updateOrder: vi.fn(),
}));

vi.mock("@/lib/redis", () => ({
  getOrder: mocks.getOrder,
  isRedisConfigured: mocks.isRedisConfigured,
  updateOrder: mocks.updateOrder,
}));

import { POST } from "./route";

const SERVER_KEY = "test-midtrans-server-key";

function signedPayload(overrides: Record<string, unknown> = {}) {
  const order_id = "DZAROZA-TEST-123";
  const status_code = "200";
  const gross_amount = "100000.00";
  const signature_key = createHash("sha512")
    .update(`${order_id}${status_code}${gross_amount}${SERVER_KEY}`)
    .digest("hex");
  return {
    order_id,
    status_code,
    gross_amount,
    signature_key,
    transaction_status: "settlement",
    ...overrides,
  };
}

function request(payload: unknown) {
  return new Request("http://localhost/api/checkout/notification", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  }) as never;
}

describe("Midtrans notification webhook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.MIDTRANS_SERVER_KEY = SERVER_KEY;
    mocks.isRedisConfigured.mockReturnValue(true);
    mocks.getOrder.mockResolvedValue({
      orderId: "DZAROZA-TEST-123",
      grossAmount: 100000,
      status: "pending",
    });
    mocks.updateOrder.mockResolvedValue({});
  });

  it("fails closed when the Midtrans server key is missing", async () => {
    delete process.env.MIDTRANS_SERVER_KEY;
    const response = await POST(request(signedPayload()));
    expect(response.status).toBe(503);
    expect(mocks.getOrder).not.toHaveBeenCalled();
  });

  it("rejects invalid signatures before looking up an order", async () => {
    const response = await POST(request(signedPayload({ signature_key: "0".repeat(128) })));
    expect(response.status).toBe(403);
    expect(mocks.getOrder).not.toHaveBeenCalled();
    expect(mocks.updateOrder).not.toHaveBeenCalled();
  });

  it("marks a correctly signed settlement as paid", async () => {
    const response = await POST(request(signedPayload()));
    expect(response.status).toBe(200);
    expect(mocks.updateOrder).toHaveBeenCalledWith("DZAROZA-TEST-123", {
      status: "paid",
      transactionStatus: "settlement",
    });
  });

  it("does not mark a challenged card capture as paid", async () => {
    const response = await POST(request(signedPayload({
      transaction_status: "capture",
      fraud_status: "challenge",
    })));
    expect(response.status).toBe(200);
    expect((await response.json()).ignored).toBe(true);
    expect(mocks.updateOrder).not.toHaveBeenCalled();
  });

  it("ignores inherited object property names as transaction statuses", async () => {
    const response = await POST(request(signedPayload({ transaction_status: "__proto__" })));
    expect(response.status).toBe(200);
    expect((await response.json()).ignored).toBe(true);
    expect(mocks.updateOrder).not.toHaveBeenCalled();
  });

  it("does not downgrade a terminal order on a delayed pending notification", async () => {
    mocks.getOrder.mockResolvedValue({
      orderId: "DZAROZA-TEST-123",
      grossAmount: 100000,
      status: "failed",
    });
    const response = await POST(request(signedPayload({ transaction_status: "pending" })));
    expect(response.status).toBe(200);
    expect(mocks.updateOrder).not.toHaveBeenCalled();
  });

  it("does not downgrade a paid order on a delayed failure notification", async () => {
    mocks.getOrder.mockResolvedValue({
      orderId: "DZAROZA-TEST-123",
      grossAmount: 100000,
      status: "paid",
    });
    const response = await POST(request(signedPayload({ transaction_status: "deny" })));
    expect(response.status).toBe(200);
    expect(mocks.updateOrder).not.toHaveBeenCalled();
  });
});
