import Link from "next/link";
import React from "react";
import { BibleDataType } from "@/models/bibleTypes";

export const SpanishBibleItem = (
  { bible } :
  { bible: BibleDataType }) => {

  return (
		<div
			className="bg-orange-50 dark:bg-gray-700 border border-orange-100 dark:border-gray-600 rounded-2xl p-4 flex flex-col h-full"
			key={bible.id}>

			<h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
				{bible.name}
			</h5>

			<Link
				href={`/biblia/libros/${bible.id}`}
				className="inline-block mt-6 p-4 text-sm font-medium text-center text-orange-700 dark:text-gray-50 rounded-2xl cursor-pointer bg-orange-200 border border-orange-100 hover:bg-orange-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:border-gray-600 focus:ring-4 focus:ring-orange-300  dark:focus:ring-gray-800 transition-all">
				Abrir Biblia
			</Link>
		</div>
	);
}