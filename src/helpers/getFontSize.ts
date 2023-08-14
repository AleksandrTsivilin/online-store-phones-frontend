export interface FontSize {
  fontSize: string;
}

export function getFontSize(count: number): FontSize {
  if (count > 99) {
    return { fontSize: '0.55rem' };
  }

  if (count > 9) {
    return { fontSize: '0.675rem' };
  }

  return { fontSize: '0.80rem' };
}
