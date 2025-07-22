<script lang="ts">
	import { browser } from '$app/environment';
	import type { Snippet } from 'svelte';

	interface PlaygroundConfig<T = Record<string, any>> {
		title: string;
		description?: string;
		componentTag: string;
		defaultProps: T;
		propConfigs: PropConfig[];
		generateCode: (props: T) => string;
	}

	interface PropConfig {
		key: string;
		label: string;
		type: 'text' | 'select' | 'checkbox' | 'textarea';
		placeholder?: string;
		options?: Array<{ value: any; label: string }>;
	}

	let {
		config,
		preview
	}: {
		config: PlaygroundConfig;
		preview: Snippet<[Record<string, any>]>;
	} = $props();

	let playgroundProps = $state({ ...config.defaultProps });

	// 動的にコンポーネント属性を生成する関数
	function generateComponentProps() {
		const props: Record<string, any> = {};

		for (const [key, value] of Object.entries(playgroundProps)) {
			if (value !== undefined && value !== '' && value !== config.defaultProps[key]) {
				props[key] = value;
			}
		}

		return props;
	}
</script>

<section class="playground-section p-2 sm:p-8">
	<h2 class="text-center h2">🎮 {config.title}</h2>
	{#if config.description}
		<p class="mb-6 text-center">{config.description}</p>
	{/if}

	<div class="grid grid-rows-[auto_auto] gap-4 md:grid-cols-2">
		<div class="controls-panel">
			<h3 class="mb-4 h3">プロパティ設定</h3>

			{#each config.propConfigs as propConfig}
				<div class="control-group">
					<label for="pg-{propConfig.key}">{propConfig.label}</label>

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
						<label class="checkbox-label">
							<input
								type="checkbox"
								bind:checked={playgroundProps[propConfig.key]}
								class="control-checkbox"
							/>
							<span>{propConfig.label}</span>
						</label>
					{/if}
				</div>
			{/each}
		</div>

		<div class="preview-panel">
			<h3 class="mb-4 h3">プレビュー</h3>
			<div class="preview-container">
				{#if browser}
					{@render preview(generateComponentProps())}
				{/if}
			</div>

			<h4 class="mt-6 mb-2 h4">生成されたコード</h4>
			<div class="code-container">
				<pre><code>{config.generateCode(playgroundProps)}</code></pre>
				<button
					class="copy-btn"
					onclick={() => navigator.clipboard.writeText(config.generateCode(playgroundProps))}
				>
					📋 コピー
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
</style>
