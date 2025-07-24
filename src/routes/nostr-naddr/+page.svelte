<script lang="ts">
	import InteractivePlayground from '$lib/components/InteractivePlayground.svelte';
	import { theme } from '$lib/runes/runes.svelte';
	import { t } from '@konemono/svelte5-i18n';

	// nostr-naddr専用の設定
	let nostrNaddrConfig = $derived({
		title: $t('playground.title', { target: 'nostr-naddr' }),
		description: $t('playground.description'),

		customInstructions: $t('playground.naddr.instructions'),
		groupTitles: {
			address: $t('playground.naddr.groupTitles.address'),
			components: $t('playground.naddr.groupTitles.components'),
			other: $t('playground.naddr.groupTitles.other')
		},
		groupDescriptions: {
			address: $t('playground.naddr.groupDescriptions.address'),
			components: $t('playground.naddr.groupDescriptions.components'),
			other: $t('playground.naddr.groupDescriptions.other')
		},
		defaultProps: {
			naddr: '',
			user: 'mono@tsukemonogit.github.io',
			identifier: 'monomoji',
			kind: '30003',
			relays: 'wss://nfrelay.app,wss://nos.lol',
			itemsPerPage: 3,
			href: '',
			target: '_blank',
			noLink: false,
			theme: 'auto',
			height: '',
			display: 'card',
			sortOrder: 'normal'
		},
		propConfigs: [
			{
				key: 'naddr',

				type: 'text' as const,
				placeholder: $t('props.naddr.placeholder'),
				group: 'address',
				help: $t('props.naddr.help')
			},
			{
				key: 'user',

				type: 'text' as const,
				placeholder: $t('props.user.placeholder'),
				group: 'components',
				help: $t('props.user.help')
			},

			{
				key: 'kind',

				type: 'text' as const,
				placeholder: $t('props.kind.placeholder'),
				group: 'components',
				help: $t('props.kind.help')
			},
			{
				key: 'identifier',

				type: 'text' as const,
				placeholder: $t('props.identifier.placeholder'),
				group: 'components',
				help: $t('props.identifier.help')
			},
			{
				key: 'itemsPerPage',
				placeholder: $t('props.itemsPerPage.placeholder'),
				type: 'text' as const,
				group: 'other',
				help: $t('props.itemsPerPage.help')
			},
			{
				key: 'sortOrder',

				type: 'select' as const,
				options: [
					{ value: 'normal', label: 'normal' },
					{ value: 'reverse', label: 'reverse' }
				],
				group: 'other',
				help: $t('props.sortOrder.help')
			},
			{
				key: 'relays',

				type: 'text' as const,
				placeholder: $t('props.relays.placeholder'),
				help: $t('props.relays.help'),
				group: 'other'
			},
			{
				key: 'href',

				type: 'text' as const,
				placeholder: $t('props.href.placeholder'),
				help: $t('props.href.help'),
				group: 'other'
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
				group: 'other',
				help: $t('props.target.help')
			},
			{
				key: 'noLink',

				type: 'checkbox' as const,
				group: 'other',
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
				group: 'other',
				help: $t('props.theme.help', { site: $t('props.theme.site') })
			},
			{
				key: 'display',

				type: 'select' as const,
				options: [
					{ value: 'card', label: 'card' },
					{ value: 'compact', label: 'compact' }
				],
				group: 'other'
			},
			{
				key: 'height',

				type: 'text' as const,
				placeholder: '400px',
				group: 'other',
				help: $t('props.height.help')
			}
		],
		generateCode: (props: any) => {
			let attributes: string[] = [];

			// naddrまたはuser/identifier/kindのいずれかを設定
			if (props.naddr) {
				attributes.push(`naddr="${props.naddr}"`);
			} else {
				if (props.user) attributes.push(`user="${props.user}"`);
				if (props.identifier) attributes.push(`identifier="${props.identifier}"`);
				if (props.kind) attributes.push(`kind="${props.kind}"`);
			}
			if (props.itemsPerPage) attributes.push(`itemsPerPage="${props.itemsPerPage}"`);
			if (props.sortOrder) attributes.push(`sortOrder="${props.sortOrder}"`);
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
			if (props.height) attributes.push(`height="${props.height}"`);
			if (props.display !== 'card') attributes.push(`display="${props.display}"`);

			return `<nostr-naddr\n  ${attributes.join('\n  ')}\n></nostr-naddr>`;
		},
		// プレビュー用の変換関数
		transformPropsForPreview: (props: any, defaultProps: any) => {
			const previewProps: any = {};

			// naddrまたはdefaultのnaddrを使用
			previewProps.naddr = props.naddr || defaultProps.naddr;

			// user/identifier/kindが全て設定されている場合のみ適用
			if (props.user && props.kind) {
				previewProps.user = props.user;

				previewProps.kind = props.kind;
				previewProps.identifier = props.identifier || '';
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
			previewProps.sortOrder = props.sortOrder || defaultProps.sortOrder;
			return previewProps;
		}
	});
</script>

<InteractivePlayground config={nostrNaddrConfig}>
	{#snippet preview(props)}
		<nostr-naddr
			naddr={props.naddr}
			user={props.user}
			identifier={props.identifier}
			kind={props.kind}
			relays={props.relays}
			href={props.href}
			target={props.target}
			noLink={props.noLink}
			theme={props.theme === 'site' ? theme.get() : props.theme}
			height={props.height}
			display={props.display}
			itemsPerPage={props.itemsPerPage}
			sortOrder={props.sortOrder}
		></nostr-naddr>
	{/snippet}
</InteractivePlayground>
