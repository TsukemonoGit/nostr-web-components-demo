<script>
	import { t } from '@konemono/svelte5-i18n';
</script>

<section class="installation px-0 md:px-8">
	<h2 class="text-center h2">{$t('installation.title')}</h2>
	<p class="intro">{$t('installation.description')}</p>

	<div class="install-steps">
		<!-- CDN Installation -->
		<div class="step">
			<h3>{$t('installation.cdn.title')}</h3>
			<p>{$t('installation.cdn.description')}</p>
			<pre><code
					>&lt;script src="https://cdn.jsdelivr.net/npm/@konemono/nostr-web-components@latest/dist/nostr-web-components.iife.js"&gt;&lt;/script&gt;</code
				></pre>
		</div>

		<!-- Basic Usage -->
		<div class="step">
			<h3 class="h3">{$t('installation.usage.title')}</h3>
			<p>{$t('installation.usage.description')}</p>
			<pre><code
					>&lt;nostr-container relays='["wss://relay.damus.io", "wss://nos.lol"]'&gt;<br />
					&nbsp;&nbsp;&lt;nostr-note id="note1abc..." /&gt;<br />
					&nbsp;&nbsp;&lt;nostr-profile user="npub1xyz..." /&gt;<br />
					&nbsp;&nbsp;&lt;nostr-list filters='{JSON.stringify([{ kinds: [1], limit: 10 }])}' /&gt;<br />
					&lt;/nostr-container&gt;</code
				></pre>
		</div>

		<!-- Without Container -->
		<div class="step">
			<h3>{$t('installation.standalone.title')}</h3>
			<p>{$t('installation.standalone.description')}</p>
			<pre><code>&lt;nostr-note id="note1abc..." /&gt;</code></pre>
		</div>

		<!-- Override Relays -->
		<div class="step">
			<h3>{$t('installation.override.title')}</h3>
			<p>{$t('installation.override.description')}</p>
			<pre><code>
					&lt;nostr-note id="note1abc..." relays='["wss://relay.damus.io"]' /&gt;<br />
					&lt;nostr-profile user="npub1xyz..." relays='["wss://nos.lol"]' /&gt;
				</code></pre>
		</div>
	</div>
</section>

<style>
	.installation .intro {
		text-align: center;
		color: var(--color-surface-800-200);
		margin-bottom: 2rem;
	}

	.install-steps {
		display: grid;
		/*grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); */
		gap: 2rem;
	}

	.step h3 {
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--color-surface-950-50);
		margin-bottom: 0.5rem;
	}

	.step p {
		color: var(--color-surface-900-100);
		font-size: 0.95rem;
		margin-bottom: 1rem;
	}

	.code-block {
		background: var(--color-surface-100-900);
		color: var(--color-surface-800-200);
		border-radius: 8px;
		padding: 1rem;
		font-family: 'Menlo', monospace;
		font-size: 0.85rem;
		overflow-x: auto;
	}
</style>
