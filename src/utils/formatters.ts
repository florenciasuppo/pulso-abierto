export function formatUsdPrice(price: number): string {
  return `USD $${price.toLocaleString()}`;
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(2)}%`;
}