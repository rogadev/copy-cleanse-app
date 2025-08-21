<script lang="ts">
	import HeroSection from '$lib/components/HeroSection.svelte';
	import TextCleanerInterface from '$lib/components/TextCleanerInterface.svelte';
	import HowItWorksSection from '$lib/components/HowItWorksSection.svelte';
	import FeaturesSection from '$lib/components/FeaturesSection.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let showInfo = $state(false);
	let headerMinimal = $state(false);
</script>

<svelte:head>
	<title>Copy Cleanse - Remove Hidden Markers from Generated Text</title>
	<meta
		name="description"
		content="Copy Cleanse - Clean AI-generated text by removing hidden whitespace markers and formatting inconsistencies that identify generated content."
	/>
</svelte:head>

<div class="relative min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black">
	<!-- Background decoration -->
	<div class="absolute inset-0 overflow-hidden">
		<div
			class="absolute -top-1/2 -right-1/2 h-full w-full rounded-full bg-gradient-to-bl from-indigo-500/10 via-transparent to-transparent blur-3xl"
		></div>
		<div
			class="absolute -bottom-1/2 -left-1/2 h-full w-full rounded-full bg-gradient-to-tr from-violet-500/10 via-transparent to-transparent blur-3xl"
		></div>
	</div>
	<div class="relative z-10">
		<div class="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
			<!-- Hero Section -->
			<HeroSection {headerMinimal} />

			<!-- Main Text Cleaning Interface -->
			<TextCleanerInterface bind:headerMinimal />

			<!-- How it Works - Below the fold -->
			<HowItWorksSection bind:showInfo />

			<!-- Features Section - Enhanced -->
			<FeaturesSection />

			<!-- Footer - Enhanced -->
			<Footer />
		</div>
	</div>
</div>
