<script lang="ts">
	import { slide } from 'svelte/transition';
	import { tick } from 'svelte';
	// How it Works section with collapsible info panel
	let { showInfo = $bindable() }: { showInfo: boolean } = $props();

	// Preserve scroll position to avoid page jump when toggling
	let scrollYBefore = 0;
	async function toggleInfo() {
		scrollYBefore = window.scrollY;
		showInfo = !showInfo;
		await tick();
		requestAnimationFrame(() => {
			window.scrollTo({ top: scrollYBefore });
		});
	}

	const CARD_CLASSES =
		'rounded-2xl border border-white/10 bg-white/5 ring-1 ring-white/10 overflow-hidden animate-slide-up transition-all duration-300 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60';
</script>

<!-- How it Works - Below the fold -->
<div class="mt-24">
	<div class={CARD_CLASSES}>
		<button
			onclick={toggleInfo}
			class="group flex w-full items-center justify-between px-6 py-4 text-left transition-all duration-300 hover:bg-white/10"
		>
			<div class="flex items-center space-x-3">
				<div
					class="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-400/30"
				>
					<svg
						class="h-4 w-4 text-indigo-300"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</div>
				<span class="text-lg font-semibold text-slate-100">How it works & Why it's useful</span>
			</div>
			<svg
				class="h-5 w-5 transform text-slate-400 transition-transform duration-200 {showInfo
					? 'rotate-180'
					: ''}"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
			</svg>
		</button>

		{#if showInfo}
			<div class="border-t border-white/10 px-6 py-6" transition:slide>
				<div class="grid gap-8 md:grid-cols-2">
					<div class="space-y-4">
						<div class="flex items-start space-x-3">
							<div
								class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red-500/20 ring-1 ring-red-500/30"
							>
								<svg class="h-3 w-3 text-red-300" fill="currentColor" viewBox="0 0 20 20">
									<path
										fill-rule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
										clip-rule="evenodd"
									/>
								</svg>
							</div>
							<div>
								<h3 class="font-semibold text-slate-100">What this tool detects</h3>
								<ul class="mt-2 space-y-2 text-sm text-slate-300">
									<li class="flex items-start space-x-2">
										<span class="text-slate-400">•</span>
										<span
											>Hidden whitespace characters (zero-width spaces, non-breaking spaces)</span
										>
									</li>
									<li class="flex items-start space-x-2">
										<span class="text-slate-400">•</span>
										<span>Smart quotes and curly apostrophes</span>
									</li>
									<li class="flex items-start space-x-2">
										<span class="text-slate-400">•</span>
										<span>Em dashes (—) and en dashes (–)</span>
									</li>
									<li class="flex items-start space-x-2">
										<span class="text-slate-400">•</span>
										<span>Unicode ellipsis (…) and soft hyphens</span>
									</li>
									<li class="flex items-start space-x-2">
										<span class="text-slate-400">•</span>
										<span>Fullwidth characters (Ａ１ → A1)</span>
									</li>
									<li class="flex items-start space-x-2">
										<span class="text-slate-400">•</span>
										<span>AI tracking URL parameters (?source=chatgpt, ?utm_source=openai)</span>
									</li>
									<li class="flex items-start space-x-2">
										<span class="text-slate-400">•</span>
										<span>All other suspicious Unicode markers</span>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="space-y-4">
						<div class="flex items-start space-x-3">
							<div
								class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/20 ring-1 ring-emerald-500/30"
							>
								<svg class="h-3 w-3 text-emerald-300" fill="currentColor" viewBox="0 0 20 20">
									<path
										fill-rule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clip-rule="evenodd"
									/>
								</svg>
							</div>
							<div>
								<h3 class="font-semibold text-slate-100">Why it's useful</h3>
								<ul class="mt-2 space-y-2 text-sm text-slate-300">
									<li class="flex items-start space-x-2">
										<span class="text-slate-400">•</span>
										<span>Removes AI detection markers from ChatGPT and other tools</span>
									</li>
									<li class="flex items-start space-x-2">
										<span class="text-slate-400">•</span>
										<span>Ensures clean text for publishing or submission</span>
									</li>
									<li class="flex items-start space-x-2">
										<span class="text-slate-400">•</span>
										<span>Identifies what hidden characters were present</span>
									</li>
									<li class="flex items-start space-x-2">
										<span class="text-slate-400">•</span>
										<span>Maintains original formatting while cleaning markers</span>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>
