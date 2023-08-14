export function normalizeCapacity(capacity: string): string {
  return capacity
    .replace(/(\d+)([a-zA-Z]+)/, '$1 $2')
    .toUpperCase();
}
