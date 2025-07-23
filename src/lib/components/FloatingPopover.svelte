<script lang="ts">
	import { onMount, onDestroy, untrack, type Snippet } from 'svelte';
	import { computePosition, offset, flip, shift, autoUpdate } from '@floating-ui/dom';
	import { tick } from 'svelte';
	import { fade } from 'svelte/transition'; // ←追加

	interface Props {
		placement?: 'top' | 'bottom' | 'right' | 'left';
		trigger?: Snippet;
		children?: Snippet;
	}

	let { placement = 'top', trigger, children }: Props = $props();

	let open = $state(false);

	// 普通の let で管理し、イベントハンドラで最新値を参照できるようにする
	let triggerEl: HTMLElement | null = null;
	// svelte-ignore non_reactive_update
	let popoverEl: HTMLElement | null = null;

	async function updatePosition() {
		if (!triggerEl || !popoverEl) return;

		const {
			x,
			y,
			placement: resolvedPlacement
		} = await computePosition(triggerEl, popoverEl, {
			placement,
			middleware: [offset(12), flip(), shift()]
		});

		Object.assign(popoverEl.style, {
			left: `${x}px`,
			top: `${y}px`
		});

		// ⬅️ 実際のplacement（top, bottomなど）を属性にセット
		popoverEl.setAttribute('data-placement', resolvedPlacement);
	}
	function toggle() {
		open = !open;
	}

	function onClickOutside(event: MouseEvent) {
		if (!open) return;

		const path = event.composedPath?.() ?? [];

		if ((triggerEl && path.includes(triggerEl)) || (popoverEl && path.includes(popoverEl))) {
			// トリガーかポップオーバー内クリックなら閉じない
			return;
		}

		open = false;
	}

	onMount(() => {
		// triggerEl と popoverEl は初期 null のため、autoUpdate は open時だけ呼ぶようにしたほうが安全
		let autoUpdateCleanup: () => void | undefined;

		const updateAutoUpdate = () => {
			autoUpdateCleanup?.();
			if (triggerEl && popoverEl) {
				autoUpdateCleanup = autoUpdate(triggerEl, popoverEl, updatePosition);
			}
		};

		const observer = new MutationObserver(() => {
			updateAutoUpdate();
		});

		// popoverElの出現消失に合わせてautoUpdateを再設定
		observer.observe(document.body, { childList: true, subtree: true });

		window.addEventListener('click', onClickOutside, { capture: true });

		onDestroy(() => {
			autoUpdateCleanup?.();
			observer.disconnect();
			window.removeEventListener('click', onClickOutside, { capture: true });
		});
	});

	$effect(() => {
		if (open) {
			untrack(() => {
				tick().then(updatePosition);
				tick().then(updatePosition);
			});
		}
	});
</script>

<div class="popover-wrapper" style="position: relative; display: inline-block;">
	<!-- トリガースロット -->
	<button
		type="button"
		bind:this={triggerEl}
		onclick={toggle}
		style="display: inline-block;    vertical-align: text-bottom; cursor: pointer;"
	>
		{@render trigger?.()}
	</button>

	{#if open}
		<div
			bind:this={popoverEl}
			class="floating-popover"
			transition:fade={{ duration: 150 }}
			data-placement={placement}
			role="tooltip"
			tabindex="-1"
		>
			{@render children?.()}
		</div>
	{/if}
</div>

<style>
	.floating-popover {
		position: absolute;
		z-index: 100;
		min-width: 14rem;

		background: var(--color-surface-50-950);
		padding: 0.75rem;
		border-radius: 6px;
		font-size: 0.75rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		border: 1px solid var(--color-primary-200-800);
		max-width: 260px;
		white-space: normal;
	}
	.floating-popover::after {
		content: '';
		position: absolute;
		width: 0;
		height: 0;
		border-style: solid;
	}

	/* top（下向き矢印） */
	.floating-popover[data-placement='top']::after {
		bottom: -6px;
		left: calc(50% - 6px);
		border-width: 6px 6px 0 6px;
		border-color: var(--color-primary-200-800) transparent transparent transparent;
	}

	/* bottom（上向き矢印） */
	.floating-popover[data-placement='bottom']::after {
		top: -6px;
		left: calc(50% - 6px);
		border-width: 0 6px 6px 6px;
		border-color: transparent transparent var(--color-primary-200-800) transparent;
	}

	/* left（右向き矢印） */
	.floating-popover[data-placement='left']::after {
		right: -6px;
		top: calc(50% - 6px);
		border-width: 6px 0 6px 6px;
		border-color: transparent transparent transparent var(--color-primary-200-800);
	}

	/* right（左向き矢印） */
	.floating-popover[data-placement='right']::after {
		left: -6px;
		top: calc(50% - 6px);
		border-width: 6px 6px 6px 0;
		border-color: transparent var(--color-primary-200-800) transparent transparent;
	}
</style>
