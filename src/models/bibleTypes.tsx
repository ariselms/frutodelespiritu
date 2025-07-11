interface ChapterNavigationType {
	id: string;
	number: string;
	bookId: string;
}

export interface ChapterType {
	id: string;
	bibleId: string;
	number: string;
	bookId: string;
	reference: string;
	copyright: string;
	verseCount: number;
	content: string; // This will contain the HTML string
	next?: ChapterNavigationType; // Optional, as it might be the last chapter
	previous?: ChapterNavigationType; // Optional, as it might be the first chapter
}

export interface BookPillBlockProps {
  seccion: string;
  seccionDescription: string;
  seccionImgUrl: string;
  libros: ChapterType[];
}

export interface SearchResultType {
  id: string;
  orgId: string;
  bookId: string;
  bibleId: string;
  chapterId: string;
  reference: string;
  text: string;
}

interface BibleLanguageType {
	id: string;
	name: string;
	nameLocal: string;
	script: string;
	scriptDirection: string;
}

interface BibleCountryType {
	// Assuming a country object would have properties like id and name
	id: string;
	name: string;
	// Add other properties if known, e.g., 'nameLocal', 'countryCode', etc.
}

interface AudioBibleType {
	// Assuming an audio bible object would have properties like id and url
	id: string;
	url: string;
	// Add other properties if known, e.g., 'format', 'bitrate', etc.
}

interface BibleDataType {
	id: string;
	dblId: string;
	relatedDbl: string | null;
	name: string;
	nameLocal: string;
	abbreviation: string;
	abbreviationLocal: string;
	description: string;
	descriptionLocal: string;
	language: BibleLanguageType; // Assuming a BibleLanguageType object
	countries: BibleCountryType[]; // Array of Country objects
	type: string;
	updatedAt: string; // ISO 8601 date string
	copyright: string;
	info: string; // This will contain the HTML string
	audioBibles: AudioBibleType[]; // Array of AudioBible objects
}

export interface BibleResponseType {
	bibleId: string;
	data: BibleDataType;
}