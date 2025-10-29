// --- Types for notes or memorization list, this is because they share similar attributes ---
export type NoteOrMemoryListType = {
	id: string | null;
  by_user_id: number;
	name: string;
	description: string;
}

export type MemoryItemType = {
  id: number | null;
	by_user_id: string;
	bible_id: string;
	book_id: string;
	chapter_id: string;
	verse_from: string;
	verse_to: string;
	passage_text: string[];
	bible_book: string;
	bible_name: string;
};

// the note structure is the same as the memory item structure but with the addition of note_title and note_content
export type NoteItemType = MemoryItemType & {
  note_title: string;
  note_content: string;
}

export type DeleteUserListOrNoteType = {
  id: string;
  name: string;
}

// --- Verse Type Definitions ---
export type VerseTextObject = {
	text: string;
	wordsOfJesus: boolean;
};

export type VerseContentItem = string | VerseTextObject;

export type Verse = {
	type: "verse";
	number: number;
	content: VerseContentItem[];
};