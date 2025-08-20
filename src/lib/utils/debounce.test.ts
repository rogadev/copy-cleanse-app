import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { debounce, throttle } from './debounce.js';

describe('debounce', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	describe('debounce', () => {
		it('should delay function execution', () => {
			const mockFn = vi.fn();
			const debouncedFn = debounce(mockFn, 100);

			debouncedFn('test');
			expect(mockFn).not.toHaveBeenCalled();

			vi.advanceTimersByTime(100);
			expect(mockFn).toHaveBeenCalledWith('test');
		});

		it('should reset timer on subsequent calls', () => {
			const mockFn = vi.fn();
			const debouncedFn = debounce(mockFn, 100);

			debouncedFn('first');
			vi.advanceTimersByTime(50);
			debouncedFn('second');
			vi.advanceTimersByTime(50);

			expect(mockFn).not.toHaveBeenCalled();

			vi.advanceTimersByTime(50);
			expect(mockFn).toHaveBeenCalledWith('second');
			expect(mockFn).toHaveBeenCalledTimes(1);
		});

		it('should execute immediately when immediate flag is true', () => {
			const mockFn = vi.fn();
			const debouncedFn = debounce(mockFn, 100, true);

			debouncedFn('test');
			expect(mockFn).toHaveBeenCalledWith('test');
		});

		it('should not execute again during wait period with immediate flag', () => {
			const mockFn = vi.fn();
			const debouncedFn = debounce(mockFn, 100, true);

			debouncedFn('first');
			debouncedFn('second');

			expect(mockFn).toHaveBeenCalledTimes(1);
			expect(mockFn).toHaveBeenCalledWith('first');
		});
	});

	describe('throttle', () => {
		it('should execute function immediately on first call', () => {
			const mockFn = vi.fn();
			const throttledFn = throttle(mockFn, 100);

			throttledFn('test');
			expect(mockFn).toHaveBeenCalledWith('test');
		});

		it('should throttle subsequent calls', () => {
			const mockFn = vi.fn();
			const throttledFn = throttle(mockFn, 100);

			throttledFn('first');
			throttledFn('second');
			throttledFn('third');

			expect(mockFn).toHaveBeenCalledTimes(1);
			expect(mockFn).toHaveBeenCalledWith('first');
		});

		it('should execute trailing call after wait period', () => {
			const mockFn = vi.fn();
			const throttledFn = throttle(mockFn, 100);

			throttledFn('first');
			throttledFn('second');

			vi.advanceTimersByTime(100);

			expect(mockFn).toHaveBeenCalledTimes(2);
			expect(mockFn).toHaveBeenLastCalledWith('second');
		});

		it('should handle multiple calls during throttle period', () => {
			const mockFn = vi.fn();
			const throttledFn = throttle(mockFn, 100);

			throttledFn('first');
			throttledFn('second');
			throttledFn('third');
			throttledFn('fourth');

			vi.advanceTimersByTime(100);

			expect(mockFn).toHaveBeenCalledTimes(2);
			expect(mockFn).toHaveBeenNthCalledWith(1, 'first');
			expect(mockFn).toHaveBeenNthCalledWith(2, 'fourth');
		});
	});
});
