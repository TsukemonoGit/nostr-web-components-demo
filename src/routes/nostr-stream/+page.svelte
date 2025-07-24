<script lang="ts">
	import InteractivePlayground from '$lib/components/InteractivePlayground.svelte';
	import { theme } from '$lib/runes/runes.svelte';
	import { t } from '@konemono/svelte5-i18n';

	// nostr-stream専用の設定
	let nostrListConfig = $derived({
		title: $t('playground.title', { target: 'nostr-stream' }),
		description: $t('playground.description'),
		customInstructions: $t('playground.stream.instructions'),
		defaultProps: {
			filters: `[{"kinds":[7]}]`,
			limit: '3',
			relays: 'wss://nfrelay.app,wss://nos.lol',
			theme: 'auto',
			display: 'card',
			height: '',
			target: '_blank',
			noLink: false
		},
		propConfigs: [
			{
				key: 'filters',
				type: 'text' as const,
				placeholder: $t('props.filters.placeholder'),
				help: $t('props.filters.help')
			},
			{
				key: 'limit',

				type: 'text' as const,
				placeholder: $t('props.limit.placeholder'),
				help: $t('props.limit.help')
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
					{ value: 'dark', label: 'dark' },
					{ value: 'site', label: $t('props.theme.site') }
				],
				help: $t('props.theme.help', { site: $t('props.theme.site') })
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
			let attributes: string[] = [`filters="${props.filters}"`];

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
			if (props.theme === 'site') {
				attributes.push(`theme=${theme.get()}`);
			} else if (props.theme !== 'auto') {
				attributes.push(`theme="${props.theme}"`);
			}
			attributes.push(`display="${props.display}"`);
			if (props.limit && props.limit !== '0') attributes.push(`limit={${props.limit}}`);
			if (props.display !== 'card') attributes.push(`display="${props.display}"`);

			return `<nostr-stream\n  ${attributes.join('\n  ')}\n></nostr-stream>`;
		}
	});
</script>

<InteractivePlayground config={nostrListConfig}
	>{#snippet preview(props)}
		<nostr-stream
			filters={props.filters || nostrListConfig.defaultProps.filters}
			limit={props.limit || nostrListConfig.defaultProps.limit}
			relays={props.relays
				? props.relays.split(',').map((r: string) => r.trim())
				: nostrListConfig.defaultProps.relays.split(',').map((r) => r.trim())}
			href={props.href || undefined}
			target={props.target || nostrListConfig.defaultProps.target}
			noLink={props.noLink || nostrListConfig.defaultProps.noLink}
			theme={props.theme === 'site'
				? theme.get()
				: props.theme || nostrListConfig.defaultProps.theme}
			height={props.height || undefined}
			display={props.display || nostrListConfig.defaultProps.display}
		></nostr-stream>
	{/snippet}</InteractivePlayground
>
