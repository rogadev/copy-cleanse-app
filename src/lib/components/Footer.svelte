<script lang="ts">
	// Footer component with enhanced design and animations
</script>

<!-- Footer - Enhanced -->
<footer class="animate-fade-in relative mt-32">
	<!-- Border separator -->
	<div class="border-t border-white/5"></div>
	<!-- Background decoration -->
	<div
		class="absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent"
	></div>

	<div class="relative pt-16 pb-12 text-center">
		<div class="mx-auto max-w-4xl">
			<!-- Footer logo and description -->
			<div class="mb-8">
				<div
					class="animate-float mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-400/30"
				>
					<svg
						class="h-8 w-8 text-indigo-300"
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
				<h3
					class="mb-2 bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-2xl font-bold text-transparent"
				>
					Copy Cleanse
				</h3>
				<p class="text-slate-400">Professional text cleaning for the modern web</p>
			</div>

			<!-- Key features -->
			<div class="mb-8 flex flex-wrap justify-center gap-4">
				<div
					class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
				>
					<div class="h-2 w-2 rounded-full bg-emerald-400"></div>
					<span>No tracking</span>
				</div>
				<div
					class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
				>
					<div class="h-2 w-2 rounded-full bg-indigo-400"></div>
					<span>No downloads</span>
				</div>
				<a
					href="https://github.com/rogadev/copy-cleanse"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300 transition-colors hover:bg-white/10"
				>
					<div class="h-2 w-2 rounded-full bg-violet-400"></div>
					<span>Open source</span>
				</a>
			</div>

			<div class="text-sm text-slate-400">
				<p class="mb-2">Built to help identify and remove AI-generated text markers</p>
				<p>Made with ❤️ for content creators • &copy; 2025 Ryan Roga</p>
			</div>
		</div>
	</div>
</footer>
