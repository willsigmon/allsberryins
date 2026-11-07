// Synthetic checks for checkTurnstile (no network for the inert path; Cloudflare's
// documented always-fail test secret for the enforced path).
import assert from "node:assert/strict";
const mod = await import(process.argv[2]);
const req = (h = {}) => new Request("https://x.test/api", { method: "POST", headers: { "x-forwarded-for": "10.0.0." + Math.random(), ...h } });
delete process.env.TURNSTILE_SECRET_KEY;
assert.equal(await mod.checkTurnstile(req(), []), null, "inert without secret");
process.env.TURNSTILE_SECRET_KEY = "2x0000000000000000000000000000000AA";
assert.equal((await mod.checkTurnstile(req(), []))?.status, 403, "missing token rejected");
assert.equal((await mod.checkTurnstile(req({ "x-turnstile-token": "XXXX.DUMMY.TOKEN.XXXX" }), []))?.status, 403, "failing token rejected");
delete process.env.TURNSTILE_SECRET_KEY;
const fixed = () => new Request("https://x.test/api", { method: "POST", headers: { "x-forwarded-for": "10.9.9.9" } });
for (let i = 0; i < 5; i++) assert.equal(await mod.checkTurnstile(fixed(), []), null);
assert.equal((await mod.checkTurnstile(fixed(), []))?.status, 429, "6th in window rate limited");
console.log("turnstile-server: all checks passed");
