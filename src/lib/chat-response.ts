export type ChatUnavailablePayload = {
  chatbotAvailable: false;
  message: string;
  success: false;
};

/**
 * /api/chat is a stub. Do not tell visitors an agent will follow up —
 * the route does not create a lead or send email.
 */
export function buildChatUnavailableMessage(phone: string, email: string): string {
  return `This website does not have a live chatbot yet, so this message was not sent to the team. Call ${phone} or email ${email} and a licensed agent can help.`;
}

export function buildChatUnavailablePayload(
  phone: string,
  email: string,
): ChatUnavailablePayload {
  return {
    success: false,
    chatbotAvailable: false,
    message: buildChatUnavailableMessage(phone, email),
  };
}
