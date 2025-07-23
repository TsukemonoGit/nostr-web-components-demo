<script lang="ts">
	import InteractivePlayground from '$lib/components/InteractivePlayground.svelte';

	// nostr-naddr専用の設定
	const nostrNaddrConfig = {
		title: 'Nostr Naddr プレイグラウンド',
		description: 'Nostrのnaddr形式のコンテンツプレビューを試せます',
		componentTag: 'nostr-naddr',
		customInstructions:
			'📍 アドレス指定（naddr）または🔧 個別指定（user + kind + id ）のどちらか一方を設定してください',
		groupTitles: {
			address: '📍 アドレス指定 (オプション1)',
			components: '🔧 個別指定 (オプション2)',
			other: '⚙️ その他の設定'
		},
		groupDescriptions: {
			address: 'naddr形式でアドレスを直接指定',
			components: 'user、kind、idを個別に指定（user、kind必須）',
			other: '表示やリンクの設定'
		},
		defaultProps: {
			naddr: '',
			user: 'mono@tsukemonogit.github.io',
			id: 'monomoji',
			kind: '30003',
			relays: 'wss://nfrelay.app,wss://nos.lol',
			itemsPerPage: 3,
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
				label: 'Naddr (オプション1)',
				type: 'text' as const,
				placeholder: 'naddr1...',
				group: 'address'
			},
			{
				key: 'user',
				label: 'User (pubkey) - オプション2',
				type: 'text' as const,
				placeholder: 'npub1... または hex形式',
				group: 'components'
			},

			{
				key: 'kind',
				label: 'Kind - オプション2',
				type: 'text' as const,
				placeholder: '30023',
				group: 'components'
			},
			{
				key: 'id',
				label: 'ID (dtag/identifier) - オプション2',
				type: 'text' as const,
				placeholder: 'article-title-example',
				group: 'components'
			},
			{
				key: 'itemsPerPage',
				label: 'itemsPerPage',
				type: 'text' as const,
				placeholder: '10',
				group: 'other'
			},
			{
				key: 'relays',
				label: 'Relays (カンマ区切り)',
				type: 'text' as const,
				placeholder: 'wss://relay1.com,wss://relay2.com',
				group: 'other'
			},
			{
				key: 'href',
				label: 'カスタムURL',
				type: 'text' as const,
				placeholder: 'https://example.com',
				group: 'other'
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
				],
				group: 'other'
			},
			{
				key: 'theme',
				label: 'Theme',
				type: 'select' as const,
				options: [
					{ value: 'auto', label: 'auto' },
					{ value: 'light', label: 'light' },
					{ value: 'dark', label: 'dark' }
				],
				group: 'other'
			},
			{
				key: 'display',
				label: 'Display',
				type: 'select' as const,
				options: [
					{ value: 'card', label: 'card' },
					{ value: 'compact', label: 'compact' }
				],
				group: 'other'
			},
			{
				key: 'height',
				label: 'Height',
				type: 'text' as const,
				placeholder: '400px',
				group: 'other'
			},
			{
				key: 'noLink',
				label: 'リンクを無効化 (noLink)',
				type: 'checkbox' as const,
				group: 'other'
			}
		],
		generateCode: (props: any) => {
			let attributes: string[] = [];

			// naddrまたはuser/id/kindのいずれかを設定
			if (props.naddr) {
				attributes.push(`naddr="${props.naddr}"`);
			} else {
				if (props.user) attributes.push(`user="${props.user}"`);
				if (props.id) attributes.push(`id="${props.id}"`);
				if (props.kind) attributes.push(`kind="${props.kind}"`);
			}
			if (props.itemsPerPage) attributes.push(`itemsPerPage="${props.itemsPerPage}"`);
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
		},
		// プレビュー用の変換関数
		transformPropsForPreview: (props: any, defaultProps: any) => {
			const previewProps: any = {};

			// naddrまたはdefaultのnaddrを使用
			previewProps.naddr = props.naddr || defaultProps.naddr;

			// user/id/kindが全て設定されている場合のみ適用
			if (props.user && props.kind) {
				previewProps.user = props.user;

				previewProps.kind = props.kind;
				previewProps.id = props.id || '';
				previewProps.naddr = undefined; // naddrは無視
			}

			// relaysの処理
			if (props.relays) {
				previewProps.relays = props.relays.split(',').map((r: string) => r.trim());
			} else {
				previewProps.relays = defaultProps.relays.split(',').map((r: string) => r.trim());
			}

			// その他のプロパティ
			previewProps.href = props.href || undefined;
			previewProps.target = props.target || defaultProps.target;
			previewProps.noLink = props.noLink || defaultProps.noLink;
			previewProps.theme = props.theme || defaultProps.theme;
			previewProps.height = props.height || undefined;
			previewProps.display = props.display || defaultProps.display;
			previewProps.itemsPerPage = props.itemsPerPage || defaultProps.itemsPerPage;
			return previewProps;
		}
	};
</script>

<InteractivePlayground config={nostrNaddrConfig}>
	{#snippet preview(props)}
		<nostr-naddr
			naddr={props.naddr}
			user={props.user}
			id={props.id}
			kind={props.kind}
			relays={props.relays}
			href={props.href}
			target={props.target}
			noLink={props.noLink}
			theme={props.theme}
			height={props.height}
			display={props.display}
			itemsPerPage={props.itemsPerPage}
		></nostr-naddr>
	{/snippet}
</InteractivePlayground>
