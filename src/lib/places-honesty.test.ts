import assert from "node:assert/strict";
import { test } from "node:test";

import { placesMethodHonesty } from "./places-honesty.ts";

const contact = {
  phone: "(951) 739-5959",
  email: "office@allsberryagency.com",
};

test("GET leftover on autocomplete is 405-shaped and sourced", () => {
  const body = placesMethodHonesty("GET", ["POST"], contact);
  assert.equal(body.success, false);
  assert.equal(body.method, "GET");
  assert.deepEqual(body.allowed, ["POST"]);
  assert.match(body.message, /does not list saved addresses/i);
  assert.equal(body.phone, contact.phone);
  assert.equal(body.email, contact.email);
});

test("POST leftover on details is 405-shaped and sourced", () => {
  const body = placesMethodHonesty("POST", ["GET"], contact);
  assert.equal(body.method, "POST");
  assert.deepEqual(body.allowed, ["GET"]);
});
