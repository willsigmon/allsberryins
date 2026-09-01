export type FilterablePost = {
  slug: string;
  tags: string[];
  category?: string;
};

export type BlogFilterLeftover =
  | { kind: "unknown-tag"; raw: string }
  | { kind: "unknown-category"; raw: string };

export type BlogFilterResult<T extends FilterablePost> = {
  leftovers: BlogFilterLeftover[];
  posts: T[];
  appliedTag?: string;
  appliedCategory?: string;
  emptyFilter: boolean;
};

export const blogFilterCategories = ["tips", "news", "guides"] as const;

function leftoverToken(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function collectBlogTags(posts: readonly FilterablePost[]): string[] {
  return [...new Set(posts.flatMap((post) => post.tags))];
}

export function resolveBlogFilter<T extends FilterablePost>(
  params: { tag?: string; category?: string },
  posts: readonly T[],
): BlogFilterResult<T> {
  const leftovers: BlogFilterLeftover[] = [];
  let filtered = [...posts];
  let appliedTag: string | undefined;
  let appliedCategory: string | undefined;

  const rawTag = params.tag?.trim();
  if (rawTag) {
    const wanted = leftoverToken(rawTag);
    const match = collectBlogTags(posts).find((tag) => leftoverToken(tag) === wanted);
    if (match) {
      appliedTag = match;
      filtered = filtered.filter((post) =>
        post.tags.some((tag) => leftoverToken(tag) === wanted),
      );
    } else {
      leftovers.push({ kind: "unknown-tag", raw: rawTag });
    }
  }

  const rawCategory = params.category?.trim();
  if (rawCategory) {
    const wanted = leftoverToken(rawCategory);
    const match = blogFilterCategories.find((category) => category === wanted);
    if (match) {
      appliedCategory = match;
      filtered = filtered.filter((post) => post.category === match);
    } else {
      leftovers.push({ kind: "unknown-category", raw: rawCategory });
    }
  }

  return {
    leftovers,
    posts: filtered,
    appliedTag,
    appliedCategory,
    emptyFilter: Boolean((appliedTag || appliedCategory) && filtered.length === 0),
  };
}
