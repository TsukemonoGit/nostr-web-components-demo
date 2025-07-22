<script lang="ts">
	import LightSwitch from '$lib/components/LightSwitch.svelte';
	import '../app.css';

	let { children } = $props();
	let isMenuOpen = $state(false);
	const toggleMenu = () => (isMenuOpen = !isMenuOpen);
</script>

<div class="grid h-screen grid-rows-[auto_1fr_auto]">
	<!-- Header -->
	<header class="bg-red-500 p-4">
		<div class="flex items-center justify-between">
			<!-- 左：モバイルメニュー + タイトル -->
			<div class="flex items-center gap-4">
				<!-- モバイルのみメニューボタン -->
				<button class="md:hidden" onclick={toggleMenu} aria-label="Toggle menu">
					<span class="text-xl font-bold">≡</span>
				</button>

				<!-- タイトル -->
				<h1 class="text-lg font-bold text-white">Nostr Web Components</h1>
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
			class={`overflow-y-auto bg-yellow-500 p-4 
				md:static md:block
				${isMenuOpen ? 'absolute top-0 left-0 z-20 block h-full w-64' : 'hidden'}
			`}
		>
			<!-- モバイルメニュー上部 -->
			<div class="mb-4 flex items-center justify-between md:hidden">
				<span class="font-bold">Menu</span>
				<button onclick={toggleMenu}>✕</button>
			</div>

			<nav>
				<ul class="space-y-2">
					<li><a href="#">Item 1</a></li>
					<li><a href="#">Item 2</a></li>
				</ul>
			</nav>
		</aside>

		<!-- Main Content -->
		<main class="space-y-4 overflow-y-auto bg-green-500 p-4">
			{@render children()}
		</main>
	</div>

	<!-- Footer -->
	<footer class="bg-blue-500 p-4 text-center">(footer)</footer>
</div>
