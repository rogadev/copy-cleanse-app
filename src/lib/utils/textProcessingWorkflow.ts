/**
 * Text processing workflow management
 */

import { cleanText, type CleaningResult } from './textCleaner.js';
import { copyToClipboard, type ClipboardConfig } from './clipboardOperations.js';

export interface ProcessingConfig {
	clipboard: ClipboardConfig;
}

export interface ProcessingCallbacks {
	onProcessingComplete: (result: CleaningResult) => void;
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
		return null;
	}

	// Process the text
	const result = cleanText(inputText);
	callbacks.onProcessingComplete(result);

	// Auto-copy if requested
	if (options.autoCopy) {
		await copyToClipboard(result.cleaned, config.clipboard);
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

	// Process with auto-copy enabled
	const result = await processText(pastedText, config, callbacks, {
		autoCopy: true,
		minimizeInput: true
	});

	return { text: pastedText, result };
}
