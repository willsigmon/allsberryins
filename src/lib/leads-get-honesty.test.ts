import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { leadsGetHonesty } from "./leads-get-honesty.ts";

describe("leadsGetHonesty", () => {
  it("says GET cannot list leads and repeats sourced contact only", () => {
    const body = leadsGetHonesty({
      email: "office@allsberryagency.com",
      phone: "(951) 739-5959",
    });

    assert.equal(body.success, false);
    assert.match(body.message, /does not list leads/i);
    assert.doesNotMatch(body.message, /AgencyZoom|CRM|star/i);
    assert.equal(body.phone, "(951) 739-5959");
    assert.equal(body.email, "office@allsberryagency.com");
  });
});
