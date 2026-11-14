import { describe, expect, it } from "vitest";
import { readBoundedBody, readBoundedJson } from "./request-body";

describe("readBoundedBody", () => {
  it("accepts a body within the byte limit without relying on Content-Length", async () => {
    const request = new Request("https://example.test", {
      method: "POST",
      body: JSON.stringify({ ok: true }),
    });

    const result = await readBoundedBody(request, 32);
    expect(result.ok).toBe(true);
    if (result.ok) expect(new TextDecoder().decode(result.bytes)).toBe('{"ok":true}');
  });

  it("rejects an oversized streamed body even when Content-Length is absent", async () => {
    const request = new Request("https://example.test", {
      method: "POST",
      body: "x".repeat(33),
    });

    const result = await readBoundedBody(request, 32);
    expect(result).toMatchObject({ ok: false, status: 413 });
  });

  it("rejects an oversized declared Content-Length before reading", async () => {
    const request = new Request("https://example.test", {
      method: "POST",
      headers: { "content-length": "100" },
      body: "small",
    });

    const result = await readBoundedBody(request, 32);
    expect(result).toMatchObject({ ok: false, status: 413 });
  });
});

describe("readBoundedJson", () => {
  it("parses valid JSON", async () => {
    const request = new Request("https://example.test", {
      method: "POST",
      body: JSON.stringify({ slug: "e-book" }),
    });

    await expect(readBoundedJson(request, 128)).resolves.toMatchObject({
      ok: true,
      value: { slug: "e-book" },
    });
  });

  it("rejects malformed JSON", async () => {
    const request = new Request("https://example.test", {
      method: "POST",
      body: "{",
    });

    await expect(readBoundedJson(request, 128)).resolves.toMatchObject({
      ok: false,
      status: 400,
    });
  });
});
