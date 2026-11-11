import { describe, expect, it } from "vitest";
import { getClientAddress } from "./rate-limit";

describe("trusted client address extraction", () => {
  it("prefers the Cloudflare edge-provided connecting IP", () => {
    const request = new Request("https://example.test", {
      headers: {
        "cf-connecting-ip": "203.0.113.10",
        "x-real-ip": "203.0.113.20",
        "x-forwarded-for": "198.51.100.99, 203.0.113.20",
      },
    });
    expect(getClientAddress(request)).toBe("203.0.113.10");
  });

  it("uses the trusted reverse-proxy real IP when Cloudflare is absent", () => {
    const request = new Request("https://example.test", {
      headers: {
        "x-real-ip": "203.0.113.20",
        "x-forwarded-for": "198.51.100.99, 203.0.113.20",
      },
    });
    expect(getClientAddress(request)).toBe("203.0.113.20");
  });

  it("does not trust a caller-controlled forwarded-for value by itself", () => {
    const request = new Request("https://example.test", {
      headers: { "x-forwarded-for": "198.51.100.99" },
    });
    expect(getClientAddress(request)).toBe("unknown");
  });
});
