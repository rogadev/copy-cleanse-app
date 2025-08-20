/**
 * Mobile interaction constants
 */

export const TOUCH_CONSTANTS = {
	LONG_PRESS_DURATION: 500, // ms
	LONG_PRESS_FEEDBACK_DURATION: 2000, // ms
	SUCCESS_FEEDBACK_DURATION: 3000, // ms
	ERROR_FEEDBACK_DURATION: 5000, // ms
	MOBILE_BREAKPOINT: 768 // px
} as const;

export const FEEDBACK_MESSAGES = {
	LONG_PRESS: 'Long press detected - paste available',
	PROCESSING: 'Processing text...',
	SUCCESS: 'Copied to clipboard!',
	ERROR: 'Copy failed. Try manual copy button.',
	PASTE_SUCCESS: 'Text pasted - cleaning automatically...'
} as const;
