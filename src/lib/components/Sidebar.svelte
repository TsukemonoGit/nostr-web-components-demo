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
	class="fixed top-0 left-0 z-10 m-0 h-full max-h-none w-42 max-w-none space-y-4 bg-surface-100-900 p-4 text-inherit backdrop:bg-surface-50/75 dark:backdrop:bg-surface-950/75"
>
	<div data-dialog-content class="flex h-full flex-col">
		<!-- Header with close button -->
		<div class="border-surface-300-600 mb-4 flex items-center justify-between border-b pb-2">
			<h4 class="h4">Menu</h4>
			<button
				type="button"
				onclick={closeModal}
				data-dialog-close
				class="hover:bg-surface-200-700 rounded-full p-2 transition-colors duration-200"
				aria-label="Close sidebar"
			>
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="m18 6-12 12"></path>
					<path d="m6 6 12 12"></path>
				</svg>
			</button>
		</div>

		<!-- Main content area -->
		<div class="flex-1 overflow-y-auto">
			{@render main?.()}
		</div>
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
