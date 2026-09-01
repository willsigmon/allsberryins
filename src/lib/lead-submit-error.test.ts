import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  LeadSubmitError,
  leadFormErrorMessage,
  readLeadSubmitError,
} from "./lead-submit-error.ts";

describe("leadFormErrorMessage", () => {
  it("surfaces API-sourced lead submit messages", () => {
    assert.equal(
      leadFormErrorMessage(
        new LeadSubmitError("We couldn't deliver your request. Please call or email us directly."),
        "Please call the office.",
      ),
      "We couldn't deliver your request. Please call or email us directly.",
    );
  });

  it("keeps the office-contact fallback for raw fetch errors", () => {
    assert.equal(
      leadFormErrorMessage(new TypeError("Failed to fetch"), "Please call the office."),
      "Please call the office.",
    );
  });
});

describe("readLeadSubmitError", () => {
  it("surfaces the API message instead of inventing a CRM status", async () => {
    const response = new Response(
      JSON.stringify({
        success: false,
        message: "We couldn't deliver your request. Please call or email us directly.",
      }),
      { status: 502 },
    );

    assert.equal(
      await readLeadSubmitError(response, "Please call the office."),
      "We couldn't deliver your request. Please call or email us directly.",
    );
  });

  it("falls back when the body has no honest message", async () => {
    const response = new Response(JSON.stringify({ success: false }), { status: 500 });
    assert.equal(await readLeadSubmitError(response, "Please call the office."), "Please call the office.");
  });

  it("falls back when the body is not JSON", async () => {
    const response = new Response("<html>nope</html>", { status: 502 });
    assert.equal(await readLeadSubmitError(response, "Please call the office."), "Please call the office.");
  });
});
