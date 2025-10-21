// Describes a single item within the memory list
export type MemoryListItem = {
	id: number;
	by_user_id: number;
	bible_id: string;
	book_id: string;
	chapter_id: string;
	verse_from: string;
	verse_to: string;
	passage_text: string; // This is a stringified JSON object
  bible_book: string;
  bible_name: string;
};

// Describes the main information about the list itself
export type MemoryListInfo = {
	id: number;
	by_user_id: number;
	name: string;
	description: string;
};

// The complete type for the entire data structure
export type MemoryListData = {
	listInfo: MemoryListInfo;
	listItems: MemoryListItem[];
};
