import { vi } from 'vitest';

// Mock Svelte 5 runes for testing
(globalThis as any).$state = vi.fn((initial) => {
	let value = initial;
	return {
		get value() {
			return value;
		},
		set value(newValue) {
			value = newValue;
		}
	};
});

(globalThis as any).$derived = vi.fn((fn) => fn());
(globalThis as any).$effect = vi.fn((fn) => fn());

// Mock navigator.clipboard for testing
Object.assign(navigator, {
	clipboard: {
		writeText: vi.fn(() => Promise.resolve()),
		readText: vi.fn(() => Promise.resolve(''))
	}
});

// Mock window.matchMedia for responsive tests
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: vi.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: vi.fn(), // deprecated
		removeListener: vi.fn(), // deprecated
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn()
	}))
});

// Mock touch events
(globalThis as any).TouchEvent = class TouchEvent extends Event {
	constructor(type: string, eventInitDict?: TouchEventInit) {
		super(type, eventInitDict);
	}
} as any;

// Mock ResizeObserver
(globalThis as any).ResizeObserver = vi.fn().mockImplementation(() => ({
	observe: vi.fn(),
	unobserve: vi.fn(),
	disconnect: vi.fn()
}));
