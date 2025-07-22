<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		trigger: Snippet;
		main: Snippet;
	}
	let { trigger, main }: Props = $props();

	let dialog: HTMLDialogElement;

	function openModal() {
		dialog?.showModal();
	}

	function closeModal() {
		dialog?.close();
	}

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === dialog) {
			closeModal();
		}
	}
</script>

<!-- Dialog -->
<dialog
	bind:this={dialog}
	onclick={handleBackdropClick}
	data-dialog
	class="top-1/2 left-1/2 z-10 max-w-[640px] -translate-1/2 space-y-4 rounded-container bg-surface-100-900 p-4 text-inherit backdrop:bg-surface-50/75 dark:backdrop:bg-surface-950/75"
>
	<div data-dialog-content>
		{@render main?.()}
		<button
			type="button"
			onclick={closeModal}
			data-dialog-close
			class="preset-filled-secondary btn"
		>
			Close
		</button>
	</div>
</dialog>

<!-- Interface -->
<div class="flex items-center justify-center">
	<!-- Trigger -->
	{#if trigger}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div onclick={openModal} data-dialog-trigger>
			{@render trigger()}
		</div>
	{:else}
		<button type="button" onclick={openModal} class="btn preset-filled" data-dialog-show>
			Open Modal
		</button>
	{/if}
</div>
