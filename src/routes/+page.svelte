<script lang="ts">
	import { cleanText, type CleaningResult } from '$lib/utils/textCleaner.js';
	import HighlightedText from '$lib/components/HighlightedText.svelte';

	let inputText = $state('');
	let cleaningResult = $state<CleaningResult | null>(null);
	let showInfo = $state(true);

	let copySuccess = $state(false);
	let showDiff = $state(false);
	let inputMinimized = $state(false);

	function handleClean(autoCopy = false) {
		if (!inputText.trim()) return;

		// Small delay to show processing state
		setTimeout(() => {
			cleaningResult = cleanText(inputText);
			if (autoCopy) {
				copyCleanText();
				// Minimize input after auto-clean (on paste)
				inputMinimized = true;
			}
		}, 100);
	}

	async function copyCleanText() {
		if (!cleaningResult) return;

		try {
			await navigator.clipboard.writeText(cleaningResult.cleaned);
			copySuccess = true;
			// No timeout - success message stays until user resets
		} catch (err) {
			console.error('Failed to copy text:', err);
		}
	}

	function reset() {
		inputText = '';
		cleaningResult = null;
		copySuccess = false;
		inputMinimized = false;
		showDiff = false;
	}

	function handlePaste(event: ClipboardEvent) {
		const pasted = event.clipboardData?.getData('text');
		if (!pasted) return;
		event.preventDefault();
		inputText = pasted;
		handleClean(true); // Auto-copy and minimize on paste
		showDiff = false;
	}

	function expandInput() {
		inputMinimized = false;
	}

	let changeCount = $derived(cleaningResult?.changes.length ?? 0);
	let hasChanges = $derived(changeCount > 0);
</script>

<svelte:head>
	<title>AI Text Cleaner - Remove Hidden Markers from Generated Text</title>
	<meta
		name="description"
		content="Clean AI-generated text by removing hidden whitespace markers and formatting inconsistencies that identify generated content."
	/>
</svelte:head>

<svelte:window onpaste={handlePaste} />

<div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
	<!-- Navigation/Header Bar -->
	<nav class="border-b border-white/20 bg-white/70 backdrop-blur-sm">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="flex h-16 items-center justify-between">
				<div class="flex items-center space-x-3">
					<div
						class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600"
					>
						<svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</div>
					<span class="text-lg font-semibold text-gray-900">AI Text Cleaner</span>
				</div>
				<div class="hidden items-center space-x-4 text-sm text-gray-600 sm:flex">
					<span class="flex items-center space-x-1">
						<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M13 10V3L4 14h7v7l9-11h-7z"
							/>
						</svg>
						<span>Fast & Secure</span>
					</span>
					<span class="flex items-center space-x-1">
						<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
							/>
						</svg>
						<span>Privacy First</span>
					</span>
				</div>
			</div>
		</div>
	</nav>

	<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
		<!-- Hero Section - Compact -->
		<div class="text-center">
			<div class="mx-auto max-w-3xl">
				<h1
					class="bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl"
				>
					AI Text Cleaner
				</h1>
				<p class="mt-4 text-lg leading-7 text-gray-600">
					Remove hidden markers and formatting inconsistencies from AI-generated text
				</p>
			</div>
		</div>

		<!-- Main Interface - Prioritized -->
		<div class="mt-12 space-y-6">
			<!-- Input Section -->
			<div class="space-y-6">
				{#if inputMinimized && cleaningResult}
					<!-- Minimized Input State -->
					<div
						class="overflow-hidden rounded-xl border border-white/20 bg-white/80 shadow-xl backdrop-blur-sm"
					>
						<div class="px-6 py-4">
							<div class="flex items-center justify-between">
								<div class="flex items-center space-x-3">
									<div
										class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-green-100 to-emerald-100"
									>
										<svg
											class="h-4 w-4 text-green-600"
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
									<div>
										<h3 class="text-lg font-semibold text-gray-900">Text Processed</h3>
										<p class="text-sm text-gray-600">
											{inputText.length} characters • {changeCount}
											{changeCount === 1 ? 'issue' : 'issues'} found
										</p>
									</div>
								</div>
								<div class="flex justify-end gap-2">
									<button
										onclick={expandInput}
										class="inline-flex flex-1 items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:outline-none sm:flex-initial"
									>
										<svg class="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
											/>
										</svg>
										Edit
									</button>
									<button
										onclick={reset}
										class="inline-flex flex-1 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:outline-none sm:flex-initial"
									>
										<svg class="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M12 4v16m8-8H4"
											/>
										</svg>
										New
									</button>
								</div>
							</div>
						</div>
					</div>

					<!-- Visual Comparison View (Mobile-friendly) -->
					{#if showDiff}
						<div
							class="overflow-hidden rounded-xl border border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50 shadow-xl backdrop-blur-sm"
						>
							<div class="border-b border-amber-200 px-6 py-4">
								<div class="flex items-center justify-between">
									<div class="flex items-center space-x-3">
										<div
											class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-100 to-yellow-100"
										>
											<svg
												class="h-4 w-4 text-amber-600"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
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
										</div>
										<div>
											{#if hasChanges}
												<h3 class="text-lg font-semibold text-amber-900">Changes Found</h3>
												<p class="text-sm text-amber-700">
													Original text with {changeCount} highlighted {changeCount === 1
														? 'issue'
														: 'issues'}
												</p>
											{:else}
												<h3 class="text-lg font-semibold text-amber-900">Original Text</h3>
												<p class="text-sm text-amber-700">
													No changes needed - text was already clean
												</p>
											{/if}
										</div>
									</div>
									<button
										onclick={() => (showDiff = false)}
										aria-label="Close comparison view"
										class="inline-flex items-center rounded-lg border border-amber-300 bg-white px-3 py-2 text-sm font-medium text-amber-700 shadow-sm transition-all duration-200 hover:bg-amber-50 focus:ring-2 focus:ring-amber-600 focus:ring-offset-2 focus:outline-none"
									>
										<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</button>
								</div>
							</div>
							<div class="p-6">
								<!-- Legend -->
								<div class="mb-4 flex flex-wrap items-center gap-4 text-xs">
									<div class="flex items-center space-x-1">
										<div class="h-3 w-3 rounded-full border border-red-300 bg-red-100"></div>
										<span class="text-gray-600">Hidden characters</span>
									</div>
									<div class="flex items-center space-x-1">
										<div class="h-3 w-3 rounded-full border border-yellow-300 bg-yellow-100"></div>
										<span class="text-gray-600">Smart quotes</span>
									</div>
									<div class="flex items-center space-x-1">
										<div class="h-3 w-3 rounded-full border border-blue-300 bg-blue-100"></div>
										<span class="text-gray-600">Dashes & other marks</span>
									</div>
									<div class="flex items-center space-x-1">
										<div class="h-3 w-3 rounded-full border border-purple-300 bg-purple-100"></div>
										<span class="text-gray-600">AI tracking URLs</span>
									</div>
								</div>
								<div
									class="rounded-lg border border-amber-200 bg-white"
									style="max-height: 40vh; overflow-y: auto;"
								>
									<div class="p-4">
										{#if hasChanges}
											<HighlightedText
												text={cleaningResult.original}
												changes={cleaningResult.changes}
											/>
										{:else}
											<div class="font-mono text-sm whitespace-pre-wrap text-gray-900">
												{cleaningResult.original}
											</div>
										{/if}
									</div>
								</div>
							</div>
						</div>
					{/if}
				{:else}
					<!-- Full Input State -->
					<div
						class="overflow-hidden rounded-xl border border-white/20 bg-white/80 shadow-xl backdrop-blur-sm"
					>
						<div class="border-b border-gray-100 px-6 py-4">
							<div class="flex items-center space-x-3">
								<div
									class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100"
								>
									<svg
										class="h-4 w-4 text-blue-600"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
										/>
									</svg>
								</div>
								<h2 class="text-lg font-semibold text-gray-900">Input Text</h2>
							</div>
						</div>

						<div class="p-6">
							<div class="relative">
								<textarea
									id="input-text"
									bind:value={inputText}
									placeholder="Paste your AI generated text here...

✨ Auto-processing: Text is automatically cleaned when you paste
📋 Auto-copy: Clean results are instantly copied to your clipboard
🔍 Detects and removes:
• Hidden whitespace & zero-width characters (invisible markers)
• Smart quotes → regular quotes
• Em dashes (—) & en dashes (–) → regular dashes (-)
• Unicode ellipsis (…) → regular dots (...)
• Soft hyphens (invisible line-break hints)
• Fullwidth characters → regular characters
• AI tracking URL parameters (?source=chatgpt, ?utm_source=openai, etc.)
• All suspicious formatting used for AI detection

Just paste your text and you're done!"
									class="block h-[21.5rem] w-full resize-none rounded-lg border-0 bg-white/60 px-4 py-3 font-mono text-sm text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600 focus:ring-inset lg:h-[15.5rem]"
									style="max-height: 50vh; overflow-y: auto;"
								></textarea>
								{#if inputText.length > 0}
									<div class="absolute top-3 right-3">
										<div class="rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
											{inputText.length} chars
										</div>
									</div>
								{/if}
							</div>
						</div>
					</div>
				{/if}
			</div>

			<!-- Results Section -->
			{#if cleaningResult}
				<div class="space-y-6">
					<!-- Clipboard Success Banner -->
					{#if copySuccess}
						<div
							class="overflow-hidden rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 shadow-lg"
						>
							<div class="flex items-center justify-between px-6 py-4">
								<div class="flex items-center space-x-3">
									<div class="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
										<svg
											class="h-5 w-5 text-green-600"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M5 13l4 4L19 7"
											/>
										</svg>
									</div>
									<div>
										<h3 class="text-lg font-semibold text-green-800">
											✨ Clean text copied to clipboard!
										</h3>
										<p class="text-sm text-green-700">
											Ready to paste anywhere • {cleaningResult.cleaned.length} characters
										</p>
									</div>
								</div>
								<div class="hidden items-center space-x-2 sm:flex">
									<div class="flex items-center space-x-1 rounded-full bg-green-100 px-3 py-1">
										<svg
											class="h-4 w-4 text-green-600"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
											/>
										</svg>
										<span class="text-sm font-medium text-green-700">Copied</span>
									</div>
								</div>
							</div>
						</div>
					{/if}

					<div
						class="overflow-hidden rounded-xl border border-white/20 bg-white/80 shadow-xl backdrop-blur-sm"
					>
						<div class="border-b border-gray-100 px-6 py-4">
							<div class="flex items-center justify-between">
								<div class="flex items-center space-x-3">
									<div
										class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-green-100 to-emerald-100"
									>
										<svg
											class="h-4 w-4 text-green-600"
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
									<div>
										<h2 class="text-lg font-semibold text-gray-900">Cleaning Results</h2>
										{#if hasChanges}
											<p class="text-sm text-gray-600">
												{changeCount}
												{changeCount === 1 ? 'issue' : 'issues'} detected and cleaned
											</p>
										{:else}
											<p class="text-sm text-green-600">Text is already clean!</p>
										{/if}
									</div>
								</div>
								{#if hasChanges}
									<div class="hidden items-center space-x-4 text-xs sm:flex">
										<div class="flex items-center space-x-1">
											<div class="h-3 w-3 rounded-full border border-red-300 bg-red-100"></div>
											<span class="text-gray-600">Hidden characters</span>
										</div>
										<div class="flex items-center space-x-1">
											<div
												class="h-3 w-3 rounded-full border border-yellow-300 bg-yellow-100"
											></div>
											<span class="text-gray-600">Smart quotes</span>
										</div>
										<div class="flex items-center space-x-1">
											<div class="h-3 w-3 rounded-full border border-blue-300 bg-blue-100"></div>
											<span class="text-gray-600">Dashes & other marks</span>
										</div>
										<div class="flex items-center space-x-1">
											<div
												class="h-3 w-3 rounded-full border border-purple-300 bg-purple-100"
											></div>
											<span class="text-gray-600">AI tracking URLs</span>
										</div>
									</div>
								{/if}
							</div>
						</div>

						<div class="p-6">
							{#if showDiff}
								<div
									class="mb-6 overflow-hidden rounded-lg border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100"
								>
									<div class="border-b border-gray-200 px-4 py-3">
										<p class="text-sm font-medium text-gray-700">
											{#if hasChanges}
												Original text with highlighted changes:
											{:else}
												Original text (no changes needed):
											{/if}
										</p>
									</div>
									<div class="p-4" style="max-height: 40vh; overflow-y: auto;">
										{#if hasChanges}
											<HighlightedText
												text={cleaningResult.original}
												changes={cleaningResult.changes}
											/>
										{:else}
											<div class="font-mono text-sm whitespace-pre-wrap text-gray-900">
												{cleaningResult.original}
											</div>
										{/if}
									</div>
								</div>
							{/if}
							{#if !hasChanges}
								<div
									class="mb-6 rounded-lg border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-4"
								>
									<div class="flex items-center space-x-3">
										<div
											class="flex h-10 w-10 items-center justify-center rounded-full bg-green-100"
										>
											<svg class="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
												<path
													fill-rule="evenodd"
													d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
													clip-rule="evenodd"
												/>
											</svg>
										</div>
										<div>
											<p class="font-semibold text-green-800">No suspicious markers found!</p>
											<p class="mt-1 text-sm text-green-700">
												Your text appears to be clean already.
											</p>
										</div>
									</div>
								</div>
							{/if}

							<!-- Buttons Container - Side by side on desktop, stacked on mobile -->
							<div class="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
								<!-- Show/Hide Results Button -->
								<button
									onclick={() => (showDiff = !showDiff)}
									class="group flex w-full items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:outline-none"
								>
									<svg
										class="h-5 w-5 transition-transform duration-200 group-hover:scale-110"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
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
									<span>{showDiff ? 'Hide' : 'Show'} Results</span>
								</button>

								<!-- Copy Again Button -->
								<button
									onclick={copyCleanText}
									class="group flex w-full items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-3 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:from-green-700 hover:to-emerald-700 focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:outline-none"
								>
									<svg
										class="h-5 w-5 transition-transform duration-200 group-hover:scale-110"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
										/>
									</svg>
									<span>Copy Again</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			{:else}
				<div class="space-y-6">
					<div
						class="overflow-hidden rounded-xl border border-white/20 bg-white/80 shadow-xl backdrop-blur-sm"
					>
						<div class="p-8 text-center">
							<div
								class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-200"
							>
								<svg
									class="h-6 w-6 text-gray-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
									/>
								</svg>
							</div>
							<h3 class="text-lg font-semibold text-gray-900">Ready to analyze</h3>
							<p class="mt-2 text-sm text-gray-600">Results will appear here after processing</p>
						</div>
					</div>
				</div>
			{/if}
		</div>

		<!-- How it Works - Below the fold -->
		<div class="mt-16">
			<div class="mx-auto max-w-4xl">
				<div
					class="overflow-hidden rounded-xl border border-white/20 bg-white/80 shadow-xl backdrop-blur-sm"
				>
					<button
						onclick={() => (showInfo = !showInfo)}
						class="flex w-full items-center justify-between px-6 py-5 text-left transition-all duration-200 hover:bg-white/60"
					>
						<div class="flex items-center space-x-3">
							<div
								class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100"
							>
								<svg
									class="h-4 w-4 text-blue-600"
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
							<span class="text-lg font-semibold text-gray-900">How it works & Why it's useful</span
							>
						</div>
						<svg
							class="h-5 w-5 transform text-gray-500 transition-transform duration-200 {showInfo
								? 'rotate-180'
								: ''}"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M19 9l-7 7-7-7"
							/>
						</svg>
					</button>

					{#if showInfo}
						<div class="border-t border-gray-100 px-6 pt-4 pb-6">
							<div class="grid gap-8 md:grid-cols-2">
								<div class="space-y-4">
									<div class="flex items-start space-x-3">
										<div
											class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red-100"
										>
											<svg class="h-3 w-3 text-red-600" fill="currentColor" viewBox="0 0 20 20">
												<path
													fill-rule="evenodd"
													d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
													clip-rule="evenodd"
												/>
											</svg>
										</div>
										<div>
											<h3 class="font-semibold text-gray-900">What this tool detects</h3>
											<ul class="mt-2 space-y-2 text-sm text-gray-600">
												<li class="flex items-start space-x-2">
													<span class="text-gray-400">•</span>
													<span
														>Hidden whitespace characters (zero-width spaces, non-breaking spaces)</span
													>
												</li>
												<li class="flex items-start space-x-2">
													<span class="text-gray-400">•</span>
													<span>Smart quotes and curly apostrophes</span>
												</li>
												<li class="flex items-start space-x-2">
													<span class="text-gray-400">•</span>
													<span>Em dashes (—) and en dashes (–)</span>
												</li>
												<li class="flex items-start space-x-2">
													<span class="text-gray-400">•</span>
													<span>Unicode ellipsis (…) and soft hyphens</span>
												</li>
												<li class="flex items-start space-x-2">
													<span class="text-gray-400">•</span>
													<span>Fullwidth characters (Ａ１ → A1)</span>
												</li>
												<li class="flex items-start space-x-2">
													<span class="text-gray-400">•</span>
													<span
														>AI tracking URL parameters (?source=chatgpt, ?utm_source=openai)</span
													>
												</li>
												<li class="flex items-start space-x-2">
													<span class="text-gray-400">•</span>
													<span>All other suspicious Unicode markers</span>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<div class="space-y-4">
									<div class="flex items-start space-x-3">
										<div
											class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-100"
										>
											<svg class="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
												<path
													fill-rule="evenodd"
													d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
													clip-rule="evenodd"
												/>
											</svg>
										</div>
										<div>
											<h3 class="font-semibold text-gray-900">Why it's useful</h3>
											<ul class="mt-2 space-y-2 text-sm text-gray-600">
												<li class="flex items-start space-x-2">
													<span class="text-gray-400">•</span>
													<span>Removes AI detection markers from ChatGPT and other tools</span>
												</li>
												<li class="flex items-start space-x-2">
													<span class="text-gray-400">•</span>
													<span>Ensures clean text for publishing or submission</span>
												</li>
												<li class="flex items-start space-x-2">
													<span class="text-gray-400">•</span>
													<span>Identifies what hidden characters were present</span>
												</li>
												<li class="flex items-start space-x-2">
													<span class="text-gray-400">•</span>
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
		</div>

		<!-- Features Section -->
		<div class="mt-24">
			<div class="mx-auto max-w-4xl text-center">
				<h2 class="text-3xl font-bold tracking-tight text-gray-900">
					Why choose our AI Text Cleaner?
				</h2>
				<p class="mt-4 text-lg text-gray-600">
					Professional-grade text cleaning with privacy and precision in mind
				</p>
			</div>

			<div class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
				<div
					class="group relative overflow-hidden rounded-xl border border-white/20 bg-white/80 p-6 shadow-xl backdrop-blur-sm transition-all duration-200 hover:bg-white/90"
				>
					<div
						class="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100"
					>
						<svg
							class="h-5 w-5 text-blue-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M13 10V3L4 14h7v7l9-11h-7z"
							/>
						</svg>
					</div>
					<h3 class="mt-4 text-lg font-semibold text-gray-900">Lightning Fast</h3>
					<p class="mt-2 text-sm text-gray-600">
						Instant processing with real-time feedback. No waiting, no delays - just immediate
						results.
					</p>
				</div>

				<div
					class="group relative overflow-hidden rounded-xl border border-white/20 bg-white/80 p-6 shadow-xl backdrop-blur-sm transition-all duration-200 hover:bg-white/90"
				>
					<div
						class="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-100 to-emerald-100"
					>
						<svg
							class="h-5 w-5 text-green-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
							/>
						</svg>
					</div>
					<h3 class="mt-4 text-lg font-semibold text-gray-900">100% Private</h3>
					<p class="mt-2 text-sm text-gray-600">
						All processing happens in your browser. Your text never leaves your device or touches
						our servers.
					</p>
				</div>

				<div
					class="group relative overflow-hidden rounded-xl border border-white/20 bg-white/80 p-6 shadow-xl backdrop-blur-sm transition-all duration-200 hover:bg-white/90"
				>
					<div
						class="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-100 to-pink-100"
					>
						<svg
							class="h-5 w-5 text-purple-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
							/>
						</svg>
					</div>
					<h3 class="mt-4 text-lg font-semibold text-gray-900">Precision Detection</h3>
					<p class="mt-2 text-sm text-gray-600">
						Advanced algorithms detect even the most subtle hidden markers and formatting
						inconsistencies.
					</p>
				</div>
			</div>
		</div>

		<!-- Footer -->
		<footer class="mt-24 border-t border-white/20 pt-12 text-center">
			<div class="mx-auto max-w-3xl">
				<p class="text-sm text-gray-500">
					Built to help identify and remove AI-generated text markers • <a
						href="https://github.com/rogadev/clean.roga.dev"
						target="_blank"
						rel="noopener noreferrer"
						class="transition-colors duration-200 hover:text-blue-600">Open source</a
					> • Made with ❤️ for content creators
				</p>
				<div class="mt-4 flex justify-center space-x-6 text-sm text-gray-400">
					<span class="flex items-center space-x-1">
						<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
							<path
								fill-rule="evenodd"
								d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
								clip-rule="evenodd"
							/>
						</svg>
						<span>No tracking</span>
					</span>
					<span class="flex items-center space-x-1">
						<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
							<path
								fill-rule="evenodd"
								d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
								clip-rule="evenodd"
							/>
						</svg>
						<span>No downloads required</span>
					</span>
					<a
						href="https://github.com/rogadev/clean.roga.dev"
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center space-x-1 transition-colors duration-200 hover:text-blue-400"
					>
						<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
							<path
								fill-rule="evenodd"
								d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
								clip-rule="evenodd"
							/>
						</svg>
						<span>Open source</span>
					</a>
				</div>
			</div>
		</footer>
	</div>
</div>
