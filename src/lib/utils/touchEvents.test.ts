import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createTouchEventManager } from './touchEvents.js';
import type { TouchFeedback } from '../types/feedback.js';

describe('touchEvents', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.restoreAllMocks();
		vi.useRealTimers();
	});

	describe('createTouchEventManager', () => {
		it('should create touch event manager with proper handlers', () => {
			const mockHandlers = {
				onLongPress: vi.fn(),
				onTouchEnd: vi.fn()
			};

			const manager = createTouchEventManager(
				{ longPressDelay: 500, feedbackDuration: 2000 },
				mockHandlers
			);

			expect(manager.handleTouchStart).toBeDefined();
			expect(manager.handleTouchEnd).toBeDefined();
			expect(manager.handleTouchCancel).toBeDefined();
			expect(manager.cleanup).toBeDefined();
		});

		it('should trigger long press after delay', () => {
			const mockHandlers = {
				onLongPress: vi.fn(),
				onTouchEnd: vi.fn()
			};

			const manager = createTouchEventManager(
				{ longPressDelay: 500, feedbackDuration: 2000 },
				mockHandlers
			);

			manager.handleTouchStart();
			vi.advanceTimersByTime(500);

			expect(mockHandlers.onLongPress).toHaveBeenCalledWith({
				message: 'Long press detected - paste available',
				type: 'info',
				id: 'long-press'
			});
		});

		it('should not trigger long press if touch ends early', () => {
			const mockHandlers = {
				onLongPress: vi.fn(),
				onTouchEnd: vi.fn()
			};

			const manager = createTouchEventManager(
				{ longPressDelay: 500, feedbackDuration: 2000 },
				mockHandlers
			);

			manager.handleTouchStart();
			vi.advanceTimersByTime(300);
			manager.handleTouchEnd();
			vi.advanceTimersByTime(300);

			expect(mockHandlers.onLongPress).not.toHaveBeenCalled();
		});

		it('should clear timers on touch cancel', () => {
			const mockHandlers = {
				onLongPress: vi.fn(),
				onTouchEnd: vi.fn()
			};

			const manager = createTouchEventManager(
				{ longPressDelay: 500, feedbackDuration: 2000 },
				mockHandlers
			);

			manager.handleTouchStart();
			manager.handleTouchCancel();
			vi.advanceTimersByTime(500);

			expect(mockHandlers.onLongPress).not.toHaveBeenCalled();
		});

		it('should cleanup timers', () => {
			const mockHandlers = {
				onLongPress: vi.fn(),
				onTouchEnd: vi.fn()
			};

			const manager = createTouchEventManager(
				{ longPressDelay: 500, feedbackDuration: 2000 },
				mockHandlers
			);

			manager.handleTouchStart();
			manager.cleanup();
			vi.advanceTimersByTime(500);

			expect(mockHandlers.onLongPress).not.toHaveBeenCalled();
		});
	});
});
