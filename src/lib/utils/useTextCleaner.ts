/**
 * Main text cleaner hook that combines all utilities
 */

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
import { TIMING, LIMITS } from '../constants/ui.js';

export interface TextCleanerState {
	inputText: string;
	cleaningResult: CleaningResult | null;
	copySuccess: boolean;
	showDiff: boolean;
	inputMinimized: boolean;
	isMobile: boolean;
}

export interface TextCleanerActions {
	setInputText: (text: string) => void;
	handleClean: (autoCopy?: boolean) => Promise<void>;
	handleCopy: () => Promise<void>;
	handleReset: () => void;
	handleExpandInput: () => void;
	setShowDiff: (show: boolean) => void;
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
	const mobileDetector = createMobileDetector();

	// State
	const state: TextCleanerState = $state({
		inputText: '',
		cleaningResult: null,
		copySuccess: false,
		showDiff: false,
		inputMinimized: false,
		isMobile: false
	});

	// Update mobile state reactively
	$effect(() => {
		state.isMobile = mobileDetector.isMobile;
	});

	// Processing callbacks
	const processingCallbacks: ProcessingCallbacks = {
		onProcessingComplete: (result) => {
			state.cleaningResult = result;
		}
	};

	// Touch event handlers
	const touchHandlers: TouchEventHandlers = {
		onLongPress: () => {
			// Long press functionality without feedback
		},
		onTouchEnd: () => {
			// Touch end functionality without feedback
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
				clipboard: { maxSize: LIMITS.MAX_CLIPBOARD_SIZE }
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
				return;
			}

			const result = await copyToClipboard(state.cleaningResult.cleaned, {
				maxSize: LIMITS.MAX_CLIPBOARD_SIZE
			});

			if (result.success) {
				state.copySuccess = true;
			}
		},

		handleReset: () => {
			state.inputText = '';
			state.cleaningResult = null;
			state.copySuccess = false;
			state.inputMinimized = false;
			state.showDiff = false;
			touchEventManager.cleanup();
		},

		handleExpandInput: () => {
			state.inputMinimized = false;
		},

		setShowDiff: (show: boolean) => {
			state.showDiff = show;
		},

		handleTouchStart: touchEventManager.handleTouchStart,
		handleTouchEnd: touchEventManager.handleTouchEnd,
		handleTouchCancel: touchEventManager.handleTouchCancel,

		handlePaste: async (event: ClipboardEvent) => {
			event.preventDefault();

			const { text, result } = await handlePasteEvent(
				event,
				{
					clipboard: { maxSize: LIMITS.MAX_CLIPBOARD_SIZE }
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
			mobileDetector.cleanup();
			touchEventManager.cleanup();
		}
	};

	return { state, actions };
}
