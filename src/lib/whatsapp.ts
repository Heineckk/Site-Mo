/**
 * WhatsApp — usado quando o cliente finaliza o formulário
 *
 * buildWhatsAppUrl() monta o link wa.me com o resumo do pedido já preenchido.
 * O cliente clica "Enviar pelo WhatsApp" → abre o app com a mensagem pronta.
 * Depois você cadastra manualmente na planilha de controle.
 */

/** Número com DDI (Brasil + DDD 49). */
export const WHATSAPP_PHONE = "554999536164";

/** Gera link do WhatsApp com texto do pedido codificado na URL */
export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}
