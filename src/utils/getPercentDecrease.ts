export default function getPercentageDecrease(
  originalPrice: number,
  basePrice: number | null
) {
  if (!basePrice) return null;
  return Math.round(((originalPrice - basePrice) / originalPrice) * 100);
}
