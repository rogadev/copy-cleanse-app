<script lang="ts">
	const lastUpdated = 'April 15, 2026';
</script>

<svelte:head>
	<title>Privacy Policy · Copy Cleanse</title>
	<meta
		name="description"
		content="Copy Cleanse privacy policy. We don't collect, store, or transmit your text. Here's the full breakdown of what is and isn't processed."
	/>
	<link rel="canonical" href="https://copycleanse.com/privacy" />
</svelte:head>

<h1>Privacy Policy</h1>
<p class="text-slate-400">Last updated: {lastUpdated}</p>

<h2>The short version</h2>
<p>
	Copy Cleanse processes your text entirely in your browser. We do not receive it, store it, log it,
	or transmit it to any server. There are no accounts, no cookies used by Copy Cleanse itself, and
	no analytics tracking individual users. Close the tab and your text is gone.
</p>

<h2>Who we are</h2>
<p>
	Copy Cleanse (the "Service", "we", "us") is operated by Ryan Roga. The Service is available at
	<a href="https://copycleanse.com">copycleanse.com</a>. You can contact us via the
	<a href="/contact">contact page</a>.
</p>

<h2>Information processed in your browser</h2>
<p>
	When you paste text into Copy Cleanse, that text is held in your browser's memory while the tool
	cleans it. The cleaning algorithm runs locally as JavaScript. At no point is the text content sent
	over the network. When you close the tab or navigate away, the text is discarded.
</p>
<p>We do not:</p>
<ul>
	<li>Store your text in a database.</li>
	<li>Transmit your text to our servers or to any third party.</li>
	<li>Log the contents of what you paste.</li>
	<li>Use your text to train machine learning models.</li>
</ul>

<h2>Information we do not collect</h2>
<p>Copy Cleanse does not maintain user accounts and does not collect:</p>
<ul>
	<li>Names, email addresses, or other identifiers.</li>
	<li>Payment information.</li>
	<li>Location data beyond the country-level geolocation inherent to any web request.</li>
	<li>Behavioral profiles, click streams, or session recordings.</li>
</ul>

<h2>Hosting and server logs</h2>
<p>
	The Service is hosted on <a href="https://vercel.com">Vercel</a>. Like any web host, Vercel
	records standard server request metadata when you visit the site — your IP address, user agent,
	the URL requested, and a timestamp — for operational purposes such as serving content, preventing
	abuse, and aggregate traffic measurement. These logs do not contain the text you paste into the
	tool (the tool never sends it). Vercel's handling of this data is governed by
	<a href="https://vercel.com/legal/privacy-policy">Vercel's privacy policy</a>.
</p>

<h2>Cookies and local storage</h2>
<p>
	Copy Cleanse does not set cookies and does not write to <code>localStorage</code> or
	<code>sessionStorage</code> on your device. SvelteKit may use ephemeral in-memory state to render the
	page; this is discarded when the tab is closed.
</p>

<h2>Third-party services</h2>
<p>
	At the time of this writing, Copy Cleanse uses no third-party scripts, analytics providers,
	advertising networks, or tracking pixels on the tool itself. The only outbound connections from
	your browser are to the site's own static assets served via Vercel's CDN.
</p>
<p>
	If this changes — for example, if we later add privacy-respecting analytics or an ad network to
	help fund the project — we will update this policy and, where required, present you with a consent
	choice before any such third party loads in your browser. Material changes will be reflected in
	the "Last updated" date above.
</p>

<h2>Children</h2>
<p>
	Copy Cleanse is not directed at children under 13. We do not knowingly collect personal
	information from children. Because we don't collect personal information from anyone, this is
	largely moot, but we call it out for clarity.
</p>

<h2>Your rights</h2>
<p>
	If you are in a jurisdiction with data-protection laws such as the GDPR (EU/UK), CPRA
	(California), or similar regimes, you generally have rights to access, correct, delete, or
	restrict processing of personal data held about you. Because we do not maintain a database of
	users or content, we typically have no such data to act on. If you believe we hold personal data
	about you, contact us and we will respond.
</p>

<h2>Changes to this policy</h2>
<p>
	We may update this policy to reflect changes to the Service or to legal requirements. When we do,
	we will change the "Last updated" date at the top. For material changes — particularly any that
	introduce new data collection or third-party services — we will make the change visible on the
	site for a reasonable period before it takes effect.
</p>

<h2>Contact</h2>
<p>
	Questions about this policy can be directed to
	<a href="mailto:ryan@roga.dev?subject=Copy%20Cleanse%20privacy">ryan@roga.dev</a>
	or through the <a href="/contact">contact page</a>.
</p>
