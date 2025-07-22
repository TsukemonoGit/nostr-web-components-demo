<script lang="ts">
	import '../app.css';
	let { children } = $props();

	let isMenuOpen = $state(false);
	const toggleMenu = () => (isMenuOpen = !isMenuOpen);
</script>

<div class="grid h-screen grid-rows-[auto_1fr_auto]">
	<!-- Header -->
	<header class="flex items-center justify-between bg-red-500 p-4">
		<span>(header)</span>
		<!-- メニューボタン（モバイルのみ表示） -->
		<button class="md:hidden" onclick={toggleMenu} aria-label="Toggle menu">
			<!-- 任意のアイコンに変更可（≡） -->
			<span class="text-xl font-bold">≡</span>
		</button>
	</header>

	<!-- Grid Columns -->
	<div class="grid grid-cols-1 md:grid-cols-[168px_1fr]">
		<!-- Left Sidebar -->
		<aside
			class={`bg-yellow-500 p-4 
				md:static md:block
				${isMenuOpen ? 'absolute top-0 left-0 z-10 block h-full w-42' : 'hidden'} 
			`}
		>
			<div class="flex items-center justify-between md:hidden">
				<span>Menu</span>
				<button onclick={toggleMenu}>✕</button>
			</div>
			<nav>
				<ul>
					<li><a href="#">Item 1</a></li>
					<li><a href="#">Item 2</a></li>
				</ul>
			</nav>
		</aside>

		<!-- Main Content -->
		<main class="space-y-4 bg-green-500 p-4">
			{@render children()}
		</main>
	</div>

	<!-- Footer -->
	<footer class="bg-blue-500 p-4">(footer)</footer>
</div>
