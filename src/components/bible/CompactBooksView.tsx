import Image from "next/image";
import Link from "next/link";
import { BibleBookType } from "@/models/bibleTypes";

export function CompactBooksView({
	libros
} : {libros: BibleBookType[]}) {
	return (
		<div className="mb-8 mt-4">
			<div className="p-4 grid grid-cols-3 sm:grid-cols-6 md:grid-cols-10 h-full max-w-3xl mx-auto gap-1.5">
				{libros?.map((l: any) => (
					<Link
						className="bg-orange-700 hover:bg-orange-800 dark:bg-gray-900 dark:hover:bg-gray-900/50 text-white font-bold px-8 py-4 rounded-2xl flex items-center justify-center dark:border dark:border-gray-700"
						key={l.id}
						href={`/biblia/libros/capitulos/${l.translationId}/${l.id}`}>
						{l.id}
					</Link>
				))}
			</div>
		</div>
	);
}

//  bg-orange-200 border border-orange-100 hover:bg-orange-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:border-gray-600 focus:ring-4 focus:ring-orange-300  dark:focus:ring-gray-800 transition-all
