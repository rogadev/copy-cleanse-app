<script lang="ts">
	const lastUpdated = 'April 15, 2026';
</script>

<svelte:head>
	<title>Terms of Service · Copy Cleanse</title>
	<meta
		name="description"
		content="Terms of service for Copy Cleanse, the free in-browser tool for cleaning AI-generated text."
	/>
	<link rel="canonical" href="https://copycleanse.com/terms" />
</svelte:head>

<h1>Terms of Service</h1>
<p class="text-slate-400">Last updated: {lastUpdated}</p>

<h2>Agreement</h2>
<p>
	By using Copy Cleanse (the "Service") at <a href="https://copycleanse.com">copycleanse.com</a>,
	you agree to these terms. If you don't agree, please don't use the Service. The Service is
	operated by Ryan Roga ("we", "us").
</p>

<h2>What you can do</h2>
<p>
	Copy Cleanse is free to use for personal and commercial text-cleaning purposes. You can paste text
	into the tool, clean it, and use the output however you like. You do not need an account. You do
	not owe us attribution, though it is appreciated.
</p>

<h2>What the Service is (and isn't)</h2>
<p>
	Copy Cleanse performs specific, deterministic text transformations: it replaces certain Unicode
	characters with their ASCII equivalents, strips invisible whitespace, normalizes punctuation, and
	removes known AI-source tracking parameters from URLs. That is the entirety of the functionality.
	The Service is a text-transformation utility, nothing more.
</p>
<p>
	<strong
		>The Service is not an AI-detection evader, a plagiarism-avoidance tool, an academic-integrity
		workaround, or an anti-forensics product.</strong
	> We make no representation — express, implied, or otherwise — that output produced by the Service
	will avoid detection by any AI-detection system, plagiarism checker, stylometric analyzer, watermark
	detector, or any other tool or process. We make no representation that use of the Service will conceal
	the fact that content was AI-generated. The Service only removes the specific characters and patterns
	listed in the documentation; it does not rewrite prose, alter meaning, or alter stylistic signals.
</p>

<h2>Acceptable use</h2>
<p>You agree not to use the Service to:</p>
<ul>
	<li>
		Commit, facilitate, or attempt fraud, academic dishonesty, plagiarism, misrepresentation, or any
		form of deception — including submitting AI-generated content as your own original work in
		violation of the rules of any educational institution, employer, publisher, platform, or
		competition.
	</li>
	<li>
		Evade, interfere with, or attempt to defeat any authentication system, content-moderation
		system, AI-detection system, watermarking system, or other detection or integrity mechanism
		operated by a third party.
	</li>
	<li>Impersonate any person or misrepresent your affiliation with any person or organization.</li>
	<li>
		Process content that is unlawful for you to possess, transmit, or publish in your jurisdiction,
		or that infringes the rights of any third party.
	</li>
	<li>Disrupt the Service, overload it, or interfere with other users' access.</li>
	<li>
		Probe, scan, or test the Service's infrastructure for vulnerabilities without prior written
		consent (responsible security reports are welcome — see the <a href="/contact">contact page</a
		>).
	</li>
	<li>
		Reverse engineer, scrape at abusive rates, or redistribute the hosted Service as your own.
	</li>
</ul>
<p>
	We may terminate your access to the Service at any time, for any reason, and without notice,
	including for any actual or suspected violation of these terms.
</p>
<p>
	The open-source code is separately licensed; see the
	<a href="https://github.com/rogadev/copy-cleanse">repository</a> for its license terms.
</p>

<h2>Your content</h2>
<p>
	Copy Cleanse processes text you paste into it entirely within your browser. We do not receive or
	store your text. You retain all rights to any content you paste and to any output the tool
	produces from it. We claim no ownership and no license over your content.
</p>

<h2>Assumption of risk</h2>
<p>
	You acknowledge and agree that you use the Service entirely at your own risk and that you are
	solely responsible for:
</p>
<ul>
	<li>How you use the Service and any output produced by it.</li>
	<li>
		Whether any use of the Service or its output is permitted by the rules, policies, or laws that
		apply to you, including the academic-integrity policies of any institution you attend, the
		acceptable-use policies of any platform you publish to, and the laws of any jurisdiction that
		applies to you.
	</li>
	<li>
		Any consequences — academic, professional, reputational, financial, or legal — of your use of
		the Service or its output, including consequences resulting from the Service's output being
		detected, identified, flagged, rejected, or otherwise recognized by any third party or system.
	</li>
</ul>

<h2>No warranty</h2>
<p>
	The Service is provided "as is" and "as available", without warranties of any kind, express or
	implied. To the fullest extent permitted by law, we disclaim all warranties, including implied
	warranties of merchantability, fitness for a particular purpose, non-infringement, accuracy,
	completeness, reliability, and any warranty that the output of the Service will be undetectable,
	untraceable, unattributable, or indistinguishable from human-written content. We do not warrant
	that the Service will be uninterrupted or error-free. You are responsible for reviewing output
	before publishing or transmitting it.
</p>

<h2>Limitation of liability</h2>
<p>
	To the fullest extent permitted by applicable law, we disclaim all liability arising from or
	related to your use of the Service. This includes, without limitation, any direct, indirect,
	incidental, special, consequential, exemplary, or punitive damages, and any loss of profits,
	revenue, data, goodwill, opportunity, academic standing, employment, or reputation, whether based
	in contract, tort (including negligence), strict liability, or any other legal theory, and whether
	or not we have been advised of the possibility of such damages. You use the Service at your own
	risk.
</p>
<p>
	The Service is provided free of charge. You have not paid us anything to use it, and we owe you
	nothing. In any jurisdiction where a monetary cap on liability is required for the disclaimer
	above to be enforceable, our aggregate liability is capped at ten Canadian dollars (CAD $10).
</p>
<p>
	Nothing in these terms excludes or limits liability that cannot be excluded or limited under
	applicable law, including certain rights you may have under the British Columbia Business
	Practices and Consumer Protection Act or similar statutes.
</p>

<h2>Indemnification</h2>
<p>
	You agree to defend, indemnify, and hold harmless Ryan Roga and any contributors to the Service
	from and against any claims, liabilities, damages, losses, costs, and expenses (including
	reasonable legal fees) arising out of or in any way connected with your use of the Service, your
	violation of these terms, or your violation of any rights of a third party. We reserve the right
	to assume the exclusive defense and control of any matter otherwise subject to indemnification by
	you, in which case you agree to cooperate with our defense of the claim.
</p>

<h2>Third-party services</h2>
<p>
	The Service is hosted on Vercel and may link to third-party sites such as GitHub. We are not
	responsible for the content, policies, or practices of third-party sites.
</p>

<h2>Changes to the Service</h2>
<p>
	We may modify, suspend, or discontinue the Service (or any part of it) at any time, with or
	without notice. We may also update these terms; the "Last updated" date above reflects the current
	version. Continued use of the Service after an update constitutes acceptance of the revised terms.
</p>

<h2>Governing law</h2>
<p>
	These terms are governed by the laws of the Province of British Columbia, Canada, without regard
	to its conflict-of-laws principles. Any dispute arising from the Service will be brought
	exclusively in the courts located in British Columbia, Canada, except where prohibited by
	applicable consumer-protection law.
</p>

<h2>Severability and entire agreement</h2>
<p>
	If any provision of these terms is held to be invalid or unenforceable by a court of competent
	jurisdiction, that provision will be enforced to the maximum extent permissible, and the remaining
	provisions will remain in full force and effect. Our failure to enforce any right or provision of
	these terms is not a waiver of that right or provision. These terms constitute the entire
	agreement between you and us regarding the Service and supersede any prior agreements.
</p>

<h2>Contact</h2>
<p>
	Questions about these terms can be directed to
	<a href="mailto:ryan@roga.dev?subject=Copy%20Cleanse%20terms">ryan@roga.dev</a>
	or through the <a href="/contact">contact page</a>.
</p>
