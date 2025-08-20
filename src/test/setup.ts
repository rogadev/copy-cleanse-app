import { vi } from 'vitest';

// Mock Svelte 5 runes for testing
(globalThis as { $state?: (initial: unknown) => { value: unknown } }).$state = vi.fn((initial) => {
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

(globalThis as { $derived?: (fn: () => unknown) => unknown }).$derived = vi.fn((fn) => fn());
(globalThis as { $effect?: (fn: () => (() => void) | void) => void }).$effect = vi.fn((fn) => fn());

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
(globalThis as { TouchEvent?: unknown }).TouchEvent = class TouchEvent extends Event {
	constructor(type: string, eventInitDict?: TouchEventInit) {
		super(type, eventInitDict);
	}
};

// Mock ResizeObserver
(globalThis as { ResizeObserver?: typeof ResizeObserver }).ResizeObserver = vi
	.fn()
	.mockImplementation(() => ({
		observe: vi.fn(),
		unobserve: vi.fn(),
		disconnect: vi.fn()
	})) as typeof ResizeObserver;
