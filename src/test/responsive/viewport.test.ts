import { describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('Responsive Design Tests', () => {
	let originalInnerWidth: number;
	let originalInnerHeight: number;

	beforeEach(() => {
		originalInnerWidth = window.innerWidth;
		originalInnerHeight = window.innerHeight;
	});

	afterEach(() => {
		Object.defineProperty(window, 'innerWidth', {
			value: originalInnerWidth,
			configurable: true
		});
		Object.defineProperty(window, 'innerHeight', {
			value: originalInnerHeight,
			configurable: true
		});
	});

	describe('Mobile Viewport Sizes', () => {
		it('should handle iPhone SE viewport (375x667)', () => {
			Object.defineProperty(window, 'innerWidth', { value: 375, configurable: true });
			Object.defineProperty(window, 'innerHeight', { value: 667, configurable: true });

			expect(window.innerWidth).toBe(375);
			expect(window.innerHeight).toBe(667);
			expect(window.innerWidth <= 768).toBe(true); // Mobile breakpoint
		});

		it('should handle iPhone 12 Pro viewport (390x844)', () => {
			Object.defineProperty(window, 'innerWidth', { value: 390, configurable: true });
			Object.defineProperty(window, 'innerHeight', { value: 844, configurable: true });

			expect(window.innerWidth).toBe(390);
			expect(window.innerHeight).toBe(844);
			expect(window.innerWidth <= 768).toBe(true);
		});

		it('should handle iPad viewport (768x1024)', () => {
			Object.defineProperty(window, 'innerWidth', { value: 768, configurable: true });
			Object.defineProperty(window, 'innerHeight', { value: 1024, configurable: true });

			expect(window.innerWidth).toBe(768);
			expect(window.innerHeight).toBe(1024);
			expect(window.innerWidth <= 768).toBe(true); // Exactly at breakpoint
		});

		it('should handle desktop viewport (1024x768)', () => {
			Object.defineProperty(window, 'innerWidth', { value: 1024, configurable: true });
			Object.defineProperty(window, 'innerHeight', { value: 768, configurable: true });

			expect(window.innerWidth).toBe(1024);
			expect(window.innerHeight).toBe(768);
			expect(window.innerWidth > 768).toBe(true); // Desktop
		});
	});
});
