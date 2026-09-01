export function searchStringToQuery(search: string): Record<string, string> {
  const raw = search.startsWith("?") ? search.slice(1) : search;
  const params = new URLSearchParams(raw);
  const query: Record<string, string> = {};

  for (const [key, value] of params.entries()) {
    if (key && value) {
      query[key] = value;
    }
  }

  return query;
}

export function localeSwitchHref(
  pathname: string,
  search: string,
): string | { pathname: string; query: Record<string, string> } {
  const query = searchStringToQuery(search);

  if (Object.keys(query).length === 0) {
    return pathname;
  }

  return { pathname, query };
}
