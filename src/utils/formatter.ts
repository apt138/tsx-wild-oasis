export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en", {
    currency: "INR",
    style: "currency",
  }).format(value);
}
