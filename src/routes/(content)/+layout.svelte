<script lang="ts">
	let { children } = $props();
</script>

<div class="relative min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black">
	<div class="absolute inset-0 overflow-hidden">
		<div
			class="absolute -top-1/2 -right-1/2 h-full w-full rounded-full bg-gradient-to-bl from-indigo-500/10 via-transparent to-transparent blur-3xl"
		></div>
		<div
			class="absolute -bottom-1/2 -left-1/2 h-full w-full rounded-full bg-gradient-to-tr from-violet-500/10 via-transparent to-transparent blur-3xl"
		></div>
	</div>

	<div class="relative z-10">
		<div class="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
			<nav class="mb-10">
				<a
					href="/"
					class="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-indigo-300"
				>
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10 19l-7-7m0 0l7-7m-7 7h18"
						/>
					</svg>
					Back to Copy Cleanse
				</a>
			</nav>

			<article
				class="prose prose-invert animate-fade-in prose-headings:text-white prose-h1:mb-2 prose-h1:bg-gradient-to-r prose-h1:from-indigo-400 prose-h1:to-violet-400 prose-h1:bg-clip-text prose-h1:text-transparent prose-a:text-indigo-300 hover:prose-a:text-indigo-200 prose-code:text-indigo-200 prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none max-w-none"
			>
				{@render children()}
			</article>

			<div class="mt-16 border-t border-white/5 pt-8 text-center text-xs text-slate-500">
				<a href="/" class="transition-colors hover:text-indigo-300">Home</a>
				<span class="mx-2">·</span>
				<a href="/about" class="transition-colors hover:text-indigo-300">About</a>
				<span class="mx-2">·</span>
				<a href="/privacy" class="transition-colors hover:text-indigo-300">Privacy</a>
				<span class="mx-2">·</span>
				<a href="/terms" class="transition-colors hover:text-indigo-300">Terms</a>
				<span class="mx-2">·</span>
				<a href="/contact" class="transition-colors hover:text-indigo-300">Contact</a>
			</div>
		</div>
	</div>
</div>
