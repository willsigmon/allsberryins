import assert from "node:assert/strict";
import { test } from "node:test";

import { resolveBlogFilter } from "./blog-filter.ts";

const posts = [
  { slug: "home-renewal", tags: ["Home Insurance", "Renewal Tips"], category: "tips" },
  { slug: "umbrella", tags: ["Umbrella Insurance"], category: "guides" },
  { slug: "team-news", tags: ["Agency News"], category: "news" },
] as const;

test("known tag filters without inventing posts", () => {
  const result = resolveBlogFilter({ tag: "home-insurance" }, posts);
  assert.deepEqual(
    result.posts.map((post) => post.slug),
    ["home-renewal"],
  );
  assert.equal(result.appliedTag, "Home Insurance");
  assert.deepEqual(result.leftovers, []);
  assert.equal(result.emptyFilter, false);
});

test("unknown tag leftover shows the catalog and does not invent a post", () => {
  const result = resolveBlogFilter({ tag: "spaceship" }, posts);
  assert.deepEqual(result.leftovers, [{ kind: "unknown-tag", raw: "spaceship" }]);
  assert.equal(result.posts.length, posts.length);
  assert.equal(result.emptyFilter, false);
});

test("unknown category leftover does not invent a section", () => {
  const result = resolveBlogFilter({ category: "spaceship" }, posts);
  assert.deepEqual(result.leftovers, [{ kind: "unknown-category", raw: "spaceship" }]);
  assert.equal(result.posts.length, posts.length);
});

test("known category filters the leftover grid", () => {
  const result = resolveBlogFilter({ category: "Guides" }, posts);
  assert.deepEqual(
    result.posts.map((post) => post.slug),
    ["umbrella"],
  );
  assert.equal(result.appliedCategory, "guides");
});

test("known tag plus category can be an honest empty leftover", () => {
  const result = resolveBlogFilter({ tag: "home-insurance", category: "news" }, posts);
  assert.equal(result.emptyFilter, true);
  assert.deepEqual(result.posts, []);
  assert.deepEqual(result.leftovers, []);
});
