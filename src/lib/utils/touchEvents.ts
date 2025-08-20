/**
 * Touch event handling utilities for mobile interactions
 *
 * Provides a clean API for handling long press detection, touch feedback,
 * and mobile-specific touch interactions with automatic timer management.
 */

/**
 * Configuration options for touch event behavior
 */
export interface TouchEventConfig {
	/** Duration in milliseconds to detect a long press (default: 500ms) */
	longPressDelay: number;
	/** Duration in milliseconds to show feedback messages (default: 2000ms) */
	feedbackDuration: number;
}

/**
 * Type guard to ensure positive duration values
 */
function isValidDuration(value: number): value is number {
	return Number.isFinite(value) && value > 0;
}

/**
 * Default configuration for touch events
 */
export const DEFAULT_TOUCH_CONFIG: TouchEventConfig = {
	longPressDelay: 500,
	feedbackDuration: 2000
} as const;

/**
 * Event handlers for touch interactions
 */
export interface TouchEventHandlers {
	/** Called when a long press is detected */
	onLongPress: () => void;
	/** Called when touch interaction ends (always called) */
	onTouchEnd: () => void;
	/** Called when a short tap is detected (optional) */
	onShortTap?: () => void;
}

/**
 * Creates a touch event manager for handling mobile touch interactions
 *
 * @param config - Partial configuration object (uses defaults for missing values)
 * @param handlers - Event handlers for touch interactions
 * @returns Object with touch event handlers and cleanup function
 *
 * @example
 * ```typescript
 * const touchManager = createTouchEventManager(
 *   { longPressDelay: 600 },
 *   {
 *     onLongPress: (feedback) => showFeedback(feedback),
 *     onTouchEnd: () => clearFeedback(),
 *     onShortTap: () => handleTap()
 *   }
 * );
 *
 * // Use in component
 * <textarea ontouchstart={touchManager.handleTouchStart} />
 * ```
 */
export function createTouchEventManager(
	config: Partial<TouchEventConfig> = {},
	handlers: TouchEventHandlers
) {
	const finalConfig = { ...DEFAULT_TOUCH_CONFIG, ...config };
	// Validate config
	if (
		!isValidDuration(finalConfig.longPressDelay) ||
		!isValidDuration(finalConfig.feedbackDuration)
	) {
		throw new Error('Touch event delays must be positive finite numbers');
	}

	let touchStartTime = 0;
	let longPressTimer: ReturnType<typeof setTimeout> | null = null;
	let feedbackTimer: ReturnType<typeof setTimeout> | null = null;

	function clearTimers() {
		if (longPressTimer) {
			clearTimeout(longPressTimer);
			longPressTimer = null;
		}
		if (feedbackTimer) {
			clearTimeout(feedbackTimer);
			feedbackTimer = null;
		}
	}

	function handleTouchStart() {
		touchStartTime = Date.now();

		// Set up long press detection
		longPressTimer = window.setTimeout(() => {
			handlers.onLongPress();

			// Clear after specified duration
			feedbackTimer = window.setTimeout(() => {
				handlers.onTouchEnd();
			}, finalConfig.feedbackDuration);
		}, finalConfig.longPressDelay);
	}

	function handleTouchEnd() {
		clearTimers();

		const touchDuration = Date.now() - touchStartTime;

		// If it was a short tap, call short tap handler if provided
		if (touchDuration < finalConfig.longPressDelay) {
			handlers.onShortTap?.();
		}

		handlers.onTouchEnd();
	}

	function handleTouchCancel() {
		clearTimers();
	}

	return {
		handleTouchStart,
		handleTouchEnd,
		handleTouchCancel,
		cleanup: clearTimers
	};
}
