<script lang="ts">
	import InteractivePlayground from '$lib/components/InteractivePlayground.svelte';
	import { t } from '@konemono/svelte5-i18n';

	// nostr-profile専用の設定（例）
	const nostrProfileConfig = {
		title: $t('playground.title', { target: 'nostr-profile' }),
		description: $t('playground.description'),

		defaultProps: {
			user: 'mono@tsukemonogit.github.io',
			relays: 'wss://nfrelay.app,wss://nos.lol',
			theme: 'auto',
			height: '',
			display: 'card',
			noLink: false,
			href: '',
			target: '_blank'
		},
		propConfigs: [
			{
				key: 'user',

				type: 'text' as const,
				placeholder: $t('props.user.placeholder'),
				help: $t('props.user.help')
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
				placeholder: '400px',
				help: $t('props.height.help')
			},
			{
				key: 'display',

				type: 'select' as const,
				options: [
					{ value: 'card', label: 'card' },
					{ value: 'compact', label: 'compact' },
					{ value: 'name', label: 'name' }
				],
				help: $t('props.display.help')
			}
		],
		generateCode: (props: any) => {
			let attributes: string[] = [`user="${props.user}"`];

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

			return `<nostr-profile\n  ${attributes.join('\n  ')}\n></nostr-profile>`;
		}
	};
</script>

<InteractivePlayground config={nostrProfileConfig}
	>{#snippet preview(props)}
		<nostr-profile
			user={props.user || nostrProfileConfig.defaultProps.user}
			relays={props.relays
				? props.relays.split(',').map((r: string) => r.trim())
				: nostrProfileConfig.defaultProps.relays.split(',').map((r) => r.trim())}
			href={props.href || undefined}
			target={props.target || nostrProfileConfig.defaultProps.target}
			noLink={props.noLink || nostrProfileConfig.defaultProps.noLink}
			theme={props.theme || nostrProfileConfig.defaultProps.theme}
			height={props.height || undefined}
			display={props.display || nostrProfileConfig.defaultProps.display}
		></nostr-profile>
	{/snippet}</InteractivePlayground
>
