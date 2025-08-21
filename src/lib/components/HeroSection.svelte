<script lang="ts">
	// Hero section component - clean and focused
	let { headerMinimal = false }: { headerMinimal?: boolean } = $props();
</script>

{#if headerMinimal}
	<!-- Minimal Header - Just the brand name -->
	<div class="relative mb-4 text-center">
		<h1
			class="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-xl font-bold tracking-tight text-transparent sm:text-2xl"
		>
			Copy Cleanse
		</h1>
	</div>
{:else}
	<!-- Compact Hero Section -->
	<div class="relative text-center">
		<div class="mx-auto max-w-4xl">
			<!-- Badge with branding -->
			<div class="mb-4">
				<div
					class="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60"
				>
					<div class="relative mr-2 flex h-4 w-4 items-center justify-center">
						<div
							class="absolute h-full w-full animate-ping rounded-full bg-indigo-400 opacity-30"
						></div>
						<svg
							class="relative h-3 w-3 text-indigo-300"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</div>
					<span>Professional Text Cleaning Tool</span>
				</div>
			</div>

			<!-- Main heading - more compact -->
			<h1
				class="mb-3 bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl"
			>
				Copy Cleanse
			</h1>

			<!-- Subtitle -->
			<p class="mx-auto mb-6 max-w-prose leading-relaxed text-balance text-slate-300">
				Remove hidden markers and formatting inconsistencies from AI-generated text with
				professional precision
			</p>

			<!-- Feature badges -->
			<div class="mb-6 flex flex-wrap justify-center gap-4">
				<div
					class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
				>
					<div class="h-2 w-2 rounded-full bg-emerald-400"></div>
					<span>100% Private</span>
				</div>
				<div
					class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
				>
					<div class="h-2 w-2 rounded-full bg-indigo-400"></div>
					<span>Instant Results</span>
				</div>
				<div
					class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
				>
					<div class="h-2 w-2 rounded-full bg-violet-400"></div>
					<span>AI Detection Proof</span>
				</div>
			</div>
		</div>
	</div>
{/if}
