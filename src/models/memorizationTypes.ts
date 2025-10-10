export type MemorizationSubmissionType = {
	by_user_id: string;
	bible_id: string;
	book_id: string;
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