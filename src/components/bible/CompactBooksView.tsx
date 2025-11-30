import Link from "next/link";
import { BibleBookType } from "@/models/bibleTypes";

export function CompactBooksView({
	libros
} : {libros: BibleBookType[]}) {

	return (
		<div className="mb-8 mt-4">
			<div className="p-4 grid grid-cols-2 md:grid-cols-3 h-full max-w-3xl mx-auto gap-1.5">
				{libros?.map((l: any) => (
					<Link
						className="px-0.5 py-2.5 text-sm text-center bg-blue-700 hover:bg-blue-800 dark:bg-gray-900 dark:hover:bg-gray-900/50 text-white font-bold rounded-lg dark:border dark:border-gray-700"
						key={l.id}
						href={`/biblia/libros/capitulos/${l.translationId}/${l.id}`}>
						{l.name.toUpperCase()}
					</Link>
				))}
			</div>
		</div>
	);
}