<script lang="ts">
	import { t } from '@konemono/svelte5-i18n';
	import { page } from '$app/state';
	import { base } from '$app/paths';

	function isActive(href: string): boolean {
		return page.url.pathname === href;
	}

	function getLinkClass(href: string): string {
		const baseClass = 'block rounded-md px-3 py-2 transition-colors duration-200';

		if (isActive(href)) {
			return `${baseClass} bg-blue-100 text-blue-700 border-l-4 border-blue-500 font-medium dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-400`;
		}
		return `${baseClass} text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800`;
	}
</script>

<div class="flex h-full flex-col justify-between overflow-y-auto">
	<nav>
		<ul class="mb-6 space-y-1">
			<li>
				<a href={`${base}/`} class={getLinkClass(`${base}/`)}>TOP</a>
			</li>
		</ul>

		<div class="mb-3 text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">Docs</div>
		<ul class="space-y-1">
			<li>
				<a href={`${base}/installation`} class={getLinkClass(`${base}/installation`)}>
					{$t('navigation.installation')}
				</a>
			</li>
			<li>
				<a href={`${base}/api`} class={getLinkClass(`${base}/api`)}>
					{$t('navigation.api')}
				</a>
			</li>
		</ul>

		<div class="mt-6 mb-3 text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
			Components
		</div>
		<ul class="space-y-1">
			<li>
				<a href={`${base}/nostr-note`} class={getLinkClass(`${base}/nostr-note`)}>nostr-note</a>
			</li>
			<li>
				<a href={`${base}/nostr-profile`} class={getLinkClass(`${base}/nostr-profile`)}
					>nostr-profile</a
				>
			</li>
			<li>
				<a href={`${base}/nostr-naddr`} class={getLinkClass(`${base}/nostr-naddr`)}>nostr-naddr</a>
			</li>
			<li>
				<a href={`${base}/nostr-list`} class={getLinkClass(`${base}/nostr-list`)}>nostr-list</a>
			</li>
		</ul>
	</nav>

	<div class="mt-4 px-3">
		<a
			href="https://github.com/TsukemonoGit/nostr-web-components"
			target="_blank"
			rel="noopener noreferrer"
			class="flex items-center space-x-1 text-sm text-surface-600-400 transition-colors hover:text-surface-900-100"
		>
			<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
				<path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.164 6.839 9.49..." />
			</svg>
			<span>GitHub</span>
		</a>
		<div class="text-xs text-surface-700-300">
			<span>© 2025 MIT License</span>
		</div>
	</div>
</div>
