<script lang="ts">
	import { Switch } from '@skeletonlabs/skeleton-svelte';
	// Icons
	import IconMoon from '@lucide/svelte/icons/moon';
	import IconSun from '@lucide/svelte/icons/sun';
	import { onMount } from 'svelte';
	import { theme } from '$lib/runes/runes.svelte';
	import type { Theme } from '$lib/types/types';

	onMount(() => {
		const userPrefersMode = localStorage?.getItem('theme') as Theme;
		if (userPrefersMode === 'dark') {
			setTheme('dark');
			theme.set('dark');
		}
	});

	// Handle the change in state when toggled.
	function handleModeChange(checked: boolean) {
		// NOTE: implementation may differ per Tailwind config and framework:
		// https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually

		const t = checked ? 'dark' : 'light';
		theme.set(t);
		localStorage?.setItem('theme', t);

		setTheme(t);
	}

	function setTheme(theme: Theme) {
		if (theme === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}
</script>

<Switch
	name="mode"
	controlActive="bg-surface-200"
	checked={theme.get() === 'dark'}
	onCheckedChange={(e) => handleModeChange(e.checked)}
>
	{#snippet inactiveChild()}<IconMoon size="14" />{/snippet}
	{#snippet activeChild()}<IconSun size="14" />{/snippet}
</Switch>
