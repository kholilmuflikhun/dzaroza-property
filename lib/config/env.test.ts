import { describe, expect, it } from "vitest";
import { publicEnvSchema, serverEnvSchema } from "./env-schema";

describe("runtime environment contracts", () => {
  it("provides safe defaults for local public configuration", () => {
    expect(publicEnvSchema.parse({})).toMatchObject({
      NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
      NEXT_PUBLIC_WHATSAPP_PRIMARY: "",
      NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION: "false",
    });
  });

  it("rejects malformed public site URLs", () => {
    expect(() => publicEnvSchema.parse({ NEXT_PUBLIC_SITE_URL: "not-a-url" })).toThrow();
  });

  it("defaults optional server integrations without requiring production secrets", () => {
    expect(serverEnvSchema.parse({})).toMatchObject({
      ADMIN_EMAILS: "",
      MIDTRANS_IS_PRODUCTION: "false",
      GOOGLE_SHEETS_ORDER_RANGE: "Order!A:G",
    });
  });

  it("rejects malformed integration URLs when configured", () => {
    expect(() => serverEnvSchema.parse({ UPSTASH_REDIS_REST_URL: "invalid" })).toThrow();
  });
});
