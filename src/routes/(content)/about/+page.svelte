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
	their output. It replaces smart quotes and curly apostrophes with plain ones, normalizes em and en
	dashes, converts Unicode ellipses to three dots, strips invisible characters like zero-width
	spaces and soft hyphens, replaces exotic whitespace with regular spaces, converts fullwidth Latin
	characters back to standard ASCII, and removes AI-source tracking parameters (such as
	<code>?source=chatgpt</code> or <code>utm_source=claude</code>) from URLs.
</p>
<p>
	Paste text in, get clean text out. A diff view shows exactly what was changed so you can see what
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

<h2>Who built it and why</h2>
<p>
	Copy Cleanse is built and maintained by Ryan Roga. The idea was simple: strip the little
	watermarks and fingerprints that AI tools leave behind in their output. What you see is what you
	get — no agenda, no claims beyond the character-by-character transformations listed above.
</p>
<p>
	The project is open source; contributions, issues, and feature requests are welcome on
	<a href="https://github.com/rogadev/copy-cleanse">GitHub</a>.
</p>

<h2>Get in touch</h2>
<p>
	Bug reports and feature requests: <a href="https://github.com/rogadev/copy-cleanse/issues"
		>open an issue on GitHub</a
	>. For anything else, see the <a href="/contact">contact page</a>.
</p>
