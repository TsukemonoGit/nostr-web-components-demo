<script>
	import { browser } from '$app/environment';
	import { theme } from '$lib/runes/runes.svelte';
	import { t } from '@konemono/svelte5-i18n';
	import { base } from '$app/paths';
</script>

<div class="container">
	<div class="hero">
		<div class="text-2xl sm:text-4xl">{$t('title')}</div>
		<p class="text-xs sm:text-base">{$t('description')}</p>
	</div>

	<section class="components-overview">
		<div class="component-grid">
			<div class="component-card">
				<h3><span class="icon">N</span>nostr-note</h3>
				<p>{$t('components.note.description')}</p>
				<div class="code-example">
					<code>&lt;nostr-note id="nevent1..." theme="{theme.get()}" /&gt;</code>
				</div>
				<a href={`${base}/nostr-note`} class="learn-more">{$t('learnMore')} →</a>
			</div>

			<div class="component-card">
				<h3><span class="icon">P</span>nostr-profile</h3>
				<p>{$t('components.profile.description')}</p>
				<div class="code-example">
					<code>&lt;nostr-profile user="npub1..." theme="{theme.get()}" /&gt;</code>
				</div>
				<a href={`${base}/nostr-profile`} class="learn-more">{$t('learnMore')} →</a>
			</div>

			<div class="component-card">
				<h3><span class="icon">A</span>nostr-naddr</h3>
				<p>{$t('components.naddr.description')}</p>
				<div class="code-example">
					<code>&lt;nostr-naddr naddr="naddr1..." theme={theme.get()} /&gt;</code>
				</div>
				<a href={`${base}/nostr-naddr`} class="learn-more">{$t('learnMore')} →</a>
			</div>

			<div class="component-card">
				<h3><span class="icon">L</span>nostr-list</h3>
				<p>{$t('components.list.description')}</p>
				<div class="code-example">
					<code>&lt;nostr-list filters="[...]" limit="3" theme="{theme.get()}" /&gt;</code>
				</div>
				<a href={`${base}/nostr-list`} class="learn-more">{$t('learnMore')} →</a>
			</div>
		</div>
	</section>
	{#if browser}
		<section class="demo-section p-2 sm:p-8">
			<h2 class="text-center h2">{$t('demo.title')}</h2>
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
						<h4>
							{$t('demo.naddr.title')}<span class="ml-2 text-xs font-normal text-surface-400">
								( user: mono@tsukemonogit.github.io, kind: 30003 id: monomoji )
							</span>
						</h4>

						<nostr-naddr
							itemsPerPage="3"
							theme={theme.get()}
							user="mono@tsukemonogit.github.io"
							kind="30003"
							identifier="monomoji"
						></nostr-naddr>
					</div>
					<div class="demo-item">
						<h4>
							{$t('demo.list.title')}
							<span class="ml-2 text-xs font-normal text-surface-400">
								( filters: {'[{"authors":["84b0c4…782f5"]}]'}, limit: 3 )
							</span>
						</h4>
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

	<nav class="navigation">
		<h2>{$t('navigation.title')}</h2>
		<div class="nav-links">
			<a href={`${base}/nostr-note`} class="nav-link">nostr-note</a>
			<a href={`${base}/nostr-profile`} class="nav-link">nostr-profile</a>
			<a href={`${base}/nostr-naddr`} class="nav-link">nostr-naddr</a>
			<a href={`${base}/nostr-list`} class="nav-link">nostr-list</a>
			<a href={`${base}/installation`} class="nav-link">{$t('navigation.installation')}</a>
			<a href={`${base}/api`} class="nav-link">{$t('navigation.api')}</a>
		</div>
	</nav>
</div>

<style>
	.hero {
		text-align: center;
		padding: 3rem 0.5rem;
		background: var(--color-primary-400-600);
		color: var(--color-primary-50);
		border-radius: 20px;
		margin-bottom: 3rem;

		margin-bottom: 1rem;
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

	.navigation {
		background: var(--color-surface-50-950);
		border-radius: 16px;
		padding: 3rem;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
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
		.hero p {
			font-size: 1rem;
		}

		.component-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
