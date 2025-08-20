export type FeedbackType = 'success' | 'error' | 'processing' | 'info';

export interface TouchFeedback {
	message: string;
	type: FeedbackType;
	id?: string;
}

export const FEEDBACK_MESSAGES = {
	SUCCESS: 'Copied to clipboard!',
	ERROR: 'Copy failed. Try manual copy button.',
	PROCESSING: 'Processing text...',
	PASTE_SUCCESS: 'Text pasted - cleaning automatically...',
	LONG_PRESS: 'Long press detected - paste available',
	EMPTY_TEXT: 'Please enter some text to clean',
	CLEANING: 'Cleaning text...',
	CLIPBOARD_LARGE: 'Text too large for clipboard. Use manual copy.',
	CLIPBOARD_PERMISSION: 'Clipboard access denied. Use manual copy button.'
} as const;

export const FEEDBACK_STYLES = {
	success: {
		container: 'border-green-200 bg-green-50/90',
		icon: 'bg-green-100',
		text: 'text-green-800',
		button: 'text-green-600 hover:bg-green-100'
	},
	error: {
		container: 'border-red-200 bg-red-50/90',
		icon: 'bg-red-100',
		text: 'text-red-800',
		button: 'text-red-600 hover:bg-red-100'
	},
	processing: {
		container: 'border-blue-200 bg-blue-50/90',
		icon: 'bg-blue-100',
		text: 'text-blue-800',
		button: 'text-blue-600 hover:bg-blue-100'
	},
	info: {
		container: 'border-gray-200 bg-gray-50/90',
		icon: 'bg-gray-100',
		text: 'text-gray-800',
		button: 'text-gray-600 hover:bg-gray-100'
	}
} as const;
