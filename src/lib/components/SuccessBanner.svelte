<script lang="ts">
	import type { CleaningResult } from '$lib/utils/textCleaner.js';
	import Icon from '@iconify/svelte';
	import { ripple } from '$lib/utils/ripple';

	let {
		cleaningResult,
		handleMobileCopy,
		copyCleanText
	}: {
		cleaningResult: CleaningResult;
		handleMobileCopy: () => Promise<void>;
		copyCleanText: () => Promise<void>;
	} = $props();
</script>

<!-- Success Banner -->
<div
	class="animate-slide-up overflow-hidden rounded-2xl border border-emerald-400/30 bg-emerald-500/10 shadow-lg ring-1 ring-emerald-400/30 transition-all duration-300"
>
	<div class="px-6 py-4">
		<!-- Top: icon + text -->
		<div class="flex items-center space-x-3">
			<!-- Icon -->
			<div
				class="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 ring-1 ring-emerald-400/30"
			>
				<Icon icon="mdi:check" class="h-5 w-5 text-emerald-300" />
			</div>

			<!-- Text -->
			<div class="mt-3 flex-1 sm:mt-0">
				<h3 class="text-lg font-semibold text-emerald-300">
					✨ Text successfully cleaned and copied!
				</h3>
				<p class="text-sm text-emerald-400">
					Ready to paste anywhere • {cleaningResult.cleaned.length} characters
				</p>
			</div>
		</div>

		<!-- Bottom: action buttons -->
		<div class="mt-4 flex flex-col sm:flex-row sm:justify-end sm:space-x-4">
			<!-- Mobile / primary full-width -->
			<button
				use:ripple
				onclick={handleMobileCopy}
				class="relative inline-flex min-h-[44px] w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-medium text-white shadow hover:bg-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:outline-none sm:hidden"
			>
				<Icon icon="mdi:content-copy" class="h-4 w-4" />
				<span>Copy Again</span>
			</button>

			<!-- Desktop inline button (shows on ≥sm) -->
			<button
				onclick={copyCleanText}
				class="hidden items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:outline-none sm:inline-flex"
			>
				<Icon icon="mdi:content-copy" class="h-4 w-4" />
				<span>Copy Again</span>
			</button>
		</div>
	</div>
</div>
