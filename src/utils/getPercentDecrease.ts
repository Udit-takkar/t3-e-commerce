export default function getPercentageDecrease(
  originalPrice: number,
  basePrice: number
) {
  return Math.round(((originalPrice - basePrice) / originalPrice) * 100);
}
