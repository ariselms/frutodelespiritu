import { BibleCheckTypes } from "@/static";
import { SpanishBibleApiIdsArray } from "@/static";

export const isActive = (urlPathname: string, linkPathName: string) => {
  console.log(urlPathname, linkPathName);

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