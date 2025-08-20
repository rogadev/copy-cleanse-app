<script lang="ts">
	import HighlightedText from '$lib/components/HighlightedText.svelte';
	import { onMount } from 'svelte';
	import { FEEDBACK_STYLES } from '$lib/types/feedback.js';
	import { CARD_CLASSES, BUTTON_STYLES } from '$lib/constants/ui.js';
	import { createTextCleaner } from '$lib/utils/useTextCleaner.js';

	// Initialize the text cleaner hook
	const { state, actions } = createTextCleaner();

	// Computed values - access state directly for reactivity
	let changeCount = $derived(state.cleaningResult?.changes.length ?? 0);
	let hasChanges = $derived(changeCount > 0);

	// Computed classes for feedback styling
	const feedbackClasses = $derived(() => {
		if (!state.touchFeedback) return '';
		const baseClasses = 'overflow-hidden rounded-lg border shadow-lg backdrop-blur-sm';
		const styles = FEEDBACK_STYLES[state.touchFeedback.type];
		return `${baseClasses} ${styles.container}`;
	});

	const feedbackIconClasses = $derived(() => {
		if (!state.touchFeedback) return '';
		const styles = FEEDBACK_STYLES[state.touchFeedback.type];
		return `flex h-8 w-8 items-center justify-center rounded-full ${styles.icon}`;
	});

	const feedbackTextClasses = $derived(() => {
		if (!state.touchFeedback) return '';
		const styles = FEEDBACK_STYLES[state.touchFeedback.type];
		return `ml-3 text-sm font-medium ${styles.text}`;
	});

	const feedbackButtonClasses = $derived(() => {
		if (!state.touchFeedback) return '';
		const styles = FEEDBACK_STYLES[state.touchFeedback.type];
		return `ml-auto flex h-6 w-6 items-center justify-center rounded-full ${styles.button}`;
	});

	// Cleanup on component destroy
	onMount(() => {
		return () => {
			actions.cleanup();
		};
	});

	// Event handlers
	function handleInputChange(event: Event) {
		const target = event.target as HTMLTextAreaElement;
		actions.setInputText(target.value);
	}

	function handleMobileClean() {
		actions.handleClean(true);
		actions.setShowDiff(false);
	}

	function handleMobileCopy() {
		actions.handleCopy();
	}

	function handleReset() {
		actions.handleReset();
		actions.setShowDiff(false);
	}

	function handleExpandInput() {
		actions.handleExpandInput();
	}

	function toggleDiff() {
		actions.setShowDiff(!state.showDiff);
	}
</script>

<svelte:head>
	<title>Copy Cleanse - Remove Hidden Markers from Generated Text</title>
	<meta
		name="description"
		content="Clean AI-generated text by removing hidden whitespace markers and formatting inconsistencies that identify generated content."
	/>
</svelte:head>

<svelte:window onpaste={actions.handlePaste} />

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
					<span class="text-lg font-semibold text-gray-900">Copy Cleanse</span>
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
		<!-- Hero Section -->
		<div class="text-center">
			<div class="mx-auto max-w-3xl">
				<h1
					class="bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl"
				>
					Copy Cleanse
				</h1>
				<p class="mt-4 text-lg leading-7 text-gray-600">
					Remove hidden markers and formatting inconsistencies from AI-generated text
				</p>
			</div>
		</div>

		<!-- Main Interface -->
		<div class="mt-12 space-y-6">
			<!-- Mobile Touch Feedback -->
			{#if state.isMobile && state.touchFeedback}
				<div
					class="fixed top-20 right-4 left-4 z-50 sm:right-auto sm:left-1/2 sm:w-96 sm:-translate-x-1/2"
				>
					<div class={feedbackClasses}>
						<div class="flex items-center px-4 py-3">
							<div class={feedbackIconClasses}>
								{#if state.touchFeedback.type === 'success'}
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
											d="M5 13l4 4L19 7"
										/>
									</svg>
								{:else if state.touchFeedback.type === 'error'}
									<svg
										class="h-4 w-4 text-red-600"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								{:else if state.touchFeedback.type === 'processing'}
									<svg
										class="h-4 w-4 animate-spin text-blue-600"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
										/>
									</svg>
								{/if}
							</div>
							<p class={feedbackTextClasses}>
								{state.touchFeedback.message}
							</p>
							{#if state.touchFeedback.type !== 'processing'}
								<button
									onclick={actions.clearFeedback}
									aria-label="Dismiss notification"
									class={feedbackButtonClasses}
								>
									<svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>
							{/if}
						</div>
					</div>
				</div>
			{/if}

			<!-- Input Section -->
			<div class="space-y-6">
				{#if state.inputMinimized && state.cleaningResult}
					<!-- Minimized Input State -->
					<div class={CARD_CLASSES}>
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
											{state.inputText.length} characters • {changeCount}
											{changeCount === 1 ? 'issue' : 'issues'} found
										</p>
									</div>
								</div>
								<div class="flex justify-end gap-2">
									<button onclick={handleExpandInput} class={BUTTON_STYLES.mobileSecondary}>
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
									<button onclick={handleReset} class={BUTTON_STYLES.desktopPrimary}>
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

					<!-- Visual Comparison View -->
					{#if state.showDiff}
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
										onclick={toggleDiff}
										aria-label="Close comparison view"
										class={BUTTON_STYLES.mobileSecondary}
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
								<div class="rounded-lg border border-amber-200 bg-white p-4">
									{#if hasChanges}
										<HighlightedText
											text={state.cleaningResult.original}
											changes={state.cleaningResult.changes}
										/>
									{:else}
										<div class="font-mono text-sm whitespace-pre-wrap text-gray-900">
											{state.cleaningResult.original}
										</div>
									{/if}
								</div>
							</div>
						</div>
					{/if}
				{:else}
					<!-- Full Input State -->
					<div class={CARD_CLASSES}>
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
									value={state.inputText}
									oninput={handleInputChange}
									ontouchstart={actions.handleTouchStart}
									ontouchend={actions.handleTouchEnd}
									ontouchcancel={actions.handleTouchCancel}
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
								></textarea>
								{#if state.inputText.length > 0}
									<div class="absolute top-3 right-3">
										<div class="rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
											{state.inputText.length} chars
										</div>
									</div>
								{/if}
							</div>

							<!-- Mobile Clean Button -->
							{#if state.isMobile}
								<div class="mt-4 flex flex-col space-y-3">
									<button
										onclick={handleMobileClean}
										disabled={!state.inputText.trim() || state.touchFeedback?.type === 'processing'}
										class={BUTTON_STYLES.mobilePrimary}
									>
										{#if state.touchFeedback?.type === 'processing'}
											<svg
												class="h-5 w-5 animate-spin"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
												/>
											</svg>
											<span>Processing...</span>
										{:else}
											<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
												/>
											</svg>
											<span>Clean Text</span>
										{/if}
									</button>

									{#if !state.inputText.trim()}
										<p class="text-center text-sm text-gray-500">
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
			{#if state.cleaningResult}
				<div class="space-y-6">
					<!-- Success Banner -->
					{#if state.copySuccess}
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
											Ready to paste anywhere • {state.cleaningResult.cleaned.length} characters
										</p>
									</div>
								</div>
								{#if state.isMobile}
									<button onclick={handleMobileCopy} class={BUTTON_STYLES.mobileSecondary}>
										<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
											/>
										</svg>
										<span>Copy Again</span>
									</button>
								{/if}
							</div>
						</div>
					{/if}

					<!-- Results Display -->
					<div class={CARD_CLASSES}>
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
										<h3 class="text-lg font-semibold text-gray-900">Clean Text</h3>
										<p class="text-sm text-gray-600">
											{state.cleaningResult.cleaned.length} characters • {changeCount}
											{changeCount === 1 ? 'change' : 'changes'} made
										</p>
									</div>
								</div>
								<div class="flex gap-2">
									{#if hasChanges}
										<button
											onclick={toggleDiff}
											aria-label="Toggle changes view"
											class={BUTTON_STYLES.mobileSecondary}
										>
											<svg
												class="mr-1 h-4 w-4"
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
											</svg>
											{state.showDiff ? 'Hide' : 'Show'} Changes
										</button>
									{/if}
									<button onclick={handleMobileCopy} class={BUTTON_STYLES.desktopSecondary}>
										<svg class="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
											/>
										</svg>
										Copy
									</button>
								</div>
							</div>
						</div>

						<div class="p-6">
							<div class="rounded-lg border border-gray-200 bg-gray-50 p-4">
								<div class="font-mono text-sm whitespace-pre-wrap text-gray-900">
									{state.cleaningResult.cleaned}
								</div>
							</div>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
