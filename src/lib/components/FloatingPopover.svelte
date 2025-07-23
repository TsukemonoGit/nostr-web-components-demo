<script lang="ts">
	import { onMount, onDestroy, untrack, type Snippet } from 'svelte';
	import {
		computePosition,
		offset,
		flip,
		shift,
		autoUpdate,
		type Placement
	} from '@floating-ui/dom';
	import { tick } from 'svelte';
	import { fade } from 'svelte/transition';
	import { browser } from '$app/environment';

	interface Props {
		placement?: Placement;
		trigger?: Snippet;
		children?: Snippet;
		disabled?: boolean;
		offset?: number;
		duration?: number;
	}

	let {
		placement = 'top',
		trigger,
		children,
		disabled = false,
		offset: offsetValue = 12,
		duration = 150
	}: Props = $props();

	let open = $state(false);
	let triggerEl = $state<HTMLElement | null>(null);
	let popoverEl = $state<HTMLElement | null>(null);
	let cleanup: (() => void) | null = null;

	const updatePosition = async (): Promise<void> => {
		if (!triggerEl || !popoverEl) return;

		try {
			const {
				x,
				y,
				placement: resolvedPlacement
			} = await computePosition(triggerEl, popoverEl, {
				placement,
				middleware: [offset(offsetValue), flip(), shift({ padding: 8 })]
			});

			Object.assign(popoverEl.style, {
				left: `${x}px`,
				top: `${y}px`
			});

			popoverEl.setAttribute('data-placement', resolvedPlacement);
		} catch (error) {
			console.warn('Position update failed:', error);
		}
	};

	const toggle = (): void => {
		if (disabled) return;
		open = !open;
	};

	const close = (): void => {
		open = false;
	};

	const handleClickOutside = (event: Event): void => {
		if (!open || !browser) return;

		const target = event.target as Element;
		if (!target) return;

		// ポップオーバー内のクリックは無視
		if (popoverEl?.contains(target)) {
			return;
		}

		// トリガー内のクリックは無視（toggleで処理される）
		if (triggerEl?.contains(target)) {
			return;
		}

		// その他の場所のクリックで閉じる
		close();
	};

	const handleEscape = (event: KeyboardEvent): void => {
		if (event.key === 'Escape' && open) {
			close();
		}
	};

	const setupAutoUpdate = (): void => {
		cleanup?.();
		if (open && triggerEl && popoverEl) {
			cleanup = autoUpdate(triggerEl, popoverEl, updatePosition);
		}
	};

	onMount(async () => {
		if (!browser) return;

		await tick();
		// スマホ対応：pointerdownを使用してタッチとマウスの両方に対応
		document.addEventListener('pointerdown', handleClickOutside);
		document.addEventListener('keydown', handleEscape);
	});

	onDestroy(() => {
		if (!browser) return;

		cleanup?.();
		document.removeEventListener('pointerdown', handleClickOutside);
		document.removeEventListener('keydown', handleEscape);
	});

	$effect(() => {
		if (open && triggerEl && popoverEl) {
			untrack(() => {
				updatePosition();
				setupAutoUpdate();
			});
		} else {
			cleanup?.();
		}
	});

	$effect(() => {
		return () => cleanup?.();
	});
</script>

<div class="popover-wrapper">
	<button
		type="button"
		bind:this={triggerEl}
		onclick={toggle}
		class="popover-trigger"
		class:disabled
		{disabled}
		aria-expanded={open}
		aria-haspopup="true"
	>
		{@render trigger?.()}
	</button>

	{#if open}
		<div
			bind:this={popoverEl}
			class="floating-popover"
			transition:fade={{ duration }}
			data-placement={placement}
			role="tooltip"
			tabindex="-1"
			aria-live="polite"
		>
			{@render children?.()}
		</div>
	{/if}
</div>

<style>
	.popover-wrapper {
		position: relative;
		display: inline-block;
	}

	.popover-trigger {
		display: inline-block;
		vertical-align: text-bottom;
		cursor: pointer;
		background: none;
		border: none;
		padding: 0;
		margin: 0;
		font: inherit;
		color: inherit;
	}

	.popover-trigger:disabled,
	.popover-trigger.disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}

	.floating-popover {
		position: absolute;
		z-index: 1000;
		min-width: 14rem;
		max-width: 260px;
		background: var(--color-surface-50-950);
		padding: 0.75rem;
		border-radius: 6px;
		font-size: 0.75rem;
		line-height: 1.4;
		box-shadow:
			0 4px 12px rgba(0, 0, 0, 0.15),
			0 0 0 1px var(--color-primary-200-800);
		white-space: normal;
		word-wrap: break-word;
	}

	.floating-popover::after {
		content: '';
		position: absolute;
		width: 0;
		height: 0;
		border-style: solid;
		pointer-events: none;
	}

	/* Arrow styles for different placements */
	.floating-popover[data-placement^='top']::after {
		bottom: -6px;
		left: calc(50% - 6px);
		border-width: 6px 6px 0 6px;
		border-color: var(--color-primary-200-800) transparent transparent transparent;
	}

	.floating-popover[data-placement^='bottom']::after {
		top: -6px;
		left: calc(50% - 6px);
		border-width: 0 6px 6px 6px;
		border-color: transparent transparent var(--color-primary-200-800) transparent;
	}

	.floating-popover[data-placement^='left']::after {
		right: -6px;
		top: calc(50% - 6px);
		border-width: 6px 0 6px 6px;
		border-color: transparent transparent transparent var(--color-primary-200-800);
	}

	.floating-popover[data-placement^='right']::after {
		left: -6px;
		top: calc(50% - 6px);
		border-width: 6px 6px 6px 0;
		border-color: transparent var(--color-primary-200-800) transparent transparent;
	}

	/* Focus styles for accessibility */
	.popover-trigger:focus-visible {
		outline: 2px solid var(--color-primary-500);
		outline-offset: 2px;
	}

	.floating-popover:focus {
		outline: none;
	}
</style>
