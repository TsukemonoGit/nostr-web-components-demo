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
			<li>
				<a href={`${base}/nostr-stream`} class={getLinkClass(`${base}/nostr-stream`)}
					>nostr-stream</a
				>
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
				<path
					d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.164 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"
				/>
			</svg>
			<span>GitHub</span>
		</a>
		<div class="text-xs text-surface-700-300">
			<span>© 2025 MIT License</span>
		</div>
	</div>
</div>
