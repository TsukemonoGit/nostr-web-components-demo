<!--InteractivePlaygound.svelte-->

<script lang="ts">
	import { browser } from '$app/environment';
	import { CircleQuestionMark, RefreshCw } from '@lucide/svelte';
	import { tick, type Snippet } from 'svelte';
	import FloatingPopover from './FloatingPopover.svelte';
	import { t } from '@konemono/svelte5-i18n';

	interface PlaygroundConfig<T = Record<string, any>> {
		title: string;
		description?: string;
		defaultProps: T;
		propConfigs: PropConfig[];
		generateCode: (props: T) => string;
		// 新機能: プレビュー用のpropsを変換する関数（オプション）
		transformPropsForPreview?: (props: T, defaultProps: T) => Record<string, any>;
	}

	interface PropConfig {
		key: string;
		type: 'text' | 'select' | 'checkbox' | 'textarea';
		placeholder?: string;
		options?: Array<{ value: any; label: string }>;
		group?: string;
		help?: string; // ヘルプテキストを追加
	}

	let {
		config,
		preview
	}: {
		config: PlaygroundConfig;
		preview: Snippet<[Record<string, any>]>;
	} = $props();

	let playgroundProps = $state({ ...config.defaultProps });

	// プロパティをグループ別に整理
	const groupedProps = $derived(() => {
		const groups: Record<string, PropConfig[]> = {};

		config.propConfigs.forEach((prop) => {
			const group = prop.group || 'default';
			if (!groups[group]) groups[group] = [];
			groups[group].push(prop);
		});

		return groups;
	});

	// グループタイトル取得
	function getGroupTitle(groupName: string): string {
		const customTitles = (config as any).groupTitles;
		if (customTitles && customTitles[groupName]) return customTitles[groupName];

		switch (groupName) {
			case 'address':
				return $t('group.address.title');
			case 'components':
				return $t('group.components.title');
			case 'other':
				return $t('group.other.title');
			default:
				return '';
		}
	}

	// グループ説明取得
	function getGroupDescription(groupName: string): string {
		const customDescriptions = (config as any).groupDescriptions;
		if (customDescriptions && customDescriptions[groupName]) return customDescriptions[groupName];

		switch (groupName) {
			case 'address':
				return $t('group.address.description');
			case 'components':
				return $t('group.components.description');
			case 'other':
				return $t('group.other.description');
			default:
				return '';
		}
	}

	// 動的にコンポーネント属性を生成する関数
	function generateComponentProps() {
		const props: Record<string, any> = {};

		// すべてのプロパティを含めるが、空文字列やundefinedは除外
		for (const [key, value] of Object.entries(playgroundProps)) {
			if (value !== undefined && value !== null && value !== '') {
				props[key] = value;
			}
		}

		// カスタム変換関数があれば使用
		if (config.transformPropsForPreview) {
			return config.transformPropsForPreview(props, config.defaultProps);
		}

		return props;
	}

	let showPreview = $state(true);

	async function refreshPreview() {
		showPreview = false;
		await tick(); // DOMの更新待ち
		showPreview = true;
	}
</script>

<section class="playground-section p-2 sm:p-8">
	<h2 class="text-center h2">{config.title}</h2>

	{#if config.description}
		<p class="mb-6 text-center">{config.description}</p>
	{/if}

	{#if (config as any).customInstructions}
		<div class="mb-4 rounded-lg bg-yellow-100 p-3 dark:bg-yellow-900">
			<p
				class="text-sm text-yellow-800 dark:text-yellow-200"
				style="white-space: pre-wrap;
		word-break: normal;
		word-break: break-word;"
			>
				<strong>{$t('playground.usageLabel')}</strong>
				{(config as any).customInstructions}
			</p>
		</div>
	{/if}

	<div class="grid grid-rows-[auto_auto] gap-4 md:grid-cols-2">
		<div class="controls-panel">
			<h3 class="mb-4 h3">{$t('playground.propSettings')}</h3>
			{#each Object.entries(groupedProps()) as [groupName, props]}
				<div class="prop-group mb-6">
					<h4 class="group-title">{getGroupTitle(groupName)}</h4>
					{#if getGroupDescription(groupName)}
						<p class="group-description">{getGroupDescription(groupName)}</p>
					{/if}

					{#each props as propConfig}
						<div class="control-group">
							<label for="pg-{propConfig.key}"
								>{propConfig.key}
								{#if propConfig.help}
									<FloatingPopover placement="top">
										{#snippet trigger()}
											<CircleQuestionMark
												class="text-primary-800-200 hover:text-primary-600-400"
												size="20"
											/>
										{/snippet}
										<div style="white-space: pre-wrap;word-break: normal;	word-break: break-word;">
											{propConfig.help}
										</div>
									</FloatingPopover>
								{/if}</label
							>

							{#if propConfig.type === 'text'}
								<input
									id="pg-{propConfig.key}"
									bind:value={playgroundProps[propConfig.key]}
									placeholder={propConfig.placeholder || ''}
									class="control-input"
								/>
							{:else if propConfig.type === 'textarea'}
								<textarea
									id="pg-{propConfig.key}"
									bind:value={playgroundProps[propConfig.key]}
									placeholder={propConfig.placeholder || ''}
									class="control-input"
									rows="3"
								></textarea>
							{:else if propConfig.type === 'select'}
								<select
									id="pg-{propConfig.key}"
									bind:value={playgroundProps[propConfig.key]}
									class="control-select"
								>
									{#each propConfig.options || [] as option}
										<option value={option.value}>{option.label}</option>
									{/each}
								</select>
							{:else if propConfig.type === 'checkbox'}
								<input
									type="checkbox"
									bind:checked={playgroundProps[propConfig.key]}
									class="control-checkbox"
								/>
							{/if}
						</div>
					{/each}
				</div>
			{/each}
		</div>

		<div class="preview-panel">
			<h3 class="mb-4 h3">
				{$t('playground.preview')}
				<button class="refresh-btn" onclick={refreshPreview}>
					<RefreshCw size={20} />{$t('playground.refreshPreview')}
				</button>
			</h3>
			<div class="preview-container">
				{#if browser && showPreview}
					{@render preview(generateComponentProps())}
				{/if}
			</div>

			<h4 class="mt-6 mb-2 h4">{$t('playground.generatedCode')}</h4>
			<div class="code-container">
				<pre><code>{config.generateCode(playgroundProps)}</code></pre>
				<button
					class="copy-btn"
					onclick={() => navigator.clipboard.writeText(config.generateCode(playgroundProps))}
				>
					📋 {$t('playground.copy')}
				</button>
			</div>
		</div>
	</div>
</section>

<style>
	.playground-section {
		margin-bottom: 3rem;
		padding: 1.5rem 1rem;
		background: var(--color-surface-50-950);
		border: 2px solid var(--color-primary-500);
		border-radius: 16px;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
	}

	.controls-panel {
		background: var(--color-surface-100-900);
		padding: 1.5rem;
		border-radius: 12px;
		height: fit-content;
		top: 1rem;
	}

	.preview-panel {
		background: var(--color-surface-100-900);
		padding: 1.5rem;
		border-radius: 12px;
	}

	.control-group {
		margin-bottom: 1.5rem;
	}

	.control-group label {
		display: block;
		font-weight: 600;
		color: var(--color-surface-900-50);
		margin-bottom: 0.5rem;
		font-size: 0.875rem;
	}

	.control-input,
	.control-select {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid var(--color-surface-300-700);
		border-radius: 6px;
		background: var(--color-surface-50-950);
		color: var(--color-surface-900-50);
		font-size: 0.875rem;
		transition: border-color 0.2s ease;
	}

	.control-input:focus,
	.control-select:focus {
		outline: none;
		border-color: var(--color-primary-500);
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
	}

	.control-checkbox {
		margin-right: 0.75rem;
		transform: scale(1.1);
	}

	.preview-container {
		min-height: 200px;
		padding: 1rem;
		border: 2px dashed var(--color-surface-300-700);
		border-radius: 8px;
		background: var(--color-surface-50-950);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.code-container {
		position: relative;
		background: var(--color-surface-200-800);
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

	.prop-group {
		border: 1px solid var(--color-surface-300-700);
		border-radius: 8px;
		padding: 1rem;
		background: var(--color-surface-50-950);
	}

	.group-title {
		font-size: 1rem;
		font-weight: 600;
		color: var(--color-primary-600);
		margin-bottom: 0.5rem;
	}

	.group-description {
		font-size: 0.8rem;
		color: var(--color-surface-700-300);
		margin-bottom: 1rem;
		font-style: italic;
	}
	.refresh-btn {
		display: inline-flex;
		vertical-align: bottom;
		align-items: anchor-center;
		gap: 4px;
		flex-wrap: wrap;
		background: var(--color-primary-500);
		color: white;
		border: none;
		padding: 0.5rem 1rem;
		border-radius: 6px;
		cursor: pointer;
		font-size: 0.875rem;
	}
	.refresh-btn:hover {
		background: var(--color-primary-600);
	}
</style>
