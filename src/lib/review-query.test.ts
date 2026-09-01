import assert from "node:assert/strict";
import { test } from "node:test";

import { resolveReviewQueryLeftovers } from "./review-query.ts";

test("known Google source and review intent are not leftovers", () => {
  assert.deepEqual(
    resolveReviewQueryLeftovers({
      rawSource: "Google",
      rawIntent: "review",
    }),
    [],
  );
});

test("unknown agent stays leftover and does not invent a name", () => {
  assert.deepEqual(
    resolveReviewQueryLeftovers({ rawAgent: "nobody" }),
    [{ kind: "unknown-agent", raw: "nobody" }],
  );
});

test("known agent leftover says reviews go to the Google listing", () => {
  assert.deepEqual(
    resolveReviewQueryLeftovers({
      rawAgent: "erin",
      knownAgentName: "Erin Allsberry",
    }),
    [{ kind: "known-agent", name: "Erin Allsberry" }],
  );
});

test("Yelp leftover admits this page opens Google", () => {
  assert.deepEqual(resolveReviewQueryLeftovers({ rawSource: "yelp" }), [
    { kind: "yelp-source" },
  ]);
});

test("unknown source leftover does not invent a review form", () => {
  assert.deepEqual(resolveReviewQueryLeftovers({ rawSource: "spaceship" }), [
    { kind: "unknown-source", raw: "spaceship" },
  ]);
});

test("feedback leftover does not invent a private inbox", () => {
  assert.deepEqual(resolveReviewQueryLeftovers({ rawIntent: "feedback" }), [
    { kind: "feedback-intent" },
  ]);
});

test("unknown intent leftover does not invent a flow", () => {
  assert.deepEqual(resolveReviewQueryLeftovers({ rawIntent: "spaceship" }), [
    { kind: "unknown-intent", raw: "spaceship" },
  ]);
});
