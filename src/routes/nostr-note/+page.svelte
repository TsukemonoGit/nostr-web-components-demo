<script lang="ts">
	import InteractivePlayground from '$lib/components/InteractivePlayground.svelte';

	import { resolveToNoteId } from '$lib/utils/utils';

	// プレイグラウンド用のプロパティ
	let playgroundProps = $state({
		id: 'nevent1qvzqqqqqqypzpp9sc34tdxdvxh4jeg5xgu9ctcypmvsg0n00vwfjydkrjaqh0qh4qyxhwumn8ghj77tpvf6jumt9qyv8wumn8ghj7un9d3shjtnddakk7um5wgh8q6twdvqzq673ld76k3sn9nuflzqxgyz2ht9lkh0a3qun9vxv7frfhsv4pvsph7jzvj',
		relays: 'wss://nfrelay.app,wss://nos.lol',
		href: '',
		target: '_blank',
		noLink: false,
		theme: 'auto',
		height: '',
		display: 'card'
	});

	/* 	$effect(() => {
		console.log('Props updated:', playgroundProps);
	}); */

	const nostrNoteConfig = {
		title: 'インタラクティブプレイグラウンド',
		description: 'プロパティを変更して見た目を試してみてください',
		componentTag: 'nostr-note',
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
				label: 'Event ID',
				type: 'text' as const, // ←ここを明示的に as const でリテラル型に
				placeholder: 'nevent1...',
				help: '表示するNostrイベントのID（note1~,nevent1~）（必須）'
			},
			{
				key: 'relays',
				label: 'Relays (カンマ区切り)',
				type: 'text' as const,
				placeholder: 'wss://relay1.com,wss://relay2.com',
				help: '取得に使うRelayのURL配列（省略可）'
			},
			{
				key: 'href',
				label: 'カスタムURL',
				type: 'text' as const,
				placeholder: 'https://example.com',
				help: 'イベントリンクのURL（省略時は自動生成）'
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
				help: 'リンクのターゲット属性（例: "_blank"）'
			},
			{
				key: 'noLink',
				label: 'リンクを無効化 (noLink)',
				type: 'checkbox' as const,
				help: 'trueにするとリンク表示を無効化'
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
				help: '"auto"（デフォルト）/ "dark" / "light"'
			},
			{
				key: 'height',
				label: 'Height',
				type: 'text' as const,
				placeholder: '400px',
				help: '表示高さ（任意）'
			},
			{
				key: 'display',
				label: 'Display',
				type: 'select' as const,
				options: [
					{ value: 'card', label: 'card' },
					{ value: 'compact', label: 'compact' }
				],
				help: '表示スタイル。"card"(デフォルト) / "compact"'
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

<h2 class="text-center h2">nostr-note コンポーネント説明とデモ</h2>

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
	section {
		margin-bottom: 3rem;
		padding: 1.5rem 1rem;
		border-radius: 0.75rem;
		background-color: var(--color-surface-100-900);
		box-shadow: 0 1px 4px rgb(0 0 0 / 0.05);
	}

	ul {
		display: flex;
		flex-direction: column;

		gap: 1rem;
		margin: 0;
		padding: 1em 0;
	}

	li {
		background-color: var(--color-surface-100-900);
		border: 1px solid var(--color-surface-200-800);
		border-radius: 0.75rem;
		padding: 0.75rem 1rem;
		font-size: 0.95rem;
		line-height: 1.6;
		color: var(--color-surface-900-50);
		box-shadow: 0 1px 2px rgb(0 0 0 / 0.05);
	}

	li strong {
		font-size: 0.875rem;
		font-weight: 700;
		color: var(--color-primary-700-300);
		display: inline-block;
		min-width: 5rem;
	}

	nostr-note {
		display: block;
		max-width: 650px;
		margin-top: 1rem;
		border-radius: 0.75rem;
		box-shadow: 0 4px 12px rgb(0 0 0 / 0.08);
		background-color: var(--color-surface-50-950);
		transition: box-shadow 0.25s ease;
	}

	.demo-section {
		background: var(--color-surface-50-950);
		border-radius: 16px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
	}
</style>
