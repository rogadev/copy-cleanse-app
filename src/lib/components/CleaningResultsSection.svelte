<script lang="ts">
	import type { CleaningResult } from '$lib/utils/textCleaner.js';
	import HighlightedText from '$lib/components/HighlightedText.svelte';
	import Icon from '@iconify/svelte';

	let {
		cleaningResult,
		hasChanges,
		showDiff = $bindable(),
		isMobile = false
	}: {
		cleaningResult: CleaningResult;
		hasChanges: boolean;
		showDiff?: boolean;
		isMobile?: boolean;
	} = $props();

	let changeCount = $derived(cleaningResult?.changes.length ?? 0);

	const CARD_CLASSES =
		'rounded-2xl border border-white/10 bg-white/5 ring-1 ring-white/10 overflow-hidden animate-slide-up transition-all duration-300 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60';
</script>

<!-- Cleaning Results Section -->
<div class={CARD_CLASSES}>
	<div class="border-b border-white/10 px-6 py-4">
		<div
			class="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0"
		>
			<!-- Text Content -->
			<div class="flex items-center space-x-3">
				<div
					class="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300 ring-1 ring-amber-400/30"
				>
					<Icon icon="mdi:eye" class="h-4 w-4 text-amber-300" />
				</div>
				<div class="flex-1">
					<h2 class="text-lg font-semibold text-slate-100">Cleaning Results</h2>
					<p class="text-sm text-slate-300">
						{#if hasChanges}
							View changes made to your original text
						{:else}
							Your text was already clean
						{/if}
					</p>
				</div>
			</div>

			<!-- Visual Change Count Indicator + Show/Hide Button -->
			<div class="flex {isMobile ? 'flex-col space-y-3' : 'items-center justify-between'}">
				<!-- Change Count Indicator -->
				<div class="flex items-center {isMobile ? 'justify-center' : 'space-x-2'}">
					{#if hasChanges}
						<div class="flex items-center space-x-2">
							<div class="flex gap-1 text-right">
								<Icon icon="mdi:check-circle" class="text-emerald-300" />
								<span class="text-xs text-emerald-400">
									{changeCount === 1 ? 'issue' : 'issues'} fixed
								</span>
							</div>
							<div
								class="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300 ring-2 ring-emerald-400/30"
							>
								<div class="text-lg font-bold text-emerald-400">{changeCount}</div>
							</div>
						</div>
					{:else}
						<div class="flex items-center space-x-2">
							<div class="flex gap-1 text-right">
								<Icon icon="mdi:check-circle" class="text-slate-300" />
								<span class="text-xs text-slate-400">issues found</span>
							</div>
							<div
								class="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-500/20 text-slate-300 ring-2 ring-slate-400/30"
							>
								<div class="text-lg font-bold text-slate-300">0</div>
							</div>
						</div>
					{/if}
				</div>

				<!-- Show/Hide Button -->
				<button
					onclick={() => (showDiff = !showDiff)}
					class="inline-flex {isMobile
						? 'min-h-[44px] w-full'
						: ''} items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-600 focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:outline-none"
				>
					{#if showDiff}
						<Icon icon="mdi:eye-off" class="h-4 w-4" />
						<span>Hide</span>
					{:else}
						<Icon icon="mdi:eye" class="h-4 w-4" />
						<span>Show</span>
					{/if}
				</button>
			</div>
		</div>
	</div>

	{#if showDiff}
		<div class="p-6">
			<!-- Legend -->
			{#if hasChanges}
				<div class="mb-4 flex flex-wrap items-center gap-4 text-xs">
					<div class="flex items-center space-x-1">
						<div class="h-3 w-3 rounded-full border border-yellow-500/30 bg-yellow-500/20"></div>
						<span class="text-slate-300">Smart quotes</span>
					</div>
					<div class="flex items-center space-x-1">
						<div class="h-3 w-3 rounded-full border border-red-500/30 bg-red-500/20"></div>
						<span class="text-slate-300">Em/En dashes</span>
					</div>
					<div class="flex items-center space-x-1">
						<div class="h-3 w-3 rounded-full border border-purple-500/30 bg-purple-500/20"></div>
						<span class="text-slate-300">Hidden characters</span>
					</div>
					<div class="flex items-center space-x-1">
						<div class="h-3 w-3 rounded-full border border-blue-500/30 bg-blue-500/20"></div>
						<span class="text-slate-300">Ellipses</span>
					</div>
					<div class="flex items-center space-x-1">
						<div class="h-3 w-3 rounded-full border border-orange-500/30 bg-orange-500/20"></div>
						<span class="text-slate-300">URL tracking</span>
					</div>
				</div>
			{/if}

			<!-- Original Text with Highlights -->
			<div
				class="overflow-hidden rounded-lg border border-white/10 bg-slate-950/40 ring-1 ring-white/10"
			>
				<div class="border-b border-white/10 px-4 py-3">
					<p class="text-sm font-medium text-slate-300">
						{#if hasChanges}
							Original text with highlighted changes:
						{:else}
							Original text (no changes needed):
						{/if}
					</p>
				</div>
				<div class="max-h-[40vh] overflow-y-auto p-4">
					{#if hasChanges}
						<HighlightedText text={cleaningResult.original} changes={cleaningResult.changes} />
					{:else}
						<div class="font-mono text-sm whitespace-pre-wrap text-slate-100">
							{cleaningResult.original}
						</div>
					{/if}
				</div>
			</div>
		</div>
	{/if}
</div>
