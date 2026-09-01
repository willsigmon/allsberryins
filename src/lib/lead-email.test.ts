import { describe, expect, it } from "vitest";

import { leadSubject } from "@/lib/lead-email";

describe("leadSubject", () => {
  it("uses first and last name for quote requests", () => {
    expect(
      leadSubject({
        type: "quote-request",
        firstName: "Ada",
        lastName: "Lopez",
      }),
    ).toBe("[Allsberry Site] Quote Request — Ada Lopez");
  });

  it("uses the contact name for agent messages", () => {
    expect(
      leadSubject({
        type: "agent-contact",
        name: "Ada Lopez",
      }),
    ).toBe("[Allsberry Site] Agent Contact — Ada Lopez");
  });
});
