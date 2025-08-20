/**
 * Main text cleaner hook that combines all utilities
 */

import { createFeedbackManager } from './feedbackManager.js';
import { createMobileDetector } from './deviceDetection.js';
import { createTouchEventManager, type TouchEventHandlers } from './touchEvents.js';
import {
	processText,
	handlePasteEvent,
	type ProcessingCallbacks
} from './textProcessingWorkflow.js';
import { copyToClipboard } from './clipboardOperations.js';
import { debounce } from './debounce.js';
import type { CleaningResult } from './textCleaner.js';
import type { TouchFeedback } from '../types/feedback.js';
import { TIMING, LIMITS } from '../constants/ui.js';
import { FEEDBACK_MESSAGES } from '../types/feedback.js';

export interface TextCleanerState {
	inputText: string;
	cleaningResult: CleaningResult | null;
	copySuccess: boolean;
	showDiff: boolean;
	inputMinimized: boolean;
	isMobile: boolean;
	touchFeedback: TouchFeedback | null;
}

export interface TextCleanerActions {
	setInputText: (text: string) => void;
	handleClean: (autoCopy?: boolean) => Promise<void>;
	handleCopy: () => Promise<void>;
	handleReset: () => void;
	handleExpandInput: () => void;
	setShowDiff: (show: boolean) => void;
	clearFeedback: () => void;
	handleTouchStart: () => void;
	handleTouchEnd: () => void;
	handleTouchCancel: () => void;
	handlePaste: (event: ClipboardEvent) => Promise<void>;
	cleanup: () => void;
}

export function createTextCleaner(): {
	state: TextCleanerState;
	actions: TextCleanerActions;
} {
	// Initialize managers
	const feedbackManager = createFeedbackManager();
	const mobileDetector = createMobileDetector();

	// State
	const state: TextCleanerState = $state({
		inputText: '',
		cleaningResult: null,
		copySuccess: false,
		showDiff: false,
		inputMinimized: false,
		isMobile: false,
		touchFeedback: null
	});

	// Update mobile state reactively
	$effect(() => {
		state.isMobile = mobileDetector.isMobile;
	});

	// Update feedback state reactively
	$effect(() => {
		state.touchFeedback = feedbackManager.current;
	});

	// Processing callbacks
	const processingCallbacks: ProcessingCallbacks = {
		onProcessingStart: (feedback) =>
			feedbackManager.show(feedback.message, feedback.type, feedback.id),
		onProcessingComplete: (result) => {
			state.cleaningResult = result;
			feedbackManager.clear();
		},
		onCopySuccess: (feedback) => {
			state.copySuccess = true;
			feedbackManager.show(feedback.message, feedback.type, feedback.id);
		},
		onCopyError: (feedback) => {
			feedbackManager.show(feedback.message, feedback.type, feedback.id);
		},
		onValidationError: (feedback) => {
			feedbackManager.show(feedback.message, feedback.type, feedback.id);
		}
	};

	// Touch event handlers
	const touchHandlers: TouchEventHandlers = {
		onLongPress: (feedback) => feedbackManager.show(feedback.message, feedback.type, feedback.id),
		onTouchEnd: () => {
			if (state.touchFeedback?.id === 'long-press') {
				feedbackManager.clearById('long-press');
			}
		}
	};

	const touchEventManager = createTouchEventManager(
		{
			longPressDelay: TIMING.LONG_PRESS_DELAY,
			feedbackDuration: TIMING.LONG_PRESS_FEEDBACK_DURATION
		},
		touchHandlers
	);

	// Debounced functions for performance
	const debouncedClean = debounce(async (...args: unknown[]) => {
		const autoCopy = args[0] as boolean | undefined;
		const shouldAutoCopy = autoCopy ?? false;
		const result = await processText(
			state.inputText,
			{
				clipboard: { maxSize: LIMITS.MAX_CLIPBOARD_SIZE },
				isMobile: state.isMobile
			},
			processingCallbacks,
			{ autoCopy: shouldAutoCopy, minimizeInput: shouldAutoCopy }
		);

		if (result && shouldAutoCopy) {
			state.inputMinimized = true;
		}
	}, 100);

	// Actions
	const actions: TextCleanerActions = {
		setInputText: (text: string) => {
			state.inputText = text;
			state.copySuccess = false;
		},

		handleClean: async (autoCopy = false) => {
			await debouncedClean(autoCopy);
		},

		handleCopy: async () => {
			if (!state.cleaningResult) {
				if (state.isMobile) {
					feedbackManager.show('No text to copy', 'error');
				}
				return;
			}

			if (state.isMobile) {
				feedbackManager.show('Copying to clipboard...', 'processing');
			}

			const result = await copyToClipboard(state.cleaningResult.cleaned, {
				maxSize: LIMITS.MAX_CLIPBOARD_SIZE
			});

			if (result.success) {
				state.copySuccess = true;
				if (state.isMobile) {
					feedbackManager.show(FEEDBACK_MESSAGES.SUCCESS, 'success');
				}
			} else {
				if (state.isMobile) {
					feedbackManager.show(result.error || FEEDBACK_MESSAGES.ERROR, 'error');
				}
			}
		},

		handleReset: () => {
			state.inputText = '';
			state.cleaningResult = null;
			state.copySuccess = false;
			state.inputMinimized = false;
			state.showDiff = false;
			feedbackManager.clear();
			touchEventManager.cleanup();
		},

		handleExpandInput: () => {
			state.inputMinimized = false;
		},

		setShowDiff: (show: boolean) => {
			state.showDiff = show;
		},

		clearFeedback: () => {
			feedbackManager.clear();
		},

		handleTouchStart: touchEventManager.handleTouchStart,
		handleTouchEnd: touchEventManager.handleTouchEnd,
		handleTouchCancel: touchEventManager.handleTouchCancel,

		handlePaste: async (event: ClipboardEvent) => {
			event.preventDefault();

			const { text, result } = await handlePasteEvent(
				event,
				{
					clipboard: { maxSize: LIMITS.MAX_CLIPBOARD_SIZE },
					isMobile: state.isMobile
				},
				processingCallbacks
			);

			if (text) {
				state.inputText = text;
				state.showDiff = false;
				if (result) {
					state.inputMinimized = true;
				}
			}
		},

		cleanup: () => {
			feedbackManager.cleanup();
			mobileDetector.cleanup();
			touchEventManager.cleanup();
		}
	};

	return { state, actions };
}
