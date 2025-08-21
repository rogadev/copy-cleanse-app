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
	'overflow-hidden rounded-2xl border border-white/30 bg-white/90 shadow-2xl shadow-blue-900/10 backdrop-blur-lg ring-1 ring-white/20';

export const BUTTON_STYLES = {
	mobilePrimary:
		'flex w-full items-center justify-center space-x-3 rounded-xl bg-gradient-to-r from-green-600 via-green-600 to-emerald-600 px-6 py-4 text-base font-semibold text-white shadow-xl shadow-green-600/25 transition-all duration-300 hover:from-green-700 hover:via-green-700 hover:to-emerald-700 hover:shadow-2xl hover:shadow-green-600/40 hover:-translate-y-0.5 focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:outline-none active:scale-95 disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-500 min-h-[44px] backdrop-blur-sm ring-1 ring-white/20',
	mobileSecondary:
		'flex flex-1 items-center justify-center space-x-2 rounded-xl border border-white/30 bg-white/90 px-4 py-3 text-sm font-semibold text-gray-700 shadow-lg shadow-blue-900/10 backdrop-blur-lg ring-1 ring-white/20 transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-blue-900/20 hover:-translate-y-0.5 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:outline-none active:scale-95 min-h-[44px]',
	desktopPrimary:
		'group flex w-full items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-xl shadow-blue-600/25 transition-all duration-300 hover:from-blue-700 hover:via-blue-700 hover:to-indigo-700 hover:shadow-2xl hover:shadow-blue-600/40 hover:-translate-y-0.5 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:outline-none backdrop-blur-sm ring-1 ring-white/20',
	desktopSecondary:
		'group flex w-full items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-green-600 via-green-600 to-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-xl shadow-green-600/25 transition-all duration-300 hover:from-green-700 hover:via-green-700 hover:to-emerald-700 hover:shadow-2xl hover:shadow-green-600/40 hover:-translate-y-0.5 focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:outline-none backdrop-blur-sm ring-1 ring-white/20'
} as const;
