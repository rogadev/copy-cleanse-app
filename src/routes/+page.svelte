<script lang="ts">
	import { cleanText, type CleaningResult } from '$lib/utils/textCleaner.js';
	import HighlightedText from '$lib/components/HighlightedText.svelte';

	let inputText = $state('');
	let cleaningResult = $state<CleaningResult | null>(null);
	let showInfo = $state(true);
	let isProcessing = $state(false);
	let copySuccess = $state(false);

	function handleClean() {
		if (!inputText.trim()) return;

		isProcessing = true;
		// Small delay to show processing state
		setTimeout(() => {
			cleaningResult = cleanText(inputText);
			isProcessing = false;
		}, 100);
	}

	async function copyCleanText() {
		if (!cleaningResult) return;

		try {
			await navigator.clipboard.writeText(cleaningResult.cleaned);
			copySuccess = true;
			setTimeout(() => {
				copySuccess = false;
			}, 2000);
		} catch (err) {
			console.error('Failed to copy text:', err);
		}
	}

	function reset() {
		inputText = '';
		cleaningResult = null;
		copySuccess = false;
	}

	let changeCount = $derived(() => cleaningResult?.changes.length ?? 0);
	let hasChanges = $derived(() => changeCount > 0);
</script>

<svelte:head>
	<title>AI Text Cleaner - Remove Hidden Markers from Generated Text</title>
	<meta
		name="description"
		content="Clean AI-generated text by removing hidden whitespace markers and formatting inconsistencies that identify generated content."
	/>
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<div class="mx-auto max-w-6xl px-4 py-8">
		<!-- Header -->
		<div class="mb-8 text-center">
			<h1 class="mb-4 text-4xl font-bold text-gray-900">AI Text Cleaner</h1>
			<p class="mb-6 text-xl text-gray-600">
				Remove hidden markers and formatting inconsistencies from AI-generated text
			</p>

			<!-- Collapsible Info Section -->
			<div class="mb-8 rounded-lg border border-gray-200 bg-white shadow-sm">
				<button
					onclick={() => (showInfo = !showInfo)}
					class="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-gray-50"
				>
					<span class="font-medium text-gray-700">How it works & Why it's useful</span>
					<svg
						class="h-5 w-5 transform text-gray-500 transition-transform {showInfo
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
					<div class="space-y-4 px-6 pb-6 text-gray-600">
						<div class="grid gap-6 md:grid-cols-2">
							<div>
								<h3 class="mb-2 font-semibold text-gray-800">What this tool detects:</h3>
								<ul class="space-y-1 text-sm">
									<li>
										• Hidden whitespace characters (zero-width spaces, non-breaking spaces, etc.)
									</li>
									<li>• Em dashes (—) replaced with regular dashes ( - )</li>
									<li>• Various Unicode spacing characters used as markers</li>
									<li>• Invisible formatting inconsistencies</li>
								</ul>
							</div>
							<div>
								<h3 class="mb-2 font-semibold text-gray-800">Why it's useful:</h3>
								<ul class="space-y-1 text-sm">
									<li>• Removes AI detection markers from ChatGPT and other tools</li>
									<li>• Ensures clean text for publishing or submission</li>
									<li>• Identifies what hidden characters were present</li>
									<li>• Maintains original formatting while cleaning markers</li>
								</ul>
							</div>
						</div>
					</div>
				{/if}
			</div>
		</div>

		<!-- Main Interface -->
		<div class="grid gap-8 lg:grid-cols-2">
			<!-- Input Section -->
			<div class="space-y-4">
				<div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
					<label for="input-text" class="mb-3 block text-sm font-medium text-gray-700">
						Paste your text here:
					</label>
					<textarea
						id="input-text"
						bind:value={inputText}
						placeholder="Paste the AI-generated text that you want to clean..."
						class="h-64 w-full resize-none rounded-lg border border-gray-300 p-4 font-mono text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
						style="max-height: 50vh; overflow-y: auto;"
					></textarea>

					<div class="mt-4 flex items-center justify-between">
						<span class="text-sm text-gray-500">
							{inputText.length} characters
						</span>
						<div class="flex gap-3">
							<button
								onclick={reset}
								disabled={!inputText && !cleaningResult}
								class="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
							>
								Reset
							</button>
							<button
								onclick={handleClean}
								disabled={!inputText.trim() || isProcessing}
								class="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
							>
								{#if isProcessing}
									<svg class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
										<circle
											class="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											stroke-width="4"
										></circle>
										<path
											class="opacity-75"
											fill="currentColor"
											d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										></path>
									</svg>
									Processing...
								{:else}
									Clean Text
								{/if}
							</button>
						</div>
					</div>
				</div>
			</div>

			<!-- Results Section -->
			<div class="space-y-4">
				{#if cleaningResult}
					<div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
						<div class="mb-4 flex items-center justify-between">
							<h3 class="text-lg font-medium text-gray-900">
								Cleaning Results
								{#if hasChanges}
									<span class="text-sm font-normal text-gray-600">
										({changeCount}
										{changeCount === 1 ? 'change' : 'changes'} found)
									</span>
								{/if}
							</h3>
							{#if hasChanges}
								<div class="flex items-center gap-4 text-xs">
									<div class="flex items-center gap-1">
										<div class="h-3 w-3 rounded border border-red-300 bg-red-100"></div>
										<span>Hidden whitespace</span>
									</div>
									<div class="flex items-center gap-1">
										<div class="h-3 w-3 rounded border border-yellow-300 bg-yellow-100"></div>
										<span>Em dashes</span>
									</div>
								</div>
							{/if}
						</div>

						{#if hasChanges}
							<div
								class="mb-4 rounded-lg border bg-gray-50 p-4"
								style="max-height: 50vh; overflow-y: auto;"
							>
								<p class="mb-2 text-sm text-gray-600">Original text with highlighted changes:</p>
								<HighlightedText text={cleaningResult.original} changes={cleaningResult.changes} />
							</div>
						{:else}
							<div class="mb-4 rounded-lg border border-green-200 bg-green-50 p-4">
								<p class="font-medium text-green-800">✓ No suspicious markers found!</p>
								<p class="mt-1 text-sm text-green-600">Your text appears to be clean already.</p>
							</div>
						{/if}

						<button
							onclick={copyCleanText}
							class="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-3 font-medium text-white transition-colors hover:bg-green-700"
						>
							{#if copySuccess}
								<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M5 13l4 4L19 7"
									></path>
								</svg>
								Copied to Clipboard!
							{:else}
								<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
									></path>
								</svg>
								Copy Clean Text
							{/if}
						</button>
					</div>
				{:else}
					<div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
						<div class="text-center text-gray-500">
							<svg
								class="mx-auto mb-4 h-12 w-12 text-gray-300"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
								></path>
							</svg>
							<p class="text-lg font-medium">Ready to clean</p>
							<p class="mt-1 text-sm">Paste your text and click "Clean Text" to see the results</p>
						</div>
					</div>
				{/if}
			</div>
		</div>

		<!-- Footer -->
		<footer class="mt-16 border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
			<p>Built to help identify and remove AI-generated text markers • Open source</p>
		</footer>
	</div>
</div>
