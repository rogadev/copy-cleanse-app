/**
 * Device detection utilities for responsive behavior
 */

export function detectMobile(): boolean {
	if (typeof window === 'undefined') return false;

	const userAgent = navigator.userAgent;
	const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
		userAgent
	);
	const isTouchDevice = 'ontouchstart' in window;
	const isSmallScreen = window.innerWidth <= 768;

	return isMobileUserAgent || (isTouchDevice && isSmallScreen);
}

export function createMobileDetector() {
	let isMobile = false;

	function updateMobileState() {
		isMobile = detectMobile();
	}

	// Initialize and set up listeners
	if (typeof window !== 'undefined') {
		updateMobileState();
		window.addEventListener('resize', updateMobileState);
		window.addEventListener('orientationchange', updateMobileState);
	}

	return {
		get isMobile() {
			return isMobile;
		},
		cleanup() {
			if (typeof window !== 'undefined') {
				window.removeEventListener('resize', updateMobileState);
				window.removeEventListener('orientationchange', updateMobileState);
			}
		}
	};
}
