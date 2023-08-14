export function getSlidesPerView(width: number): number {
  if (width < 640) {
    return 1;
  }
  if (width < 768) {
    return 2;
  }
  if (width < 1200) {
    return 3;
  }

  return 4;
}
