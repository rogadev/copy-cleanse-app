/**
 * Debouncing utilities for performance optimization
 */

/**
 * Creates a debounced version of a function that delays invoking until after
 * wait milliseconds have elapsed since the last time it was invoked
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
	func: T,
	wait: number,
	immediate = false
): (...args: Parameters<T>) => void {
	let timeout: number | null = null;

	return function executedFunction(...args: Parameters<T>) {
		const later = () => {
			timeout = null;
			if (!immediate) func(...args);
		};

		const callNow = immediate && !timeout;

		if (timeout) clearTimeout(timeout);
		timeout = window.setTimeout(later, wait);

		if (callNow) func(...args);
	};
}

/**
 * Creates a throttled version of a function that only invokes at most once per
 * every wait milliseconds
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
	func: T,
	wait: number
): (...args: Parameters<T>) => void {
	let inThrottle: boolean;
	let lastFunc: number;
	let lastRan: number;

	return function executedFunction(...args: Parameters<T>) {
		if (!inThrottle) {
			func(...args);
			lastRan = Date.now();
			inThrottle = true;
		} else {
			clearTimeout(lastFunc);
			lastFunc = window.setTimeout(
				() => {
					if (Date.now() - lastRan >= wait) {
						func(...args);
						lastRan = Date.now();
					}
				},
				Math.max(wait - (Date.now() - lastRan), 0)
			);
		}
	};
}
