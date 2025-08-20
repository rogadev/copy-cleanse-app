import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createFeedbackManager, FEEDBACK_MESSAGES } from './feedbackManager.js';

describe('feedbackManager', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.restoreAllMocks();
		vi.useRealTimers();
	});

	describe('createFeedbackManager', () => {
		it('should create a feedback manager with initial null state', () => {
			const manager = createFeedbackManager();

			expect(manager.current).toBeNull();
		});

		it('should show feedback messages', () => {
			const manager = createFeedbackManager();

			manager.show('Test message', 'success');

			expect(manager.current).toEqual({
				message: 'Test message',
				type: 'success'
			});
		});

		it('should show feedback messages with ID', () => {
			const manager = createFeedbackManager();

			manager.show('Test message', 'info', 'test-id');

			expect(manager.current).toEqual({
				message: 'Test message',
				type: 'info',
				id: 'test-id'
			});
		});

		it('should auto-clear success messages after 3 seconds', () => {
			const manager = createFeedbackManager();

			manager.show('Success message', 'success');
			expect(manager.current).not.toBeNull();

			vi.advanceTimersByTime(3000);
			expect(manager.current).toBeNull();
		});

		it('should auto-clear error messages after 5 seconds', () => {
			const manager = createFeedbackManager();

			manager.show('Error message', 'error');
			expect(manager.current).not.toBeNull();

			vi.advanceTimersByTime(5000);
			expect(manager.current).toBeNull();
		});

		it('should not auto-clear processing messages', () => {
			const manager = createFeedbackManager();

			manager.show('Processing...', 'processing');
			expect(manager.current).not.toBeNull();

			vi.advanceTimersByTime(10000);
			expect(manager.current).not.toBeNull();
		});

		it('should not auto-clear info messages', () => {
			const manager = createFeedbackManager();

			manager.show('Info message', 'info');
			expect(manager.current).not.toBeNull();

			vi.advanceTimersByTime(10000);
			expect(manager.current).not.toBeNull();
		});

		it('should clear existing timer when showing new message', () => {
			const manager = createFeedbackManager();

			manager.show('First message', 'success');
			vi.advanceTimersByTime(1000);

			manager.show('Second message', 'error');
			vi.advanceTimersByTime(3000); // Original success timer would have fired

			expect(manager.current).toEqual({
				message: 'Second message',
				type: 'error'
			});
		});

		it('should manually clear feedback', () => {
			const manager = createFeedbackManager();

			manager.show('Test message', 'success');
			expect(manager.current).not.toBeNull();

			manager.clear();
			expect(manager.current).toBeNull();
		});

		it('should clear feedback by ID', () => {
			const manager = createFeedbackManager();

			manager.show('Test message', 'info', 'test-id');
			expect(manager.current).not.toBeNull();

			manager.clearById('test-id');
			expect(manager.current).toBeNull();
		});

		it('should not clear feedback with different ID', () => {
			const manager = createFeedbackManager();

			manager.show('Test message', 'info', 'test-id');
			expect(manager.current).not.toBeNull();

			manager.clearById('different-id');
			expect(manager.current).not.toBeNull();
		});

		it('should cleanup timers', () => {
			const manager = createFeedbackManager();

			manager.show('Test message', 'success');
			manager.cleanup();

			vi.advanceTimersByTime(5000);
			// Should still have the message since cleanup cleared the timer
			expect(manager.current).not.toBeNull();
		});
	});

	describe('FEEDBACK_MESSAGES', () => {
		it('should have all required message constants', () => {
			expect(FEEDBACK_MESSAGES.LONG_PRESS).toBeDefined();
			expect(FEEDBACK_MESSAGES.PROCESSING).toBeDefined();
			expect(FEEDBACK_MESSAGES.SUCCESS).toBeDefined();
			expect(FEEDBACK_MESSAGES.ERROR).toBeDefined();
			expect(FEEDBACK_MESSAGES.PASTE_SUCCESS).toBeDefined();
		});

		it('should have string values for all messages', () => {
			Object.values(FEEDBACK_MESSAGES).forEach((message) => {
				expect(typeof message).toBe('string');
				expect(message.length).toBeGreaterThan(0);
			});
		});
	});
});
