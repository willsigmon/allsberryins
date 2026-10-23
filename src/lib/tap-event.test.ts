import assert from "node:assert/strict";
import test from "node:test";

import { getTapEvent } from "./tap-event.ts";

const origin = "https://example.com";

test("classifies contact and localized quote destinations without returning PII", () => {
  assert.equal(getTapEvent("tel:+15550000000", origin), "Call Tap");
  assert.equal(getTapEvent("sms:+15550000000", origin), "Text Tap");
  assert.equal(getTapEvent("mailto:person@example.com?subject=Private", origin), "Email Tap");
  for (const href of ["/quote", "/en/quote", "/es/quote/?email=private"]) {
    assert.equal(getTapEvent(href, origin), "Quote Tap");
  }
  assert.equal(getTapEvent("https://calendly.com/example/meeting", origin), "Book Tap");
});

test("ignores unrelated, malformed, and lookalike destinations", () => {
  for (const href of ["/contact", "/quote-other", "https://other.example/quote",
    "https://calendly.com.evil.example/book", "javascript:alert(1)", "http://["]) {
    assert.equal(getTapEvent(href, origin), undefined);
  }
});
