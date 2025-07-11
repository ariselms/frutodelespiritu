import Link from "next/link";
import React from "react";
import { BibleResponseType } from "@/models/bibleTypes";

export const SpanishBibleItem = (
  { bible } :
  { bible: BibleResponseType }) => {

  return (
		<div
			className="bg-orange-50 dark:bg-gray-700 border border-orange-300 dark:border-gray-600 rounded-xl p-4 flex flex-col h-full"
			key={bible.bibleId}>

			<h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
				{bible.data.name}
			</h5>

			{/* <div
				dangerouslySetInnerHTML={{ __html: bible.data.info }}
				className="font-normal text-gray-700 dark:text-gray-300 flex-grow mb-12"
			/> */}

			<Link
				href={`/biblia/libros/${bible.bibleId}`}
				className="inline-block mt-6 px-5 py-3 text-sm font-medium text-center text-orange-700 dark:text-gray-50 rounded-2xl cursor-pointer bg-orange-200 border border-orange-300 hover:bg-orange-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:border-gray-600 focus:ring-4 focus:ring-orange-300  dark:focus:ring-orange-800 transition-all">
				Abrir Biblia
			</Link>
		</div>
	);
}