<script lang="ts">
	import InteractivePlayground from '$lib/components/InteractivePlayground.svelte';

	// nostr-naddr専用の設定
	const nostrNaddrConfig = {
		title: 'インタラクティブプレイグラウンド',
		description: 'プロパティを変更して見た目を試してみてください',
		componentTag: 'nostr-naddr',
		defaultProps: {
			naddr:
				'naddr1qvzqqqr4gupzpp9sc34tdxdvxh4jeg5xgu9ctcypmvsg0n00vwfjydkrjaqh0qh4qyxhwumn8ghj77tpvf6jumt9qys8wumn8ghj7un9d3shjtt2wqhxummnw3ezuamfwfjkgmn9wshx5uqpz3mhxue69uhhyetvv9ujuerpd46hxtnfduq3wamnwvaz7tmwdaehgu3wd968gctwd4hjumt9dcq3zamnwvaz7tmwveex2mrp0yhxzursqywhwumn8ghj7mn0wd68ytnrdakhq6tvv5kk2unjdaezumn9wsqq5mt0dehj6ar0dak8xhecf4f',
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
				key: 'naddr',
				label: 'Naddr',
				type: 'text' as const,
				placeholder: 'naddr1...'
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
			let attributes: string[] = [`naddr="${props.naddr}"`];

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

			return `<nostr-naddr\n  ${attributes.join('\n  ')}\n></nostr-naddr>`;
		}
	};
</script>

<InteractivePlayground config={nostrNaddrConfig}
	>{#snippet preview(props)}
		<nostr-naddr
			naddr={props.naddr || nostrNaddrConfig.defaultProps.naddr}
			relays={props.relays
				? props.relays.split(',').map((r: string) => r.trim())
				: nostrNaddrConfig.defaultProps.relays.split(',').map((r) => r.trim())}
			href={props.href || undefined}
			target={props.target || nostrNaddrConfig.defaultProps.target}
			noLink={props.noLink || nostrNaddrConfig.defaultProps.noLink}
			theme={props.theme || nostrNaddrConfig.defaultProps.theme}
			height={props.height || undefined}
			display={props.display || nostrNaddrConfig.defaultProps.display}
		></nostr-naddr>
	{/snippet}</InteractivePlayground
>
