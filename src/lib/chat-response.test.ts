import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildChatUnavailableMessage, buildChatUnavailablePayload } from "./chat-response.ts";

describe("chat unavailable copy", () => {
  it("does not claim an agent will follow up", () => {
    const message = buildChatUnavailableMessage("(951) 739-5959", "office@allsberryagency.com");
    assert.match(message, /does not have a live chatbot/i);
    assert.match(message, /not sent to the team/i);
    assert.doesNotMatch(message, /will be in touch/i);
    assert.doesNotMatch(message, /one of our agents/i);
  });

  it("points to the sourced phone and email", () => {
    const payload = buildChatUnavailablePayload("(951) 739-5959", "office@allsberryagency.com");
    assert.equal(payload.success, false);
    assert.equal(payload.chatbotAvailable, false);
    assert.match(payload.message, /\(951\) 739-5959/);
    assert.match(payload.message, /office@allsberryagency\.com/);
  });
});
