const siteUrl = process.env.SITE_URL ?? "https://allsberryagency.com";
const indexNowKey = process.env.INDEXNOW_KEY ?? "e0022f32345a418e8badda0d9a7a1f1f";
const keyLocation = `${siteUrl}/${indexNowKey}.txt`;

const changedPaths = [
  "/",
  "/resources",
  "/california-home-insurance",
  "/wildfire-home-insurance-california",
  "/ca-fair-plan-guide",
  "/difference-in-conditions-insurance-california",
  "/home-insurance-in-a-fire-zone-california",
  "/insurance-agency-corona-ca",
  "/blog/five-questions-before-renewing-home-insurance",
  "/blog/save-on-homeowners-insurance-california",
  "/blog/why-bundle-your-policies",
  "/agents/erin",
  "/agents/brahm",
  "/agents/dakota",
];

const urlList = changedPaths.map((path) => new URL(path, siteUrl).toString());
const host = new URL(siteUrl).host;

const response = await fetch("https://api.indexnow.org/IndexNow", {
  method: "POST",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  body: JSON.stringify({
    host,
    key: indexNowKey,
    keyLocation,
    urlList,
  }),
});

const body = await response.text();

if (!response.ok) {
  console.error("IndexNow submission failed");
  console.error("Status:", response.status);
  console.error(body);
  process.exit(1);
}

console.log(
  JSON.stringify(
    {
      status: response.status,
      host,
      keyLocation,
      submitted: urlList.length,
      body: body || "OK",
    },
    null,
    2,
  ),
);
