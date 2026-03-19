function normalizeEmbedCode(rawEmbedCode: string) {
  const trimmed = rawEmbedCode.trim();
  const scriptMatch = trimmed.match(/<script[^>]*>([\s\S]*?)<\/script>/i);

  return scriptMatch ? scriptMatch[1] : trimmed;
}

export function TrackingScripts() {
  const embedCode =
    process.env.SITELEADS_EMBED_CODE ?? process.env.NEXT_PUBLIC_SITELEADS_EMBED_CODE;

  if (!embedCode) {
    return null;
  }

  return (
    <script
      id="siteleads-embed"
      dangerouslySetInnerHTML={{
        __html: normalizeEmbedCode(embedCode),
      }}
    />
  );
}
