import { nip19 } from 'nostr-tools';

export function resolveToNoteId(noteId: string | undefined): string | null {
	if (!noteId) return null;
	let actualNoteId: string | null = noteId;

	//	console.log('fetchnote');
	try {
		if (noteId.startsWith('nevent') || noteId.startsWith('note')) {
			const decoded = nip19.decode(noteId);
			if (decoded.type === 'nevent') {
				actualNoteId = decoded.data.id;
			} else if (decoded.type === 'note') {
				actualNoteId = decoded.data;
			}
		}
	} catch (e) {
		console.warn('Failed to decode note id:', noteId);
	}

	if (!actualNoteId || !/^[0-9a-f]{64}$/i.test(actualNoteId)) {
		return null;
	}
	return actualNoteId;
}
