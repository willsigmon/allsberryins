export function leadsGetHonesty(contact: { email: string; phone: string }) {
  return {
    email: contact.email,
    message:
      "This endpoint accepts quote, proof, and agent-contact form posts. It does not list leads.",
    phone: contact.phone,
    success: false as const,
  };
}
