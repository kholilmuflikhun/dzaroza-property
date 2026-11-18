import { describe, expect, it } from "vitest";
import { getPublicEnv, getServerEnv } from "./env";

describe("runtime environment contracts", () => {
  it("provides safe defaults for local public configuration", () => {
    expect(getPublicEnv({} as NodeJS.ProcessEnv)).toMatchObject({
      NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
      NEXT_PUBLIC_WHATSAPP_PRIMARY: "",
      NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION: "false",
    });
  });

  it("rejects malformed public site URLs", () => {
    expect(() => getPublicEnv({ NEXT_PUBLIC_SITE_URL: "not-a-url" } as NodeJS.ProcessEnv)).toThrow();
  });

  it("defaults optional server integrations without requiring production secrets", () => {
    expect(getServerEnv({} as NodeJS.ProcessEnv)).toMatchObject({
      ADMIN_EMAILS: "",
      MIDTRANS_IS_PRODUCTION: "false",
      GOOGLE_SHEETS_ORDER_RANGE: "Order!A:G",
    });
  });

  it("rejects malformed integration URLs when configured", () => {
    expect(() => getServerEnv({ UPSTASH_REDIS_REST_URL: "invalid" } as NodeJS.ProcessEnv)).toThrow();
  });
});
