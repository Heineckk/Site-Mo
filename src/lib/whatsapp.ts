/** Número com DDI (Brasil + DDD 49). */
export const WHATSAPP_PHONE = "554999536164";

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}
