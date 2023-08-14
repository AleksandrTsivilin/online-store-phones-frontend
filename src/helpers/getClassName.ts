export function getClassName(string: string): string {
  return string.toLowerCase().replace(/\s/g, '-');
}
