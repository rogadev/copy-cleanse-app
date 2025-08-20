import adapterAuto from '@sveltejs/adapter-auto';
import adapterStatic from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

// Use static adapter only for Lighthouse CI, auto adapter for everything else
const adapter = process.env.LIGHTHOUSE_BUILD
	? adapterStatic({
			pages: 'build', // Lighthouse CI expects 'build'
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		})
	: adapterAuto(); // Works for Vercel, Netlify, and local dev

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter
	}
};

export default config;
