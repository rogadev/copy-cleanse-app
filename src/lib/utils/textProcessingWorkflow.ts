/**
 * Text processing workflow management
 */

import { cleanText, type CleaningResult } from './textCleaner.js';
import { copyToClipboard, type ClipboardConfig } from './clipboardOperations.js';
import type { TouchFeedback } from '../types/feedback.js';
import { FEEDBACK_MESSAGES } from '../types/feedback.js';

export interface ProcessingConfig {
	clipboard: ClipboardConfig;
	isMobile: boolean;
}

export interface ProcessingCallbacks {
	onProcessingStart: (feedback: TouchFeedback) => void;
	onProcessingComplete: (result: CleaningResult) => void;
	onCopySuccess: (feedback: TouchFeedback) => void;
	onCopyError: (feedback: TouchFeedback) => void;
	onValidationError: (feedback: TouchFeedback) => void;
}

export interface ProcessingOptions {
	autoCopy?: boolean;
	minimizeInput?: boolean;
}

/**
 * Comprehensive text processing workflow
 */
export async function processText(
	inputText: string,
	config: ProcessingConfig,
	callbacks: ProcessingCallbacks,
	options: ProcessingOptions = {}
): Promise<CleaningResult | null> {
	// Validation
	if (!inputText.trim()) {
		if (config.isMobile) {
			callbacks.onValidationError({
				message: FEEDBACK_MESSAGES.EMPTY_TEXT,
				type: 'error'
			});
		}
		return null;
	}

	// Show processing feedback for mobile
	if (config.isMobile) {
		callbacks.onProcessingStart({
			message: options.autoCopy ? FEEDBACK_MESSAGES.PROCESSING : FEEDBACK_MESSAGES.CLEANING,
			type: 'processing'
		});
	}

	// Process the text
	const result = cleanText(inputText);
	callbacks.onProcessingComplete(result);

	// Auto-copy if requested
	if (options.autoCopy) {
		const clipboardResult = await copyToClipboard(result.cleaned, config.clipboard);

		if (clipboardResult.success) {
			if (config.isMobile) {
				callbacks.onCopySuccess({
					message: FEEDBACK_MESSAGES.SUCCESS,
					type: 'success'
				});
			}
		} else {
			if (config.isMobile) {
				callbacks.onCopyError({
					message: clipboardResult.error || FEEDBACK_MESSAGES.ERROR,
					type: 'error'
				});
			}
		}
	}

	return result;
}

/**
 * Handle paste events with automatic processing
 */
export async function handlePasteEvent(
	event: ClipboardEvent,
	config: ProcessingConfig,
	callbacks: ProcessingCallbacks
): Promise<{ text: string; result: CleaningResult | null }> {
	const pastedText = event.clipboardData?.getData('text') || '';

	if (!pastedText) {
		return { text: '', result: null };
	}

	// Show paste feedback for mobile
	if (config.isMobile) {
		callbacks.onProcessingStart({
			message: FEEDBACK_MESSAGES.PASTE_SUCCESS,
			type: 'processing'
		});
	}

	// Process with auto-copy enabled
	const result = await processText(pastedText, config, callbacks, {
		autoCopy: true,
		minimizeInput: true
	});

	return { text: pastedText, result };
}
