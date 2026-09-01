import assert from "node:assert/strict";
import { test } from "node:test";

import { localeSwitchHref, searchStringToQuery } from "./locale-query.ts";

test("parses leftover review and blog query keys without inventing values", () => {
  assert.deepEqual(searchStringToQuery("?agent=erin&source=google&tag=home-insurance"), {
    agent: "erin",
    source: "google",
    tag: "home-insurance",
  });
});

test("keeps a bare pathname when the leftover search string is empty", () => {
  assert.equal(localeSwitchHref("/review", ""), "/review");
  assert.equal(localeSwitchHref("/blog", "?"), "/blog");
});

test("preserves leftover query keys when switching locale", () => {
  assert.deepEqual(localeSwitchHref("/blog", "?tag=home-insurance&category=tips"), {
    pathname: "/blog",
    query: { tag: "home-insurance", category: "tips" },
  });
});
