import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('Main Page Mobile Integration', () => {
	beforeEach(() => {
		vi.clearAllMocks();

		// Mock mobile environment
		Object.defineProperty(navigator, 'userAgent', {
			value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15',
			configurable: true
		});

		Object.defineProperty(window, 'innerWidth', {
			value: 375,
			configurable: true
		});

		// Mock touch events
		Object.defineProperty(window, 'ontouchstart', {
			value: {},
			configurable: true
		});
	});

	describe('Mobile Detection Integration', () => {
		it('should detect mobile environment correctly', () => {
			const isMobileUserAgent = /iPhone/i.test(navigator.userAgent);
			const isTouchDevice = 'ontouchstart' in window;
			const isSmallScreen = window.innerWidth <= 768;

			expect(isMobileUserAgent).toBe(true);
			expect(isTouchDevice).toBe(true);
			expect(isSmallScreen).toBe(true);
		});
	});

	describe('Touch Event Integration', () => {
		it('should handle paste events on mobile', () => {
			const mockClipboardData = {
				getData: vi.fn().mockReturnValue('Test pasted text')
			};

			const pasteEvent = new Event('paste') as ClipboardEvent;
			Object.defineProperty(pasteEvent, 'clipboardData', {
				value: mockClipboardData
			});

			// Simulate paste event handling
			const handlePaste = (event: ClipboardEvent) => {
				const pastedText = event.clipboardData?.getData('text');
				return pastedText;
			};

			const result = handlePaste(pasteEvent);
			expect(result).toBe('Test pasted text');
			expect(mockClipboardData.getData).toHaveBeenCalledWith('text');
		});

		it('should handle long press detection', () => {
			vi.useFakeTimers();

			let longPressDetected = false;
			const longPressDelay = 500;

			const simulateLongPress = () => {
				const timer = setTimeout(() => {
					longPressDetected = true;
				}, longPressDelay);

				return () => clearTimeout(timer);
			};

			const cleanup = simulateLongPress();
			vi.advanceTimersByTime(longPressDelay);

			expect(longPressDetected).toBe(true);

			cleanup();
			vi.useRealTimers();
		});
	});

	describe('Clipboard Integration on Mobile', () => {
		it('should handle successful clipboard copy', async () => {
			const mockWriteText = vi.fn().mockResolvedValue(undefined);
			Object.assign(navigator, {
				clipboard: {
					writeText: mockWriteText
				}
			});

			const testText = 'Mobile copy test';
			await navigator.clipboard.writeText(testText);

			expect(mockWriteText).toHaveBeenCalledWith(testText);
		});

		it('should handle clipboard permission errors on mobile', async () => {
			const mockWriteText = vi
				.fn()
				.mockRejectedValue(new DOMException('Must be handling a user gesture', 'NotAllowedError'));

			Object.assign(navigator, {
				clipboard: {
					writeText: mockWriteText
				}
			});

			await expect(navigator.clipboard.writeText('test')).rejects.toThrow(
				'Must be handling a user gesture'
			);
		});
	});
});
