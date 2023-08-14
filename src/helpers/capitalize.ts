export function capitalize(text: string): string {
  if (text === 'ram') {
    return 'RAM';
  }

  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}
