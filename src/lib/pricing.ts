export const PRICING = {
  cartinha: 8,
  casal: 8,
} as const;

export function formatPrice(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
