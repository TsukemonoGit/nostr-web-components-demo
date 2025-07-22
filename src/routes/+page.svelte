<script>
	import LightSwitch from '$lib/components/LightSwitch.svelte';
	import { theme } from '$lib/runes/runes.svelte';
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<nostr-container relays={`["wss://yabu.me"]`}>
	<nostr-note
		theme={theme.get()}
		id="nevent1qvzqqqqqqypzpp9sc34tdxdvxh4jeg5xgu9ctcypmvsg0n00vwfjydkrjaqh0qh4qy2hwumn8ghj7un9d3shjtnzv9exjmn99e3k7qghwaehxw309ahx7um5wghxjar5v9hx6mewd4jkuqgdwaehxw309aukzcn49ekk2qfqwaehxw309aex2mrp0ykk5upwdehhxarj9emkjun9v3hx2apwdfcqz9rhwden5te0wfjkccte9ejxzmt4wvhxjmcpz9mhxue69uhkuenjv4kxz7fwv9c8qqgnwaehxw309amk7apwdehhxarj9ehx2aqpr4mhxue69uhkummnw3ezucm0d4cxjmr994jhyun0wghxuet5qqs0h88f3cjgemhvl8an3x2q2kg3rfa420akmqk9vdrmwq9hdtjl27gyfnkkc"
	></nostr-note>
</nostr-container>
