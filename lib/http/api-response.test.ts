import { describe, expect, it } from "vitest";
import { ApiError } from "./api-error";
import { errorResponse, successResponse } from "./api-response";

describe("HTTP response contracts", () => {
  it("wraps successful data in a stable envelope", async () => {
    const response = successResponse({ id: "lead_123" });
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ ok: true, data: { id: "lead_123" } });
  });

  it("maps known API errors without exposing implementation details", async () => {
    const response = errorResponse(new ApiError("Permintaan tidak valid.", 422, "VALIDATION_ERROR"), "req_12345678");
    expect(response.status).toBe(422);
    await expect(response.json()).resolves.toMatchObject({
      ok: false,
      error: { code: "VALIDATION_ERROR", message: "Permintaan tidak valid.", requestId: "req_12345678" },
    });
  });

  it("hides unknown server error messages", async () => {
    const response = errorResponse(new Error("database password leaked"));
    expect(response.status).toBe(500);
    const body = await response.json();
    expect(body.error.message).not.toContain("database password");
  });
});
