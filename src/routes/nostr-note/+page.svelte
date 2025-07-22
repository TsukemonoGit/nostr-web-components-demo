<script lang="ts">
	import { theme } from '$lib/runes/runes.svelte';
	import { t } from '@konemono/svelte5-i18n';

	// プレイグラウンド用のプロパティ
	let playgroundProps = $state({
		id: 'nevent1qvzqqqqqqypzpp9sc34tdxdvxh4jeg5xgu9ctcypmvsg0n00vwfjydkrjaqh0qh4qyxhwumn8ghj77tpvf6jumt9qyv8wumn8ghj7un9d3shjtnddakk7um5wgh8q6twdvqzq673ld76k3sn9nuflzqxgyz2ht9lkh0a3qun9vxv7frfhsv4pvsph7jzvj',
		relays: 'wss://relay.damus.io,wss://nos.lol',
		href: '',
		target: '_blank',
		noLink: false,
		className: '',
		theme: 'auto',
		height: '',
		display: 'card'
	});

	// コード生成用の関数
	function generateCode(props: typeof playgroundProps) {
		let attributes: string[] = [`id="${props.id}"`];

		if (props.relays) {
			const relaysArray = props.relays
				.split(',')
				.map((r) => `"${r.trim()}"`)
				.join(', ');
			attributes.push(`relays={[${relaysArray}]}`);
		}
		if (props.href) attributes.push(`href="${props.href}"`);
		if (props.target !== '_blank') attributes.push(`target="${props.target}"`);
		if (props.noLink) attributes.push(`noLink={true}`);
		if (props.className) attributes.push(`className="${props.className}"`);
		if (props.theme !== 'auto') attributes.push(`theme="${props.theme}"`);
		if (props.height) attributes.push(`height="${props.height}"`);
		if (props.display !== 'card') attributes.push(`display="${props.display}"`);

		return `<nostr-note\n  ${attributes.join('\n  ')}\n></nostr-note>`;
	}

	$effect(() => {
		console.log('Props updated:', playgroundProps);
	});
</script>

<h2 class="text-center h2">nostr-note コンポーネント説明とデモ</h2>

<section class="demo-section p-2 sm:p-8">
	<h3 class="h3">主なプロパティ</h3>
	<ul>
		<li><strong>id</strong>: 表示するNostrイベントのID（必須）</li>
		<li><strong>relays</strong>: 取得に使うRelayのURL配列（省略可）</li>
		<li><strong>href</strong>: イベントリンクのURL（省略時は自動生成）</li>
		<li><strong>target</strong>: リンクのターゲット属性（例: "_blank"）</li>
		<li><strong>noLink</strong>: trueにするとリンク表示を無効化</li>
		<li><strong>className</strong>: コンテナに付与するクラス名</li>
		<li><strong>theme</strong>: "auto"（デフォルト）/ "dark" / "light"</li>
		<li><strong>height</strong>: 表示高さ（任意）</li>
		<li><strong>display</strong>: 表示スタイル。"card"(デフォルト) / "compact"</li>
	</ul>
</section>

<!-- インタラクティブプレイグラウンド -->
<section class="playground-section p-2 sm:p-8">
	<h2 class="text-center h2">🎮 インタラクティブプレイグラウンド</h2>
	<p class="mb-6 text-center">プロパティを変更して見た目を試してみてください</p>

	<div class="playground-container">
		<div class="controls-panel">
			<h3 class="mb-4 h3">プロパティ設定</h3>

			<div class="control-group">
				<label for="pg-id">Event ID</label>
				<input
					id="pg-id"
					bind:value={playgroundProps.id}
					placeholder="nevent1..."
					class="control-input"
				/>
			</div>

			<div class="control-group">
				<label for="pg-relays">Relays (カンマ区切り)</label>
				<input
					id="pg-relays"
					bind:value={playgroundProps.relays}
					placeholder="wss://relay1.com,wss://relay2.com"
					class="control-input"
				/>
			</div>

			<div class="control-group">
				<label for="pg-href">カスタムURL</label>
				<input
					id="pg-href"
					bind:value={playgroundProps.href}
					placeholder="https://example.com"
					class="control-input"
				/>
			</div>

			<div class="control-group">
				<label for="pg-target">Target</label>
				<select id="pg-target" bind:value={playgroundProps.target} class="control-select">
					<option value="_blank">_blank</option>
					<option value="_self">_self</option>
					<option value="_parent">_parent</option>
					<option value="_top">_top</option>
				</select>
			</div>

			<div class="control-group">
				<label for="pg-theme">Theme</label>
				<select id="pg-theme" bind:value={playgroundProps.theme} class="control-select">
					<option value="auto">auto</option>
					<option value="light">light</option>
					<option value="dark">dark</option>
				</select>
			</div>

			<div class="control-group">
				<label for="pg-display">Display</label>
				<select id="pg-display" bind:value={playgroundProps.display} class="control-select">
					<option value="card">card</option>
					<option value="compact">compact</option>
				</select>
			</div>

			<div class="control-group">
				<label for="pg-height">Height</label>
				<input
					id="pg-height"
					bind:value={playgroundProps.height}
					placeholder="400px"
					class="control-input"
				/>
			</div>

			<div class="control-group">
				<label for="pg-className">CSS Class</label>
				<input
					id="pg-className"
					bind:value={playgroundProps.className}
					placeholder="custom-class"
					class="control-input"
				/>
			</div>

			<div class="control-group checkbox-group">
				<label class="checkbox-label">
					<input type="checkbox" bind:checked={playgroundProps.noLink} class="control-checkbox" />
					<span>リンクを無効化 (noLink)</span>
				</label>
			</div>
		</div>

		<div class="preview-panel">
			<h3 class="mb-4 h3">プレビュー</h3>
			<div class="preview-container">
				<nostr-note
					id={playgroundProps.id}
					relays={playgroundProps.relays
						? playgroundProps.relays.split(',').map((r) => r.trim())
						: undefined}
					href={playgroundProps.href || undefined}
					target={playgroundProps.target}
					noLink={playgroundProps.noLink}
					className={playgroundProps.className}
					theme={playgroundProps.theme}
					height={playgroundProps.height || undefined}
					display={playgroundProps.display}
				></nostr-note>
			</div>

			<h4 class="mt-6 mb-2 h4">生成されたコード</h4>
			<div class="code-container">
				<pre><code>{generateCode(playgroundProps)}</code></pre>
				<button
					class="copy-btn"
					onclick={() => navigator.clipboard.writeText(generateCode(playgroundProps))}
				>
					📋 コピー
				</button>
			</div>
		</div>
	</div>
</section>

<section class="demo-section p-2 sm:p-8">
	<h2 class="text-center h2">{$t('demo.title')}</h2>
	<div class="demo-container">
		<div class="demo-item">
			<h4 class="h4">標準表示</h4>
			<nostr-note
				id="nevent1qvzqqqqqqypzpp9sc34tdxdvxh4jeg5xgu9ctcypmvsg0n00vwfjydkrjaqh0qh4qyxhwumn8ghj77tpvf6jumt9qyv8wumn8ghj7un9d3shjtnddakk7um5wgh8q6twdvqzq673ld76k3sn9nuflzqxgyz2ht9lkh0a3qun9vxv7frfhsv4pvsph7jzvj"
			></nostr-note>

			<h5 class="mt-2 h5">code</h5>
			<pre><code
					>&lt;nostr-note id="nevent1qvzqqqqqqypzpp9sc34tdxdvxh4jeg5xgu9ctcypmvsg0n00vwfjydkrjaqh0qh4qyxhwumn8ghj77tpvf6jumt9qyv8wumn8ghj7un9d3shjtnddakk7um5wgh8q6twdvqzq673ld76k3sn9nuflzqxgyz2ht9lkh0a3qun9vxv7frfhsv4pvsph7jzvj"&gt;&lt;/nostr-note&gt;</code
				></pre>
		</div>
		<div class="demo-item">
			<h4 class="h4">ダークテーマ・コンパクト表示</h4>
			<nostr-note
				theme={theme.get()}
				display="compact"
				id="nevent1qvzqqqqqqypzpp9sc34tdxdvxh4jeg5xgu9ctcypmvsg0n00vwfjydkrjaqh0qh4qyxhwumn8ghj77tpvf6jumt9qyv8wumn8ghj7un9d3shjtnddakk7um5wgh8q6twdvqzq673ld76k3sn9nuflzqxgyz2ht9lkh0a3qun9vxv7frfhsv4pvsph7jzvj"
			></nostr-note>

			<h5 class="mt-2 h5">code</h5>
			<pre><code
					>&lt;nostr-note theme="dark" display="compact" id="nevent1qvzqqqqqqypzpp9sc34tdxdvxh4jeg5xgu9ctcypmvsg0n00vwfjydkrjaqh0qh4qyxhwumn8ghj77tpvf6jumt9qyv8wumn8ghj7un9d3shjtnddakk7um5wgh8q6twdvqzq673ld76k3sn9nuflzqxgyz2ht9lkh0a3qun9vxv7frfhsv4pvsph7jzvj"&gt;&lt;/nostr-note&gt;</code
				></pre>
		</div>
	</div>
</section>

<style>
	section {
		margin-bottom: 3rem;
		padding: 1.5rem 1rem;
		border-radius: 0.75rem;
		background-color: var(--surface-100-900);
		box-shadow: 0 1px 4px rgb(0 0 0 / 0.05);
	}

	.playground-section {
		background: var(--color-surface-50-950);
		border: 2px solid var(--color-primary-500);
		border-radius: 16px;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
	}

	.playground-container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
		margin-top: 2rem;
	}

	@media (max-width: 768px) {
		.playground-container {
			grid-template-columns: 1fr;
		}
	}

	.controls-panel {
		background: var(--surface-200-800);
		padding: 1.5rem;
		border-radius: 12px;
		height: fit-content;
		position: sticky;
		top: 1rem;
	}

	.preview-panel {
		background: var(--surface-100-900);
		padding: 1.5rem;
		border-radius: 12px;
	}

	.control-group {
		margin-bottom: 1.5rem;
	}

	.control-group label {
		display: block;
		font-weight: 600;
		color: var(--surface-900-50);
		margin-bottom: 0.5rem;
		font-size: 0.875rem;
	}

	.control-input,
	.control-select {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid var(--surface-300-700);
		border-radius: 6px;
		background: var(--surface-50-950);
		color: var(--surface-900-50);
		font-size: 0.875rem;
		transition: border-color 0.2s ease;
	}

	.control-input:focus,
	.control-select:focus {
		outline: none;
		border-color: var(--color-primary-500);
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
	}

	.checkbox-group {
		display: flex;
		align-items: center;
	}

	.checkbox-label {
		display: flex;
		align-items: center;
		cursor: pointer;
		font-weight: 500;
	}

	.control-checkbox {
		margin-right: 0.75rem;
		transform: scale(1.1);
	}

	.preview-container {
		min-height: 200px;
		padding: 1rem;
		border: 2px dashed var(--surface-300-700);
		border-radius: 8px;
		background: var(--surface-50-950);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.code-container {
		position: relative;
		background: var(--surface-200-800);
		border-radius: 8px;
		padding: 1rem;
		overflow-x: auto;
	}

	.code-container pre {
		margin: 0;
		font-size: 0.8rem;
		line-height: 1.4;
	}

	.copy-btn {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		background: var(--color-primary-600);
		color: white;
		border: none;
		padding: 0.5rem 1rem;
		border-radius: 4px;
		cursor: pointer;
		font-size: 0.75rem;
		font-weight: 500;
		transition: background-color 0.2s ease;
	}

	.copy-btn:hover {
		background: var(--color-primary-700);
	}

	ul {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin: 0;
		padding: 1em 0;
	}

	li {
		background-color: var(--surface-100-900);
		border: 1px solid var(--surface-200-800);
		border-radius: 0.75rem;
		padding: 0.75rem 1rem;
		font-size: 0.95rem;
		line-height: 1.6;
		color: var(--surface-900-50);
		box-shadow: 0 1px 2px rgb(0 0 0 / 0.05);
	}

	li strong {
		font-size: 0.875rem;
		font-weight: 700;
		color: var(--color-primary-700-300);
		display: inline-block;
		min-width: 6rem;
	}

	nostr-note {
		display: block;
		max-width: 650px;
		margin-top: 1rem;
		border-radius: 0.75rem;
		box-shadow: 0 4px 12px rgb(0 0 0 / 0.08);
		background-color: var(--surface-50-950);
		transition: box-shadow 0.25s ease;
	}

	.demo-section {
		background: var(--color-surface-50-950);
		border-radius: 16px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
	}

	.demo-container {
		background: var(--color-surface-50-950);
		border-radius: 12px;
		padding: 2rem;
		border: 2px dashed var(--color-surface-300-700);
	}

	.demo-item {
		margin-bottom: 3rem;
	}

	.demo-item:last-child {
		margin-bottom: 0;
	}
</style>
