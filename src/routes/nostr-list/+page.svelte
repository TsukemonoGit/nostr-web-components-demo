<script lang="ts">
	import InteractivePlayground from '$lib/components/InteractivePlayground.svelte';

	// nostr-list専用の設定
	const nostrListConfig = {
		title: 'インタラクティブプレイグラウンド',
		description: 'プロパティを変更して見た目を試してみてください',
		componentTag: 'nostr-list',
		defaultProps: {
			filters: `[{"authors":["84b0c46ab699ac35eb2ca286470b85e081db2087cdef63932236c397417782f5"]}]`,
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
				label: 'List filters',
				type: 'text' as const,
				placeholder:
					'[{"authors":["84b0c46ab699ac35eb2ca286470b85e081db2087cdef63932236c397417782f5"]}]'
			},
			{
				key: 'limit',
				label: 'Limit',
				type: 'text' as const,
				placeholder: '10'
			},
			{
				key: 'relays',
				label: 'Relays (カンマ区切り)',
				type: 'text' as const,
				placeholder: 'wss://relay1.com,wss://relay2.com'
			},
			{
				key: 'href',
				label: 'カスタムURL',
				type: 'text' as const,
				placeholder: 'https://example.com'
			},
			{
				key: 'target',
				label: 'Target',
				type: 'select' as const,
				options: [
					{ value: '_blank', label: '_blank' },
					{ value: '_self', label: '_self' },
					{ value: '_parent', label: '_parent' },
					{ value: '_top', label: '_top' }
				]
			},
			{
				key: 'theme',
				label: 'Theme',
				type: 'select' as const,
				options: [
					{ value: 'auto', label: 'auto' },
					{ value: 'light', label: 'light' },
					{ value: 'dark', label: 'dark' }
				]
			},
			{
				key: 'display',
				label: 'Display',
				type: 'select' as const,
				options: [
					{ value: 'card', label: 'card' },
					{ value: 'compact', label: 'compact' }
				]
			},

			{
				key: 'height',
				label: 'Height',
				type: 'text' as const,
				placeholder: '400px'
			},
			{
				key: 'noLink',
				label: 'リンクを無効化 (noLink)',
				type: 'checkbox' as const
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
			if (props.theme !== 'auto') attributes.push(`theme="${props.theme}"`);
			if (props.display !== 'list') attributes.push(`display="${props.display}"`);
			if (props.limit && props.limit !== '10') attributes.push(`limit={${props.limit}}`);
			if (props.display !== 'card') attributes.push(`display="${props.display}"`);

			return `<nostr-list\n  ${attributes.join('\n  ')}\n></nostr-list>`;
		}
	};
</script>

<InteractivePlayground config={nostrListConfig}
	>{#snippet preview(props)}
		<nostr-list
			filters={props.filters || nostrListConfig.defaultProps.filters}
			limit={props.limit ? parseInt(props.limit) : nostrListConfig.defaultProps.limit}
			relays={props.relays
				? props.relays.split(',').map((r: string) => r.trim())
				: nostrListConfig.defaultProps.relays.split(',').map((r) => r.trim())}
			href={props.href || undefined}
			target={props.target || nostrListConfig.defaultProps.target}
			noLink={props.noLink || nostrListConfig.defaultProps.noLink}
			theme={props.theme || nostrListConfig.defaultProps.theme}
			height={props.height || undefined}
			display={props.display || nostrListConfig.defaultProps.display}
		></nostr-list>
	{/snippet}</InteractivePlayground
>
