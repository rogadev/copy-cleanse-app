/**
 * Mobile feedback management utility
 */

import type { FeedbackType, TouchFeedback } from '../types/feedback.js';

// Re-export feedback messages from types
export { FEEDBACK_MESSAGES } from '../types/feedback.js';

export function createFeedbackManager() {
	let feedback: TouchFeedback | null = null;
	let timer: number | null = null;

	function show(message: string, type: FeedbackType, id?: string) {
		// Clear existing timer
		if (timer) {
			clearTimeout(timer);
			timer = null;
		}

		feedback = { message, type, id };

		// Auto-clear based on type
		const duration = type === 'success' ? 3000 : type === 'error' ? 5000 : 0;
		if (duration > 0) {
			timer = window.setTimeout(() => {
				feedback = null;
				timer = null;
			}, duration);
		}
	}

	function clear() {
		if (timer) {
			clearTimeout(timer);
			timer = null;
		}
		feedback = null;
	}

	function clearById(id: string) {
		if (feedback?.id === id) {
			clear();
		}
	}

	return {
		get current() {
			return feedback;
		},
		show,
		clear,
		clearById,
		cleanup() {
			if (timer) {
				clearTimeout(timer);
				timer = null;
			}
		}
	};
}
