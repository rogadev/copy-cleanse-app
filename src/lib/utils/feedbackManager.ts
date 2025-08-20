/**
 * Mobile feedback management utility
 */

export type FeedbackType = 'success' | 'error' | 'processing' | 'info';

export interface FeedbackMessage {
	message: string;
	type: FeedbackType;
	id?: string;
}

export const FEEDBACK_MESSAGES = {
	LONG_PRESS: 'Long press detected - paste available',
	PROCESSING: 'Processing text...',
	SUCCESS: 'Copied to clipboard!',
	ERROR: 'Copy failed. Try manual copy button.',
	PASTE_SUCCESS: 'Text pasted - cleaning automatically...'
} as const;

export function createFeedbackManager() {
	let feedback = $state<FeedbackMessage | null>(null);
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
