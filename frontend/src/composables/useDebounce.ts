export function useDebounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number = 500
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null

  const debounceFn = (...args: Parameters<T>): void => {
    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => {
      fn(...args)
    }, delay)
  }

  return debounceFn
}
