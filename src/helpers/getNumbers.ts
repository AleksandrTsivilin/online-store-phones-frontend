export function getNumbers(total: number, limit: number): number[] {
  const count = Math.ceil(total / limit);

  return Array(count)
    .fill(0)
    .map((_, index) => index + 1);
}
