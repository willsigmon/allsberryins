export function placesMethodHonesty(
  method: string,
  allowed: readonly string[],
  contact: { phone: string; email: string },
) {
  return {
    success: false,
    method,
    allowed: [...allowed],
    message:
      "This route looks up addresses for quote and proof forms. It does not list saved addresses or Places keys.",
    phone: contact.phone,
    email: contact.email,
  } as const;
}
