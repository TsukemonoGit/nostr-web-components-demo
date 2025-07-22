<script lang="ts">
	import '$lib/i18n/index.ts';
	import LightSwitch from '$lib/components/LightSwitch.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import SideMenu from '$lib/components/SideMenu.svelte';
	import '../app.css';

	let { children } = $props();
	let isMenuOpen = $state(false);
	const toggleMenu = () => (isMenuOpen = !isMenuOpen);
</script>

<div class="grid h-screen grid-rows-[auto_1fr_auto]">
	<!-- Header -->
	<header class="bg-surface-100-900 p-4">
		<div class="flex items-center justify-between">
			<!-- 左：モバイルメニュー + タイトル -->
			<div class="flex items-center gap-4 text-surface-950-50">
				<!-- モバイルのみメニューボタン -->
				<Sidebar
					>{#snippet trigger()}
						<button class="md:hidden" onclick={toggleMenu} aria-label="Toggle menu">
							<span class="text-xl font-bold">≡</span>
						</button>{/snippet}
					{#snippet main()}
						<SideMenu />
					{/snippet}
				</Sidebar>
				<!-- タイトル -->
				<h1 class="text-lg font-bold">
					<a href="/" class=" hover:underline"> Nostr Web Components </a>
				</h1>
			</div>

			<!-- 右：ライトスイッチ -->
			<div>
				<LightSwitch />
			</div>
		</div>
	</header>
	<!-- Main layout: sidebar + content -->
	<div class="grid grid-cols-1 overflow-hidden md:grid-cols-[200px_1fr]">
		<!-- Sidebar -->
		<aside
			class={`hidden overflow-y-auto border-r border-dashed border-surface-300-700 
				p-4 md:static md:block
				`}
		>
			<SideMenu />
		</aside>

		<!-- Main Content -->
		<main class="space-y-4 overflow-y-auto p-4">
			{@render children()}
		</main>
	</div>

	<!-- Footer -->
	<footer class="bg-blue-500 p-4 text-center">(footer)</footer>
</div>
