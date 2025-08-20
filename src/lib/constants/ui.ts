/**
 * UI constants and styling configurations
 */

export const TIMING = {
	LONG_PRESS_DELAY: 500,
	SUCCESS_FEEDBACK_DURATION: 3000,
	ERROR_FEEDBACK_DURATION: 5000,
	LONG_PRESS_FEEDBACK_DURATION: 2000
} as const;

export const LIMITS = {
	MAX_CLIPBOARD_SIZE: 1000000, // 1MB limit for safety
	MOBILE_BREAKPOINT: 768
} as const;

export const CARD_CLASSES =
	'overflow-hidden rounded-xl border border-white/20 bg-white/80 shadow-xl backdrop-blur-sm';

export const BUTTON_STYLES = {
	mobilePrimary:
		'flex w-full items-center justify-center space-x-3 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4 text-base font-medium text-white shadow-lg transition-all duration-200 hover:from-green-700 hover:to-emerald-700 focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:outline-none active:scale-95 disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-500 min-h-[44px]',
	mobileSecondary:
		'flex flex-1 items-center justify-center space-x-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:outline-none active:scale-95 min-h-[44px]',
	desktopPrimary:
		'group flex w-full items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:outline-none',
	desktopSecondary:
		'group flex w-full items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-3 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:from-green-700 hover:to-emerald-700 focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:outline-none'
} as const;
