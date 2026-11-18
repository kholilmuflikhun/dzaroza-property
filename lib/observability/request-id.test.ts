import { describe, expect, it } from "vitest";
import { getRequestId } from "./request-id";

describe("request correlation ID", () => {
  it("preserves a valid incoming request ID", () => {
    const request = new Request("https://example.test", { headers: { "x-request-id": "req_12345678" } });
    expect(getRequestId(request)).toBe("req_12345678");
  });

  it("replaces malformed request IDs with a UUID", () => {
    const request = new Request("https://example.test", { headers: { "x-request-id": "bad id" } });
    expect(getRequestId(request)).toMatch(/^[0-9a-f-]{36}$/i);
  });
});
