import { BibleCheckTypes } from "@/static";
import { SpanishBibleApiIdsArray } from "@/static";

export const isActive = (urlPathname: string, linkPathName: string) => {

  return urlPathname === linkPathName;

};

export const checkIfParamsExistOrSetDefault = (checkType: string, paramId: string) => {

  // the checkType is wether I am checking for bibleIds, bookIds or chapterIds
  switch (checkType) {
    case BibleCheckTypes.BibleTranslation:
      return SpanishBibleApiIdsArray.includes(paramId);
    case BibleCheckTypes.BibleBook:
      return SpanishBibleApiIdsArray.includes(paramId)
    default:
      return null;
  }

}

// this function parses a string in the format "Book Chapter:Verse" and returns an object with book, chapter, and verse, this is because the api returns the verse ids in a weird format
export const parseSid = (sid: string) => {
	const match = sid.match(/^(.+?)\s(\d+):(\d+)$/);
	if (!match) return null;

	return {
		book: match[1],
		chapter: parseInt(match[2], 10),
		verse: parseInt(match[3], 10),
    original: sid
	};
};