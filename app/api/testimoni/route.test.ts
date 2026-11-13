import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  getServerSession: vi.fn(),
  getSheetsClient: vi.fn(),
  getTestimonials: vi.fn(),
  checkRateLimit: vi.fn(),
  cleanupRateLimitEntries: vi.fn(),
  getClientAddress: vi.fn(),
  append: vi.fn(),
}));

vi.mock("next-auth", () => ({ getServerSession: mocks.getServerSession }));
vi.mock("@/lib/auth", () => ({ authOptions: {} }));
vi.mock("@/lib/testimonials.server", () => ({
  getSheetsClient: mocks.getSheetsClient,
  getTestimonials: mocks.getTestimonials,
}));
vi.mock("@/lib/rate-limit", () => ({
  checkRateLimit: mocks.checkRateLimit,
  cleanupRateLimitEntries: mocks.cleanupRateLimitEntries,
  getClientAddress: mocks.getClientAddress,
}));
vi.mock("@/lib/redis", () => ({ isRedisConfigured: vi.fn(() => true) }));

import { POST } from "./route";

const payload = (overrides: Record<string, unknown> = {}) => ({
  name: "Nama dari form",
  email: "verified@example.com",
  phone: "081234567890",
  address: "Purbalingga",
  rating: 5,
  message: "Pelayanan sangat baik",
  photo: null,
  ...overrides,
});
const request = (body: unknown) => new Request("http://localhost/api/testimoni", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify(body),
}) as never;

describe("POST /api/testimoni identity and abuse controls", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.getServerSession.mockResolvedValue({
      user: { name: "Nama Terverifikasi", email: "verified@example.com", image: "https://lh3.googleusercontent.com/avatar.jpg" },
    });
    mocks.checkRateLimit.mockResolvedValue({ allowed: true, retryAfterSeconds: 0 });
    mocks.getClientAddress.mockReturnValue("203.0.113.10");
    mocks.getSheetsClient.mockReturnValue({
      sheets: { spreadsheets: { values: { append: mocks.append } } },
      spreadsheetId: "spreadsheet-test",
    });
  });

  it("requires an authenticated Google account", async () => {
    mocks.getServerSession.mockResolvedValue(null);
    const response = await POST(request(payload()));
    expect(response.status).toBe(401);
    expect(mocks.checkRateLimit).not.toHaveBeenCalled();
    expect(mocks.append).not.toHaveBeenCalled();
  });

  it("rejects an email that does not match the authenticated account", async () => {
    const response = await POST(request(payload({ email: "someone-else@example.com" })));
    expect(response.status).toBe(403);
    expect(mocks.append).not.toHaveBeenCalled();
  });

  it("fails closed when Google Sheets storage is unavailable", async () => {
    mocks.getSheetsClient.mockReturnValue(null);
    const response = await POST(request(payload()));
    const body = await response.json();

    expect(response.status).toBe(503);
    expect(body.success).toBe(false);
    expect(body.message).toContain("belum terkirim");
    expect(mocks.append).not.toHaveBeenCalled();
  });

  it("stores the verified Google identity rather than caller-supplied identity fields", async () => {
    const response = await POST(request(payload({ name: "Nama Palsu" })));
    expect(response.status).toBe(201);
    const values = mocks.append.mock.calls[0]?.[0].requestBody.values[0];
    expect(values[1]).toBe("Nama Terverifikasi");
    expect(values[2]).toBe("verified@example.com");
    expect(values[7]).toBe("https://lh3.googleusercontent.com/avatar.jpg");
    expect(mocks.checkRateLimit).toHaveBeenCalledWith(
      "testimoni:verified@example.com:203.0.113.10",
      { limit: 3, windowMs: 60 * 60 * 1000 },
    );
  });
});
