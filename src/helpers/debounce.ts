export function debounce<T extends (...args: never[]) => void>(
  func: T,
  delay: number,
) {
  let timerId = 0;

  return (...args: Parameters<T>): void => {
    clearTimeout(timerId);
    timerId = setTimeout(func, delay, ...args);
  };
}
