/**
 * Enhanced clipboard operations with fallback support and error handling
 */

export interface ClipboardConfig {
	maxSize: number;
}

export interface ClipboardResult {
	success: boolean;
	error?: string;
	errorType?: 'permission' | 'size' | 'fallback' | 'unknown';
}

/**
 * Fallback clipboard copy method for older browsers that don't support navigator.clipboard
 * Uses the deprecated execCommand API as a last resort
 */
async function fallbackCopyToClipboard(text: string): Promise<void> {
	return new Promise((resolve, reject) => {
		// Create a temporary textarea element
		const textarea = document.createElement('textarea');
		textarea.value = text;
		textarea.style.position = 'fixed';
		textarea.style.left = '-999999px';
		textarea.style.top = '-999999px';
		document.body.appendChild(textarea);

		try {
			textarea.focus();
			textarea.select();

			// Try to copy using the older execCommand method
			const successful = document.execCommand('copy');
			document.body.removeChild(textarea);

			if (successful) {
				resolve();
			} else {
				reject(new Error('execCommand copy failed'));
			}
		} catch (err) {
			document.body.removeChild(textarea);
			reject(err);
		}
	});
}

/**
 * Enhanced clipboard copy with comprehensive error handling and fallback support
 */
export async function copyToClipboard(
	text: string,
	config: ClipboardConfig
): Promise<ClipboardResult> {
	try {
		// Check if text is too large (some browsers have limits)
		if (text.length > config.maxSize) {
			return {
				success: false,
				error: 'Text too large for clipboard',
				errorType: 'size'
			};
		}

		// Try modern clipboard API first
		await navigator.clipboard.writeText(text);
		return { success: true };
	} catch (err) {
		console.error('Primary clipboard copy failed:', err);

		// Determine specific error type for better user feedback
		let errorType: ClipboardResult['errorType'] = 'unknown';
		let errorMessage = 'Copy failed. Try manual copy button.';

		if (err instanceof Error) {
			if (err.message.includes('too large')) {
				errorType = 'size';
				errorMessage = 'Text too large for clipboard. Use manual copy.';
			} else if (err.name === 'NotAllowedError' || err.message.includes('permission')) {
				errorType = 'permission';
				errorMessage = 'Clipboard access denied. Use manual copy button.';
			}
		} else if (err instanceof DOMException && err.name === 'NotAllowedError') {
			errorType = 'permission';
			errorMessage = 'Clipboard access denied. Use manual copy button.';
		}

		// Try fallback copy method for older browsers
		try {
			await fallbackCopyToClipboard(text);
			return { success: true };
		} catch (fallbackErr) {
			console.error('Fallback copy also failed:', fallbackErr);
			return {
				success: false,
				error: errorMessage,
				errorType
			};
		}
	}
}

/**
 * Get appropriate error message based on clipboard result
 */
export function getClipboardErrorMessage(result: ClipboardResult): string {
	if (result.success) return '';

	switch (result.errorType) {
		case 'size':
			return 'Text too large for clipboard. Use manual copy.';
		case 'permission':
			return 'Clipboard access denied. Use manual copy button.';
		case 'fallback':
			return 'Copy failed. Try manual copy button.';
		default:
			return result.error || 'Copy failed. Try manual copy button.';
	}
}
