<script>
	import { browser } from '$app/environment';
	import { theme } from '$lib/runes/runes.svelte';
	import { t } from '@konemono/svelte5-i18n';
</script>

<div class="container">
	<header class="hero">
		<h1>{$t('title')}</h1>
		<p>{$t('description')}</p>
	</header>

	<section class="components-overview">
		<div class="component-grid">
			<div class="component-card">
				<h3><span class="icon">N</span>nostr-note</h3>
				<p>{$t('components.note.description')}</p>
				<div class="code-example">
					<code>&lt;nostr-note id="nevent1..." theme={theme.get()} /&gt;</code>
				</div>
				<a href="/nostr-note" class="learn-more">{$t('learnMore')} →</a>
			</div>

			<div class="component-card">
				<h3><span class="icon">P</span>nostr-profile</h3>
				<p>{$t('components.profile.description')}</p>
				<div class="code-example">
					<code>&lt;nostr-profile user="npub1..." theme={theme.get()} /&gt;</code>
				</div>
				<a href="/nostr-profile" class="learn-more">{$t('learnMore')} →</a>
			</div>

			<div class="component-card">
				<h3><span class="icon">L</span>nostr-list</h3>
				<p>{$t('components.list.description')}</p>
				<div class="code-example">
					<code>&lt;nostr-list filters="[...]" limit="3" theme={theme.get()} /&gt;</code>
				</div>
				<a href="/nostr-list" class="learn-more">{$t('learnMore')} →</a>
			</div>

			<div class="component-card">
				<h3><span class="icon">A</span>nostr-naddr</h3>
				<p>{$t('components.naddr.description')}</p>
				<div class="code-example">
					<code>&lt;nostr-naddr address="naddr1..." theme={theme.get()} /&gt;</code>
				</div>
				<a href="/nostr-naddr" class="learn-more">{$t('learnMore')} →</a>
			</div>
		</div>
	</section>
	{#if browser}
		<section class="demo-section">
			<h2>{$t('demo.title')}</h2>
			<p class="demo-intro">{$t('demo.description')}</p>

			<div class="demo-container">
				<nostr-container relays={`["wss://yabu.me","wss://nos.lol","wss://nfrelay.app"]`}>
					<div class="demo-item">
						<h4>{$t('demo.note.title')}</h4>
						<nostr-note
							theme={theme.get()}
							id="nevent1qvzqqqqqqypzpp9sc34tdxdvxh4jeg5xgu9ctcypmvsg0n00vwfjydkrjaqh0qh4qy2hwumn8ghj7un9d3shjtnzv9exjmn99e3k7qghwaehxw309ahx7um5wghxjar5v9hx6mewd4jkuqgdwaehxw309aukzcn49ekk2qfqwaehxw309aex2mrp0ykk5upwdehhxarj9emkjun9v3hx2apwdfcqz9rhwden5te0wfjkccte9ejxzmt4wvhxjmcpz9mhxue69uhkuenjv4kxz7fwv9c8qqgnwaehxw309amk7apwdehhxarj9ehx2aqpr4mhxue69uhkummnw3ezucm0d4cxjmr994jhyun0wghxuet5qqs0h88f3cjgemhvl8an3x2q2kg3rfa420akmqk9vdrmwq9hdtjl27gyfnkkc"
						></nostr-note>
					</div>

					<div class="demo-item">
						<h4>{$t('demo.profile.title')}</h4>
						<nostr-profile
							theme={theme.get()}
							user="npub1sjcvg64knxkrt6ev52rywzu9uzqakgy8ehhk8yezxmpewsthst6sw3jqcw"
						></nostr-profile>
					</div>

					<div class="demo-item">
						<h4>{$t('demo.list.title')}</h4>
						<nostr-list
							theme={theme.get()}
							filters={`[{"authors":["84b0c46ab699ac35eb2ca286470b85e081db2087cdef63932236c397417782f5"]}]`}
							limit="3"
						></nostr-list>
					</div>
				</nostr-container>
			</div>
		</section>
	{/if}
	<section class="installation">
		<h2>{$t('installation.title')}</h2>
		<div class="install-steps">
			<div class="step">
				<h3>{$t('installation.cdn.title')}</h3>
				<div class="code-block">
					<code
						>&lt;script
						src="https://cdn.jsdelivr.net/npm/@konemono/nostr-web-components@0.1.27/dist/nostr-web-components.iife.js"&gt;&lt;/script&gt;</code
					>
				</div>
			</div>
			<div class="step">
				<h3>{$t('installation.usage.title')}</h3>
				<div class="code-block">
					<code>&lt;nostr-note id="nevent1..." /&gt;</code>
				</div>
			</div>
		</div>
	</section>

	<nav class="navigation">
		<h2>{$t('navigation.title')}</h2>
		<div class="nav-links">
			<a href="/nostr-note" class="nav-link">nostr-note</a>
			<a href="/nostr-profile" class="nav-link">nostr-profile</a>
			<a href="/nostr-list" class="nav-link">nostr-list</a>
			<a href="/nostr-naddr" class="nav-link">nostr-naddr</a>
			<a href="/installation" class="nav-link">{$t('navigation.installation')}</a>
			<a href="/api" class="nav-link">{$t('navigation.api')}</a>
		</div>
	</nav>
</div>

<style>
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
	}

	.hero {
		text-align: center;
		padding: 4rem 0 3rem;
		background: var(--color-primary-500);
		color: var(--color-primary-contrast-500);
		border-radius: 20px;
		margin-bottom: 3rem;
	}

	.hero h1 {
		font-size: 3rem;
		font-weight: 700;
		margin-bottom: 1rem;
	}

	.hero p {
		font-size: 1.25rem;
		opacity: 0.9;
		max-width: 600px;
		margin: 0 auto;
	}

	.components-overview {
		margin-bottom: 4rem;
	}

	.component-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
	}

	.component-card {
		background: var(--color-surface-50-950);
		border-radius: 12px;
		padding: 2rem;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		border: 1px solid var(--color-surface-200-800);
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
	}

	.component-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
	}

	.component-card h3 {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--color-surface-900-100);
		margin-bottom: 1rem;
	}

	.icon {
		width: 32px;
		height: 32px;
		background: var(--color-primary-500);
		color: var(--color-primary-contrast-500);
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: bold;
		font-size: 0.9rem;
	}

	.component-card p {
		color: var(--color-surface-700-300);
		line-height: 1.6;
		margin-bottom: 1.5rem;
	}

	.code-example {
		background: var(--color-surface-100-900);
		border: 1px solid var(--color-surface-200-800);
		border-radius: 6px;
		padding: 1rem;
		margin-bottom: 1.5rem;
		font-family: 'Monaco', 'Menlo', monospace;
		font-size: 0.875rem;
		overflow-x: auto;
	}

	.learn-more {
		color: var(--color-primary-500);
		text-decoration: none;
		font-weight: 500;
		transition: color 0.3s ease;
	}

	.learn-more:hover {
		color: var(--color-primary-600-400);
	}

	.demo-section {
		background: var(--color-surface-50-950);
		border-radius: 16px;
		padding: 3rem;
		margin-bottom: 4rem;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
	}

	.demo-section h2 {
		font-size: 2rem;
		font-weight: 600;
		color: var(--color-surface-900-100);
		margin-bottom: 1rem;
		text-align: center;
	}

	.demo-intro {
		text-align: center;
		color: var(--color-surface-700-300);
		margin-bottom: 2rem;
		font-size: 1.1rem;
	}

	.demo-container {
		background: var(--color-surface-50-950);
		border-radius: 12px;
		padding: 2rem;
		border: 2px dashed var(--color-surface-300-700);
	}

	.demo-item {
		margin-bottom: 3rem;
	}

	.demo-item:last-child {
		margin-bottom: 0;
	}

	.demo-item h4 {
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--color-surface-800-200);
		margin-bottom: 1rem;
	}

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
		margin-bottom: 2rem;
		text-align: center;
	}

	.install-steps {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
	}

	.step h3 {
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--color-surface-800-200);
		margin-bottom: 1rem;
	}

	.code-block {
		background: var(--color-surface-100-900);
		color: var(--color-surface-800-200);
		border-radius: 8px;
		padding: 1.5rem;
		font-family: 'Monaco', 'Menlo', monospace;
		font-size: 0.9rem;
		overflow-x: auto;
	}

	.navigation {
		background: var(--color-surface-50-950);
		border-radius: 16px;
		padding: 3rem;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
	}

	.navigation h2 {
		font-size: 1.75rem;
		font-weight: 600;
		color: var(--color-surface-900-100);
		margin-bottom: 2rem;
		text-align: center;
	}

	.nav-links {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
	}

	.nav-link {
		display: block;
		padding: 1rem 1.5rem;
		background: var(--color-primary-500);
		color: var(--color-primary-contrast-500);
		text-decoration: none;
		border-radius: 8px;
		text-align: center;
		font-weight: 500;
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
	}

	.nav-link:hover {
		transform: translateY(-2px);
		box-shadow: 0 5px 20px color-mix(in srgb, var(--color-primary-500) 40%, transparent);
	}

	@media (max-width: 768px) {
		.hero h1 {
			font-size: 2rem;
		}

		.hero p {
			font-size: 1rem;
		}

		.container {
			padding: 1rem;
		}

		.component-grid {
			grid-template-columns: 1fr;
		}

		.install-steps {
			grid-template-columns: 1fr;
		}
	}
</style>
