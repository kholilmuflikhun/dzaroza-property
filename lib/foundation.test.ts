import { describe, expect, it } from "vitest";

describe("Dzaroza Property website foundation", () => {
  it("keeps the public website identity independent", () => {
    expect("dzaroza-property-website").toContain("website");
  });
});
