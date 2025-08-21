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

	function getChangeClasses(changeType: string): string {
		switch (changeType) {
			case 'smart-quotes':
				return 'ai-smart-quote bg-yellow-500/20 text-yellow-300 px-0.5 rounded border border-yellow-500/30';
			case 'em-dash':
			case 'en-dash':
				return 'ai-em-dash bg-red-500/20 text-red-300 px-0.5 rounded border border-red-500/30';
			case 'soft-hyphen':
			case 'whitespace':
				return 'ai-soft-hyphen bg-purple-500/20 text-purple-300 px-0.5 rounded border border-purple-500/30';
			case 'ellipsis':
				return 'ai-ellipsis bg-blue-500/20 text-blue-300 px-0.5 rounded border border-blue-500/30';
			case 'url-params':
				return 'ai-tracking-param bg-orange-500/20 text-orange-300 px-1 rounded border border-orange-500/30';
			case 'fullwidth':
				return 'ai-fullwidth bg-cyan-500/20 text-cyan-300 px-0.5 rounded border border-cyan-500/30';
			default:
				return 'ai-other bg-purple-500/20 text-purple-300 px-0.5 rounded border border-purple-500/30';
		}
	}

	function getTextClasses(changeType: string): string {
		switch (changeType) {
			case 'smart-quotes':
				return 'text-yellow-300';
			case 'em-dash':
			case 'en-dash':
				return 'text-red-300';
			case 'soft-hyphen':
			case 'whitespace':
				return 'text-purple-300';
			case 'ellipsis':
				return 'text-blue-300';
			case 'url-params':
				return 'text-orange-300';
			case 'fullwidth':
				return 'text-cyan-300';
			default:
				return 'text-purple-300';
		}
	}

	let segments = $derived(createSegments(text, changes));
</script>

<div class="font-mono text-sm leading-relaxed whitespace-pre-wrap text-slate-100">
	{#each segments as segment, i (i)}
		{#if segment.isChange && segment.change}
			<span
				class="group relative inline-block {getChangeClasses(segment.change.type)} cursor-help"
				title="Replaced: {getCharacterName(segment.change.original)} → {segment.change
					.replacement || '(removed)'}"
			>
				{#if segment.change.type === 'whitespace' || segment.change.type === 'soft-hyphen'}
					<!-- Show a visible representation of invisible characters -->
					<span class="text-xs font-bold {getTextClasses(segment.change.type)}">
						{segment.change.original === '\u200B' ||
						segment.change.original === '\u200C' ||
						segment.change.original === '\u200D' ||
						segment.change.original === '\uFEFF' ||
						segment.change.original === '\u00AD'
							? '∅'
							: '·'}
					</span>
				{:else}
					<span class={getTextClasses(segment.change.type)}>{segment.text}</span>
				{/if}
				<!-- Tooltip showing what was replaced -->
				<span
					class="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 transform rounded bg-slate-800 px-2 py-1 text-xs whitespace-nowrap text-slate-100 opacity-0 ring-1 ring-white/10 transition-opacity duration-200 group-hover:opacity-100"
				>
					{getCharacterName(segment.change.original)} → "{segment.change.replacement ||
						'(removed)'}"
				</span>
			</span>
		{:else}
			{segment.text}
		{/if}
	{/each}
</div>

<style>
	/* AI Artifact Highlighting Styles - matching CopyCleanse guide */
	:global(.ai-smart-quote) {
		box-shadow: 0 0 4px rgba(234, 179, 8, 0.2);
	}

	:global(.ai-em-dash) {
		box-shadow: 0 0 4px rgba(239, 68, 68, 0.2);
	}

	:global(.ai-soft-hyphen) {
		box-shadow: 0 0 4px rgba(168, 85, 247, 0.2);
	}

	:global(.ai-ellipsis) {
		box-shadow: 0 0 4px rgba(59, 130, 246, 0.2);
	}

	:global(.ai-tracking-param) {
		box-shadow: 0 0 4px rgba(249, 115, 22, 0.2);
	}

	:global(.ai-fullwidth) {
		box-shadow: 0 0 4px rgba(6, 182, 212, 0.2);
	}

	:global(.ai-other) {
		box-shadow: 0 0 4px rgba(168, 85, 247, 0.2);
	}

	/* Add hover effect for tooltips */
	:global(.group:hover .tooltip) {
		opacity: 1;
	}
</style>
