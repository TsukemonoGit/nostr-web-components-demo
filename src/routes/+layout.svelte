<script lang="ts">
	import '$lib/i18n/index.ts';
	import LightSwitch from '$lib/components/LightSwitch.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import SideMenu from '$lib/components/SideMenu.svelte';
	import '../app.css';
	//import Footer from '$lib/components/Footer.svelte';
	import { base } from '$app/paths';

	let { children } = $props();
	let isMenuOpen = $state(false);
	const toggleMenu = () => (isMenuOpen = !isMenuOpen);
</script>

<svelte:head>
	<title>Nostr Web Components @konemono</title
	><!--ここを{$ogTitle}にするとMenubarの項目をホバーするだけでタイトル変わる謎になる-->

	<meta property="og:title" content={'Nostr Web Components @konemono'} />
	<!--   <meta property="og:image" content={``} /> -->

	<meta
		name="description"
		content={'A component library for easily integrating Nostr protocol into your web applications'}
	/>

	<meta
		property="og:description"
		content={'A component library for easily integrating Nostr protocol into your web applications'}
	/>
</svelte:head>

<div class="grid h-screen grid-rows-[auto_1fr_auto]">
	<!-- Header -->
	<header class="border-b border-surface-300-700 bg-surface-100-900 p-3">
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
				<h1 class="h5 sm:h3">
					<a href={`${base}/`} class="hover:underline"> Nostr Web Components </a>
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

	<!-- Footer 
	<Footer />-->
</div>
