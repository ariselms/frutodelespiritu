export type MemorizationSubmissionType = {
	bible_name: string;
  bible_id: string;
  bible_book: string;
	book_id: string;
	by_user_id: string;
	chapter_id: string;
	verse_from: string;
	verse_to: string;
	passage_text: string[];
};

export type MemorizationListType = {
  id: number;
  by_user_id: number;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
};