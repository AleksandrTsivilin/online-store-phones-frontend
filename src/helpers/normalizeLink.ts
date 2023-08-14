export function normalizeLink(link: string): string {
  return link
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/gi, '')
    .toLowerCase();
}
