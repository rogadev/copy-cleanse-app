import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { detectMobile, createMobileDetector } from './deviceDetection.js';

describe('deviceDetection', () => {
	let originalUserAgent: string;
	let originalInnerWidth: number;

	beforeEach(() => {
		originalUserAgent = navigator.userAgent;
		originalInnerWidth = window.innerWidth;
	});

	afterEach(() => {
		// Restore original values
		Object.defineProperty(navigator, 'userAgent', {
			value: originalUserAgent,
			configurable: true
		});
		Object.defineProperty(window, 'innerWidth', {
			value: originalInnerWidth,
			configurable: true
		});
	});

	describe('detectMobile', () => {
		it('should detect mobile user agents', () => {
			const mobileUserAgents = [
				'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15',
				'Mozilla/5.0 (Linux; Android 11; SM-G991B) AppleWebKit/537.36',
				'Mozilla/5.0 (iPad; CPU OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15'
			];

			mobileUserAgents.forEach((userAgent) => {
				Object.defineProperty(navigator, 'userAgent', {
					value: userAgent,
					configurable: true
				});
				expect(detectMobile()).toBe(true);
			});
		});

		it('should not detect desktop user agents as mobile', () => {
			const desktopUserAgent =
				'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';

			Object.defineProperty(navigator, 'userAgent', {
				value: desktopUserAgent,
				configurable: true
			});

			Object.defineProperty(window, 'innerWidth', {
				value: 1024,
				configurable: true
			});

			expect(detectMobile()).toBe(false);
		});

		it('should detect touch devices with small screens as mobile', () => {
			const desktopUserAgent =
				'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';

			Object.defineProperty(navigator, 'userAgent', {
				value: desktopUserAgent,
				configurable: true
			});

			Object.defineProperty(window, 'innerWidth', {
				value: 600, // Small screen
				configurable: true
			});

			// Mock touch capability
			Object.defineProperty(window, 'ontouchstart', {
				value: {},
				configurable: true
			});

			expect(detectMobile()).toBe(true);
		});

		it('should handle undefined window gracefully', () => {
			// This test simulates server-side rendering
			const originalWindow = (globalThis as { window?: Window }).window;
			(globalThis as { window?: Window }).window = undefined;

			expect(detectMobile()).toBe(false);

			(globalThis as { window?: Window }).window = originalWindow;
		});
	});

	describe('createMobileDetector', () => {
		it('should create a reactive mobile detector', () => {
			const detector = createMobileDetector();

			// Should have initial state
			expect(typeof detector.isMobile).toBe('boolean');
			expect(typeof detector.cleanup).toBe('function');
		});

		it('should update mobile state on resize', () => {
			const detector = createMobileDetector();

			// Mock a resize event
			const resizeEvent = new Event('resize');
			window.dispatchEvent(resizeEvent);

			// Should still be a boolean after resize
			expect(typeof detector.isMobile).toBe('boolean');
		});

		it('should clean up event listeners', () => {
			const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
			const detector = createMobileDetector();

			detector.cleanup();

			expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
			expect(removeEventListenerSpy).toHaveBeenCalledWith(
				'orientationchange',
				expect.any(Function)
			);
		});
	});
});
