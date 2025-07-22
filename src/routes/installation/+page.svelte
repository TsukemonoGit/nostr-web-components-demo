<script>
	import { t } from '@konemono/svelte5-i18n';
</script>

<section class="installation">
	<h2>{$t('installation.title')}</h2>
	<p class="intro">{$t('installation.description')}</p>

	<div class="install-steps">
		<!-- CDN Installation -->
		<div class="step">
			<h3>{$t('installation.cdn.title')}</h3>
			<p>{$t('installation.cdn.description')}</p>
			<div class="code-block">
				<!-- prettier-ignore -->
				<code
					>&lt;script src="https://cdn.jsdelivr.net/npm/@konemono/nostr-web-components@latest/dist/nostr-web-components.iife.js"&gt;&lt;/script&gt;</code
				>
			</div>
		</div>

		<!-- Basic Usage -->
		<div class="step">
			<h3>{$t('installation.usage.title')}</h3>
			<p>{$t('installation.usage.description')}</p>
			<div class="code-block">
				<code>
					&lt;nostr-container relays='["wss://relay.damus.io", "wss://nos.lol"]'&gt;<br />
					&nbsp;&nbsp;&lt;nostr-note id="note1abc..." /&gt;<br />
					&nbsp;&nbsp;&lt;nostr-profile user="npub1xyz..." /&gt;<br />
					&nbsp;&nbsp;&lt;nostr-list filters='{JSON.stringify([{ kinds: [1], limit: 10 }])}' /&gt;<br
					/>
					&lt;/nostr-container&gt;
				</code>
			</div>
		</div>

		<!-- Without Container -->
		<div class="step">
			<h3>{$t('installation.standalone.title')}</h3>
			<p>{$t('installation.standalone.description')}</p>
			<div class="code-block">
				<code>&lt;nostr-note id="note1abc..." /&gt;</code>
			</div>
		</div>

		<!-- Override Relays -->
		<div class="step">
			<h3>{$t('installation.override.title')}</h3>
			<p>{$t('installation.override.description')}</p>
			<div class="code-block">
				<code>
					&lt;nostr-note id="note1abc..." relays='["wss://relay.damus.io"]' /&gt;<br />
					&lt;nostr-profile user="npub1xyz..." relays='["wss://nos.lol"]' /&gt;
				</code>
			</div>
		</div>
	</div>
</section>

<style>
	.installation {
		background: var(--color-surface-50-950);
		border-radius: 16px;
		padding: 3rem;
		margin-bottom: 4rem;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
	}

	.installation h2 {
		font-size: 2rem;
		font-weight: 600;
		color: var(--color-surface-900-100);
		margin-bottom: 1rem;
		text-align: center;
	}

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
		white-space: pre-wrap;
	}
</style>
