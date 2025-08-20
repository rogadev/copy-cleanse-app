// place files you want to import through the `$lib` alias in this folder.

// Core utilities
export { cleanText, getCharacterName } from './utils/textCleaner.js';
export { createFeedbackManager } from './utils/feedbackManager.js';
export { createMobileDetector, detectMobile } from './utils/deviceDetection.js';
export { createTouchEventManager } from './utils/touchEvents.js';
export { copyToClipboard, getClipboardErrorMessage } from './utils/clipboardOperations.js';
export { processText, handlePasteEvent } from './utils/textProcessingWorkflow.js';
export { debounce, throttle } from './utils/debounce.js';
export { createTextCleaner } from './utils/useTextCleaner.js';

// Types
export type { CleaningResult, TextChange } from './utils/textCleaner.js';
export type { FeedbackType, TouchFeedback } from './types/feedback.js';
export type { TouchEventConfig, TouchEventHandlers } from './utils/touchEvents.js';
export type { ClipboardConfig, ClipboardResult } from './utils/clipboardOperations.js';

// Constants
export { FEEDBACK_MESSAGES, FEEDBACK_STYLES } from './types/feedback.js';
export { TIMING, LIMITS, CARD_CLASSES, BUTTON_STYLES } from './constants/ui.js';

// Components
export { default as HighlightedText } from './components/HighlightedText.svelte';
export { default as MobileActionButtons } from './components/MobileActionButtons.svelte';
