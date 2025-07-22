<script lang="ts">
	import { t } from '@konemono/svelte5-i18n';
</script>

<nav>
	<!-- TOP: 独立した項目 -->
	<ul class="mb-6 space-y-1">
		<li>
			<a
				href="/"
				class="block rounded-md px-3 py-2 text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800"
			>
				TOP
			</a>
		</li>
	</ul>

	<!-- Docs セクション -->
	<h2 class=" mb-3 text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">Docs</h2>
	<ul class="space-y-1">
		<li>
			<a
				href="/installation"
				class="block rounded-md px-3 py-2 text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800"
				>{$t('navigation.installation')}</a
			>
		</li>
		<li>
			<a
				href="/api"
				class="block rounded-md px-3 py-2 text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800"
				>{$t('navigation.api')}</a
			>
		</li>
	</ul>
	<!-- Components セクション -->
	<h2 class="mt-6 mb-3 text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
		Components
	</h2>
	<ul class="space-y-1">
		<li>
			<a
				href="/nostr-note"
				class="block rounded-md px-3 py-2 text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800"
				>nostr-note</a
			>
		</li>
		<li>
			<a
				href="/nostr-profile"
				class="block rounded-md px-3 py-2 text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800"
				>nostr-profile</a
			>
		</li>

		<li>
			<a
				href="/nostr-naddr"
				class="block rounded-md px-3 py-2 text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800"
				>nostr-naddr</a
			>
		</li>
		<li>
			<a
				href="/nostr-list"
				class="block rounded-md px-3 py-2 text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800"
				>nostr-list</a
			>
		</li>
	</ul>
</nav>
