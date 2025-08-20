<script lang="ts">
	import type { CleaningResult } from '$lib/utils/textCleaner.js';

	interface Props {
		cleaningResult: CleaningResult | null;
		showDiff: boolean;
		onCopy: () => Promise<void>;
		onToggleDiff: () => void;
		onReset: () => void;
	}

	let { cleaningResult, showDiff, onCopy, onToggleDiff, onReset }: Props = $props();

	const BUTTON_STYLES = {
		primary:
			'flex w-full items-center justify-center space-x-3 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4 text-base font-medium text-white shadow-lg transition-all duration-200 hover:from-green-700 hover:to-emerald-700 focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:outline-none active:scale-95 disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-500 min-h-[44px]',
		secondary:
			'flex flex-1 items-center justify-center space-x-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:outline-none active:scale-95 min-h-[44px]'
	} as const;
</script>

<div class="space-y-4">
	<!-- Primary Mobile Copy Button -->
	<button onclick={onCopy} disabled={!cleaningResult} class={BUTTON_STYLES.primary}>
		<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
			/>
		</svg>
		<span>Copy to Clipboard</span>
	</button>

	<!-- Secondary Mobile Actions -->
	<div class="flex space-x-3">
		<button onclick={onToggleDiff} class={BUTTON_STYLES.secondary}>
			<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
				/>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
				/>
			</svg>
			<span>{showDiff ? 'Hide' : 'Show'}</span>
		</button>

		<button onclick={onReset} class={BUTTON_STYLES.secondary}>
			<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
				/>
			</svg>
			<span>New</span>
		</button>
	</div>
</div>
