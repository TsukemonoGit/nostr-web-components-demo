// hooks.server.ts
import type { Handle } from '@sveltejs/kit';
import { setLocale, locale, waitLocale } from '@konemono/svelte5-i18n';
import { get } from 'svelte/store';

export const handle: Handle = async ({ event, resolve }) => {
	// 言語設定の処理

	const langHeader = event.request.headers.get('accept-language')?.split(',')[0];

	const lang = langHeader?.split('-')[0]; // "en-US" → "en"
	if (lang) {
		setLocale(lang);
		await waitLocale();
	}

	// 通常のレスポンス（言語設定を適用）
	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', get(locale))
	});
};
