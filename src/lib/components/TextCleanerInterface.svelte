<script lang="ts">
	import { cleanText, type CleaningResult } from '$lib/utils/textCleaner.js';
	import { onMount } from 'svelte';
	import { createMobileDetector } from '$lib/utils/deviceDetection.js';
	import { fade } from 'svelte/transition';
	import SuccessBanner from '$lib/components/SuccessBanner.svelte';
	import CleaningResultsSection from '$lib/components/CleaningResultsSection.svelte';
	import Icon from '@iconify/svelte';

	// Props
	let { headerMinimal = $bindable() }: { headerMinimal?: boolean } = $props();

	// State management
	let inputText = $state('');
	let cleaningResult = $state<CleaningResult | null>(null);
	let inputMinimized = $state(false);
	let isMobile = $state(false);
	// Focus state for textarea to control overlay hint visibility
	let isInputFocused = $state(false);

	// Constants
	const TIMING = {
		LONG_PRESS_DELAY: 500
	} as const;

	const LIMITS = {
		MAX_CLIPBOARD_SIZE: 1000000, // 1MB limit for safety
		MOBILE_BREAKPOINT: 768
	} as const;

	const CARD_CLASSES =
		'rounded-2xl border border-white/10 bg-white/5 ring-1 ring-white/10 overflow-hidden animate-slide-up transition-all duration-300 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60';

	// Timer utility
	function createTimer() {
		let timerId: ReturnType<typeof setTimeout> | null = null;

		const timer = {
			set: (callback: () => void, delay: number) => {
				timer.clear();
				timerId = setTimeout(callback, delay);
			},
			clear: () => {
				if (timerId !== null) {
					clearTimeout(timerId);
					timerId = null;
				}
			}
		};

		return timer;
	}

	const longPressTimer = createTimer();

	// Mobile detection
	let mobileDetector: ReturnType<typeof createMobileDetector> | null = null;

	onMount(() => {
		mobileDetector = createMobileDetector();
	});

	$effect(() => {
		if (mobileDetector) {
			isMobile = mobileDetector.isMobile;
		}
	});

	// Cleanup effects
	$effect(() => {
		return () => {
			mobileDetector?.cleanup();
			longPressTimer.clear();
		};
	});

	// Derived values
	let changeCount = $derived(cleaningResult?.changes.length ?? 0);
	let hasChanges = $derived(changeCount > 0);

	// Core functions
	function handleClean(autoCopy = false) {
		if (!inputText.trim()) return;

		cleaningResult = cleanText(inputText);
		inputMinimized = true;
		headerMinimal = true;

		if (autoCopy) {
			copyCleanText();
		}
	}

	async function copyCleanText() {
		if (!cleaningResult) return;

		try {
			const textLength = cleaningResult.cleaned.length;

			if (textLength > LIMITS.MAX_CLIPBOARD_SIZE) {
				throw new Error('Text too large for clipboard');
			}

			await navigator.clipboard.writeText(cleaningResult.cleaned);
		} catch (err) {
			console.error('Failed to copy text:', err);

			try {
				await fallbackCopyToClipboard(cleaningResult.cleaned);
			} catch (fallbackErr) {
				console.error('Fallback copy also failed:', fallbackErr);
			}
		}
	}

	async function fallbackCopyToClipboard(text: string): Promise<void> {
		return new Promise((resolve, reject) => {
			const textarea = document.createElement('textarea');
			textarea.value = text;
			textarea.style.position = 'fixed';
			textarea.style.left = '-999999px';
			textarea.style.top = '-999999px';
			document.body.appendChild(textarea);

			try {
				textarea.focus();
				textarea.select();

				const successful = document.execCommand('copy');
				document.body.removeChild(textarea);

				if (successful) {
					resolve();
				} else {
					reject(new Error('execCommand copy failed'));
				}
			} catch (err) {
				document.body.removeChild(textarea);
				reject(err);
			}
		});
	}

	function reset() {
		inputText = '';
		cleaningResult = null;
		inputMinimized = false;
		headerMinimal = false;

		if (isMobile) {
			longPressTimer.clear();
		}
	}

	function expandInput() {
		inputMinimized = false;
		headerMinimal = false;
	}

	// Touch event handlers for mobile
	function handleTouchStart() {
		if (!isMobile) return;

		longPressTimer.set(() => {
			// Long press functionality
		}, TIMING.LONG_PRESS_DELAY);
	}

	function handleTouchEnd() {
		if (!isMobile) return;
		longPressTimer.clear();
	}

	function handleTouchCancel() {
		if (!isMobile) return;
		longPressTimer.clear();
	}

	// Mobile-specific handlers
	function handleMobilePaste(event: ClipboardEvent) {
		const pasted = event.clipboardData?.getData('text');
		if (!pasted) return;

		event.preventDefault();
		inputText = pasted;
		handleClean(true);
	}

	async function handleMobileCopy() {
		if (!cleaningResult) return;
		await copyCleanText();
	}

	function handleMobileClean() {
		if (!inputText.trim()) return;
		handleClean(true);
	}
</script>

<svelte:window onpaste={handleMobilePaste} />

<div class="mt-8 space-y-6">
	<!-- Input Section -->
	<div class="space-y-6">
		{#if inputMinimized && cleaningResult}
			<!-- Minimized Input State -->
			<div class={CARD_CLASSES}>
				<div class="px-6 py-4">
					<div
						class="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0"
					>
						<!-- Text Info Section -->
						<div class="flex items-center space-x-3">
							<div
								class="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-400/30"
							>
								<Icon icon="mdi:check-circle" class="h-4 w-4" />
							</div>
							<div class="flex-1">
								<h3 class="text-lg font-semibold text-slate-100">Text Processed</h3>
								<p class="text-sm text-slate-300">
									{inputText.length} characters • {changeCount}
									{changeCount === 1 ? 'issue' : 'issues'} found
								</p>
							</div>
						</div>

						<!-- Action Buttons -->
						<div class="flex {isMobile ? 'flex-col space-y-3' : 'justify-end gap-2'}">
							<button
								onclick={expandInput}
								class="inline-flex {isMobile
									? 'w-full'
									: 'flex-1'} items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium text-slate-200 ring-1 ring-white/10 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none {isMobile
									? 'min-h-[44px]'
									: 'sm:flex-initial'}"
							>
								<Icon icon="mdi:pencil" class="mr-1 h-4 w-4" />
								Edit
							</button>
							<button
								onclick={reset}
								class="inline-flex {isMobile
									? 'w-full'
									: 'flex-1'} items-center justify-center rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-600 focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:outline-none {isMobile
									? 'min-h-[44px]'
									: 'sm:flex-initial'}"
							>
								<Icon icon="mdi:plus" class="mr-1 h-4 w-4" />
								New
							</button>
						</div>
					</div>
				</div>
			</div>
		{:else}
			<!-- Full Input State -->
			<div class={CARD_CLASSES}>
				<div class="p-6">
					<div class="relative">
						<textarea
							id="input-text"
							bind:value={inputText}
							onfocus={() => (isInputFocused = true)}
							onblur={() => (isInputFocused = false)}
							ontouchstart={handleTouchStart}
							ontouchend={handleTouchEnd}
							ontouchcancel={handleTouchCancel}
							placeholder=""
							class="h-[21.5rem] w-full resize-y rounded-xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-100 shadow-inner ring-1 ring-white/10 placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-400 focus:outline-none lg:h-[15.5rem]"
							style="max-height: 50vh; overflow-y: auto;"
						></textarea>
						{#if !isInputFocused && inputText.length === 0}
							<div
								class="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
								transition:fade={{ duration: 250 }}
							>
								<span
									class="relative inline-block text-sm font-semibold text-indigo-100 select-none"
								>
									<span
										class="absolute inset-0 -z-10 animate-[gentle-glow_5s_ease-in-out_infinite] rounded-full bg-indigo-500 opacity-40 blur-2xl"
									></span>
									Paste your AI generated text...
								</span>
							</div>
						{/if}
						{#if inputText.length > 0}
							<div class="absolute top-3 right-3">
								<div
									class="rounded-lg bg-indigo-500/10 px-2 py-1 text-xs font-medium text-indigo-300 ring-1 ring-indigo-400/30"
								>
									{inputText.length} chars
								</div>
							</div>
						{/if}
					</div>

					<!-- Desktop Clean Button -->
					{#if !isMobile && inputText.length > 0}
						<div class="mt-4">
							<button
								onclick={() => handleClean(true)}
								class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-600 focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:outline-none"
							>
								<Icon icon="mdi:broom" class="h-5 w-5" />
								<span>Clean Text</span>
							</button>
						</div>
					{/if}

					<!-- Mobile Clean Button -->
					{#if isMobile}
						<div class="mt-4 flex flex-col space-y-3">
							<button
								onclick={() => handleMobileClean()}
								disabled={!inputText.trim()}
								class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-600 focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
								style="min-height: 44px;"
							>
								<Icon icon="mdi:broom" class="h-5 w-5" />
								<span>Clean Text</span>
							</button>

							{#if !inputText.trim()}
								<p class="text-center text-sm text-slate-400">
									Enter or paste text above to clean it
								</p>
							{/if}
						</div>
					{/if}
				</div>
			</div>
		{/if}
	</div>

	<!-- Results Section -->
	{#if cleaningResult}
		<div class="space-y-6">
			<!-- Success Banner -->
			<SuccessBanner {cleaningResult} {handleMobileCopy} {copyCleanText} />

			<!-- Cleaning Results Section -->
			<CleaningResultsSection {cleaningResult} {hasChanges} {isMobile} />
		</div>
	{:else}
		<div class="space-y-6">
			<div class={CARD_CLASSES}>
				<div class="p-8 text-center">
					<div
						class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-500/20 ring-1 ring-slate-400/30"
					>
						<Icon icon="mdi:file-document-outline" class="h-6 w-6 text-slate-400" />
					</div>
					<h3 class="text-lg font-semibold text-slate-100">Ready to analyze</h3>
					<p class="mt-2 text-sm text-slate-400">Results will appear here after processing</p>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	@keyframes gentle-glow {
		0%,
		100% {
			opacity: 0.25;
			transform: scale(1);
		}
		50% {
			opacity: 0.6;
			transform: scale(1.15);
		}
	}
</style>
