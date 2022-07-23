export function debounce(
  callback: (...args: unknown[]) => unknown,
  timeout: number
): (...args: unknown[]) => void {
  let lastCall = 0,
    lastCallTimer = 0;
  return function perform(...args: unknown[]): void {
    const previousCall = lastCall;
    lastCall = Date.now();

    if (previousCall && lastCall - previousCall <= timeout) {
      clearTimeout(lastCallTimer);
    }
    lastCallTimer = setTimeout(() => callback(...args), timeout);
  };
}
