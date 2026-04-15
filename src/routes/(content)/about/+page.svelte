<svelte:head>
	<title>About · Copy Cleanse</title>
	<meta
		name="description"
		content="About Copy Cleanse — a free, private, browser-based tool for stripping hidden Unicode markers from AI-generated text."
	/>
	<link rel="canonical" href="https://copycleanse.com/about" />
</svelte:head>

<h1>About Copy Cleanse</h1>
<p class="text-slate-400">Why this tool exists and who built it.</p>

<h2>What it does</h2>
<p>
	Copy Cleanse removes the subtle formatting artifacts that large language models leave behind in
	their output: zero-width spaces, non-breaking spaces, Unicode direction markers, curly quotes, em
	dashes substituted for regular punctuation, and other invisible characters that make AI text
	behave oddly when pasted into editors, CMSs, or messaging apps.
</p>
<p>
	Paste text in, get clean text out. A diff view shows exactly what was removed so you can see what
	the model actually wrote versus how it chose to render it.
</p>

<h2>How it works</h2>
<p>
	Everything runs in your browser. Your text is processed by JavaScript loaded on the page — no
	request is ever sent to a server with your content. Close the tab and the text is gone from the
	machine's memory. There is no account, no history, no sync.
</p>
<p>
	The site is a static SvelteKit application deployed on Vercel. The source is open: see the
	<a href="https://github.com/rogadev/copy-cleanse">GitHub repository</a>.
</p>

<h2>Who built it</h2>
<p>
	Copy Cleanse is maintained by Ryan Roga. It started as a personal utility — I kept pasting AI
	drafts into my blog and finding invisible characters that broke layouts and search — and grew into
	a public tool because other people were hitting the same thing.
</p>

<h2>Roadmap</h2>
<p>The near-term focus is:</p>
<ul>
	<li>A browser extension so you can clean text in place without leaving the tab you're in.</li>
	<li>A short-form guide explaining which characters LLMs insert and why.</li>
	<li>
		Configurable cleaning rules for users who want to keep certain characters (e.g. em dashes in
		fiction).
	</li>
</ul>

<h2>Get in touch</h2>
<p>
	Bug reports and feature requests: <a href="https://github.com/rogadev/copy-cleanse/issues"
		>open an issue on GitHub</a
	>. For anything else, see the <a href="/contact">contact page</a>.
</p>
