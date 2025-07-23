<script lang="ts">
	import InteractivePlayground from '$lib/components/InteractivePlayground.svelte';

	import { resolveToNoteId } from '$lib/utils/utils';
	import { t } from '@konemono/svelte5-i18n';

	const nostrNoteConfig = {
		title: $t('playground.title', { target: 'nostr-note' }),
		description: $t('playground.description'),

		defaultProps: {
			id: 'nevent1qvzqqqqqqypzpp9sc34tdxdvxh4jeg5xgu9ctcypmvsg0n00vwfjydkrjaqh0qh4qyxhwumn8ghj77tpvf6jumt9qyv8wumn8ghj7un9d3shjtnddakk7um5wgh8q6twdvqzq673ld76k3sn9nuflzqxgyz2ht9lkh0a3qun9vxv7frfhsv4pvsph7jzvj',
			relays: 'wss://nfrelay.app,wss://nos.lol',
			href: '',
			target: '_blank',
			noLink: false,
			theme: 'auto',
			height: '',
			display: 'card'
		},

		propConfigs: [
			{
				key: 'id',
				type: 'text' as const,
				placeholder: $t('props.id.placeholder'),
				help: $t('props.id.help')
			},
			{
				key: 'relays',

				type: 'text' as const,
				placeholder: $t('props.relays.placeholder'),
				help: $t('props.relays.help')
			},
			{
				key: 'href',

				type: 'text' as const,
				placeholder: $t('props.href.placeholder'),
				help: $t('props.href.help')
			},
			{
				key: 'target',

				type: 'select' as const,
				options: [
					{ value: '_blank', label: '_blank' },
					{ value: '_self', label: '_self' },
					{ value: '_parent', label: '_parent' },
					{ value: '_top', label: '_top' }
				],
				help: $t('props.target.help')
			},
			{
				key: 'noLink',

				type: 'checkbox' as const,
				help: $t('props.noLink.help')
			},
			{
				key: 'theme',

				type: 'select' as const,
				options: [
					{ value: 'auto', label: 'auto' },
					{ value: 'light', label: 'light' },
					{ value: 'dark', label: 'dark' }
				],
				help: $t('props.theme.help')
			},
			{
				key: 'height',

				type: 'text' as const,
				placeholder: $t('props.height.placeholder'),
				help: $t('props.height.help')
			},
			{
				key: 'display',

				type: 'select' as const,
				options: [
					{ value: 'card', label: 'card' },
					{ value: 'compact', label: 'compact' }
				],
				help: $t('props.display.help')
			}
		],
		generateCode: (props: any) => {
			let attributes: string[] = [`id="${props.id}"`];

			if (props.relays) {
				const relaysArray = props.relays
					.split(',')
					.map((r: string) => `"${r.trim()}"`)
					.join(', ');
				attributes.push(`relays={[${relaysArray}]}`);
			}
			if (props.href) attributes.push(`href="${props.href}"`);
			if (props.target !== '_blank') attributes.push(`target="${props.target}"`);
			if (props.noLink) attributes.push(`noLink={true}`);
			if (props.theme !== 'auto') attributes.push(`theme="${props.theme}"`);
			if (props.height) attributes.push(`height="${props.height}"`);
			if (props.display !== 'card') attributes.push(`display="${props.display}"`);

			return `<nostr-note\n  ${attributes.join('\n  ')}\n></nostr-note>`;
		}
	};
</script>

<InteractivePlayground config={nostrNoteConfig}>
	{#snippet preview(props)}
		{#if resolveToNoteId(props.id || nostrNoteConfig.defaultProps.id) !== null}
			<nostr-note
				id={props.id || nostrNoteConfig.defaultProps.id}
				relays={props.relays
					? props.relays.split(',').map((r: string) => r.trim())
					: nostrNoteConfig.defaultProps.relays.split(',').map((r) => r.trim())}
				href={props.href || undefined}
				target={props.target || nostrNoteConfig.defaultProps.target}
				noLink={props.noLink || nostrNoteConfig.defaultProps.noLink}
				theme={props.theme || nostrNoteConfig.defaultProps.theme}
				height={props.height || undefined}
				display={props.display || nostrNoteConfig.defaultProps.display}
			></nostr-note>
		{/if}
	{/snippet}</InteractivePlayground
>

<style>
	nostr-note {
		display: block;
		max-width: 650px;
		margin-top: 1rem;
		border-radius: 0.75rem;
		box-shadow: 0 4px 12px rgb(0 0 0 / 0.08);
		background-color: var(--color-surface-50-950);
		transition: box-shadow 0.25s ease;
	}
</style>
