<script lang="ts">
	import type { TextChange } from '$lib/utils/textCleaner.js';
	import { getCharacterName } from '$lib/utils/textCleaner.js';

	let { text, changes }: { text: string; changes: TextChange[] } = $props();

	interface TextSegment {
		text: string;
		isChange: boolean;
		change?: TextChange;
	}

	function createSegments(inputText: string, textChanges: TextChange[]): TextSegment[] {
		if (!textChanges.length) return [{ text: inputText, isChange: false }];

		const result: TextSegment[] = [];
		let lastIndex = 0;

		// Sort changes by start position
		const sortedChanges = [...textChanges].sort((a, b) => a.start - b.start);

		for (const change of sortedChanges) {
			// Add text before this change
			if (change.start > lastIndex) {
				result.push({
					text: inputText.slice(lastIndex, change.start),
					isChange: false
				});
			}

			// Add the changed text (original text that was replaced)
			result.push({
				text: change.original,
				isChange: true,
				change
			});

			lastIndex = change.end;
		}

		// Add remaining text after last change
		if (lastIndex < inputText.length) {
			result.push({
				text: inputText.slice(lastIndex),
				isChange: false
			});
		}

		return result;
	}

	let segments = $derived(createSegments(text, changes));
</script>

<div class="font-mono text-sm leading-relaxed whitespace-pre-wrap">
	{#each segments as segment}
		{#if segment.isChange && segment.change}
			<span
				class="group relative inline-block {segment.change.type === 'whitespace'
					? 'border border-red-300 bg-red-100'
					: 'border border-yellow-300 bg-yellow-100'} mx-0.5 cursor-help rounded px-1"
				title="Replaced: {getCharacterName(segment.change.original)} → {segment.change.replacement}"
			>
				{#if segment.change.type === 'whitespace'}
					<!-- Show a visible representation of whitespace characters -->
					<span class="text-xs font-bold text-red-600">
						{segment.change.original === '\u200B' ||
						segment.change.original === '\u200C' ||
						segment.change.original === '\u200D' ||
						segment.change.original === '\uFEFF'
							? '∅'
							: '·'}
					</span>
				{:else}
					<span class="text-yellow-700 line-through">{segment.text}</span>
				{/if}
				<!-- Tooltip showing what was replaced -->
				<span
					class="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 transform rounded bg-gray-800 px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100"
				>
					{getCharacterName(segment.change.original)} → "{segment.change.replacement}"
				</span>
			</span>
		{:else}
			{segment.text}
		{/if}
	{/each}
</div>

<style>
	/* Add hover effect for tooltips */
	:global(.group:hover .tooltip) {
		opacity: 1;
	}
</style>
