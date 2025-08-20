import { describe, it, expect } from 'vitest';
import { FEEDBACK_MESSAGES, FEEDBACK_STYLES } from './feedback.js';
import type { FeedbackType, TouchFeedback } from './feedback.js';

describe('feedback types and constants', () => {
	describe('FEEDBACK_MESSAGES', () => {
		it('should have all required message constants', () => {
			expect(FEEDBACK_MESSAGES.SUCCESS).toBe('Copied to clipboard!');
			expect(FEEDBACK_MESSAGES.ERROR).toBe('Copy failed. Try manual copy button.');
			expect(FEEDBACK_MESSAGES.PROCESSING).toBe('Processing text...');
			expect(FEEDBACK_MESSAGES.PASTE_SUCCESS).toBe('Text pasted - cleaning automatically...');
			expect(FEEDBACK_MESSAGES.LONG_PRESS).toBe('Long press detected - paste available');
			expect(FEEDBACK_MESSAGES.EMPTY_TEXT).toBe('Please enter some text to clean');
			expect(FEEDBACK_MESSAGES.CLEANING).toBe('Cleaning text...');
			expect(FEEDBACK_MESSAGES.CLIPBOARD_LARGE).toBe(
				'Text too large for clipboard. Use manual copy.'
			);
			expect(FEEDBACK_MESSAGES.CLIPBOARD_PERMISSION).toBe(
				'Clipboard access denied. Use manual copy button.'
			);
		});

		it('should have string values for all messages', () => {
			Object.values(FEEDBACK_MESSAGES).forEach((message) => {
				expect(typeof message).toBe('string');
				expect(message.length).toBeGreaterThan(0);
			});
		});
	});

	describe('FEEDBACK_STYLES', () => {
		it('should have styles for all feedback types', () => {
			const feedbackTypes: FeedbackType[] = ['success', 'error', 'processing', 'info'];

			feedbackTypes.forEach((type) => {
				expect(FEEDBACK_STYLES[type]).toBeDefined();
				expect(FEEDBACK_STYLES[type].container).toBeDefined();
				expect(FEEDBACK_STYLES[type].icon).toBeDefined();
				expect(FEEDBACK_STYLES[type].text).toBeDefined();
				expect(FEEDBACK_STYLES[type].button).toBeDefined();
			});
		});

		it('should have proper CSS classes for success style', () => {
			const successStyle = FEEDBACK_STYLES.success;

			expect(successStyle.container).toContain('border-green-200');
			expect(successStyle.container).toContain('bg-green-50/90');
			expect(successStyle.icon).toContain('bg-green-100');
			expect(successStyle.text).toContain('text-green-800');
			expect(successStyle.button).toContain('text-green-600');
		});

		it('should have proper CSS classes for error style', () => {
			const errorStyle = FEEDBACK_STYLES.error;

			expect(errorStyle.container).toContain('border-red-200');
			expect(errorStyle.container).toContain('bg-red-50/90');
			expect(errorStyle.icon).toContain('bg-red-100');
			expect(errorStyle.text).toContain('text-red-800');
			expect(errorStyle.button).toContain('text-red-600');
		});

		it('should have proper CSS classes for processing style', () => {
			const processingStyle = FEEDBACK_STYLES.processing;

			expect(processingStyle.container).toContain('border-blue-200');
			expect(processingStyle.container).toContain('bg-blue-50/90');
			expect(processingStyle.icon).toContain('bg-blue-100');
			expect(processingStyle.text).toContain('text-blue-800');
			expect(processingStyle.button).toContain('text-blue-600');
		});

		it('should have proper CSS classes for info style', () => {
			const infoStyle = FEEDBACK_STYLES.info;

			expect(infoStyle.container).toContain('border-gray-200');
			expect(infoStyle.container).toContain('bg-gray-50/90');
			expect(infoStyle.icon).toContain('bg-gray-100');
			expect(infoStyle.text).toContain('text-gray-800');
			expect(infoStyle.button).toContain('text-gray-600');
		});
	});

	describe('TouchFeedback interface', () => {
		it('should accept valid TouchFeedback objects', () => {
			const validFeedback: TouchFeedback = {
				message: 'Test message',
				type: 'success'
			};

			expect(validFeedback.message).toBe('Test message');
			expect(validFeedback.type).toBe('success');
		});

		it('should accept TouchFeedback with optional id', () => {
			const feedbackWithId: TouchFeedback = {
				message: 'Test message',
				type: 'info',
				id: 'test-id'
			};

			expect(feedbackWithId.id).toBe('test-id');
		});
	});

	describe('FeedbackType', () => {
		it('should accept all valid feedback types', () => {
			const validTypes: FeedbackType[] = ['success', 'error', 'processing', 'info'];

			validTypes.forEach((type) => {
				const feedback: TouchFeedback = {
					message: 'Test',
					type: type
				};
				expect(feedback.type).toBe(type);
			});
		});
	});
});
