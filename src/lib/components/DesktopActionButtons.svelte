<script lang="ts">
	interface Props {
		showDiff: boolean;
		onToggleDiff: () => void;
		onCopy: () => Promise<void>;
	}

	let { showDiff, onToggleDiff, onCopy }: Props = $props();

	const BUTTON_STYLES = {
		primary:
			'group flex w-full items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:outline-none',
		secondary:
			'group flex w-full items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-3 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:from-green-700 hover:to-emerald-700 focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:outline-none'
	} as const;
</script>

<div class="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
	<!-- Show/Hide Results Button -->
	<button onclick={onToggleDiff} class={BUTTON_STYLES.primary}>
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
	<button onclick={onCopy} class={BUTTON_STYLES.secondary}>
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
