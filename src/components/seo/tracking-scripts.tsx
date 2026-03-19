import {
  defaultSiteLeadsConfig,
  extractSiteLeadsConfig,
} from "@/lib/tracking";

export function TrackingScripts() {
  const rawEmbedCode =
    process.env.SITELEADS_EMBED_CODE ?? process.env.NEXT_PUBLIC_SITELEADS_EMBED_CODE;
  const config = rawEmbedCode
    ? extractSiteLeadsConfig(rawEmbedCode)
    : defaultSiteLeadsConfig;

  return (
    <script
      id="siteleads-loader"
      dangerouslySetInnerHTML={{
        __html: `
          window.__SITELEADS_CONFIG = ${JSON.stringify(config)};
          (function (doc, tag, id, src) {
            if (doc.getElementById(id)) {
              return;
            }

            var js = doc.createElement(tag);
            js.id = id;
            js.src = src;
            js.type = "text/javascript";
            doc.head.appendChild(js);
          })(document, "script", ${JSON.stringify(config.scriptId)}, ${JSON.stringify(config.scriptSrc)});
        `,
      }}
    />
  );
}
