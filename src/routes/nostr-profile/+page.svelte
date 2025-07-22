<script lang="ts">
	import InteractivePlayground from '$lib/components/InteractivePlayground.svelte';

	// nostr-profile専用の設定（例）
	const nostrProfileConfig = {
		title: 'インタラクティブプレイグラウンド',
		description: 'プロパティを変更して見た目を試してみてください',
		componentTag: 'nostr-profile',
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
				label: 'Public Key or nip05adress',
				type: 'text' as const,
				placeholder: 'npub1...'
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
					{ value: 'compact', label: 'compact' },
					{ value: 'name', label: 'name' }
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
