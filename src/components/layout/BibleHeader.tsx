"use client";

import Link from "next/link";
import { isActive } from "@/helpers";
import { useParams, usePathname } from "next/navigation";
import {LordIconHover} from "@/components/animations/lordicon";
import LOTTIE_BIBLE_OPEN from "@/lotties/bible-open.json";
import LOTTIE_BOOKS_HIT from "@/lotties/books-hit.json";
import LOTTIE_GRID_PINCH from "@/lotties/grid-pinch.json";
import LOTTIE_MAGNIFIER_SPIN from "@/lotties/magnifier-rotation.json";
import LOTTIE_READING_HOVER_PINCH from "@/lotties/reading-hover-pinch.json"
export default function BibleHeader() {
	const params = useParams();
	const pathname = usePathname();
	// bible id, chapter id
	const { bibleId, bookId, chapterId } = params;

	return (
		<header className="bg-slate-50 dark:bg-gray-950 border-b border-slate-200 dark:border-b dark:border-gray-700 w-full">
			<nav className="max-w-5xl mx-auto flex items-end justify-start sm:justify-center gap-0.5 pt-8 text-slate-50 dark:text-gray-300 w-full overflow-auto">
				<Link
					className={`${
						isActive(pathname, "/biblia")
							? "bg-white text-slate-950 dark:bg-gray-800 p-2 rounded-t-2xl dark:text-gray-50 border border-b-0 border-x border-t border-slate-200 dark:border-gray-600"
							: " p-2 bg-slate-700 dark:bg-gray-900 rounded-t-2xl text-white dark:text-gray-50 text-sm md:text-base h-auto flex flex-col text-center items-center justify-around border border-b-0 border-x border-t dark:border-gray-600"
					}`}
					href="/biblia">
					<LordIconHover
						size={22}
						ICON_SRC={LOTTIE_BIBLE_OPEN}
						state="hover-pinch"
						text="Traducciones"
					/>
				</Link>

				{bibleId && (
					<Link
						className={`${
							isActive(pathname, `/biblia/libros/${bibleId}`)
								? "bg-white text-slate-950 dark:bg-gray-800 p-2 rounded-t-2xl dark:text-gray-50 border border-b-0 border-x border-t border-slate-200 dark:border-gray-600"
								: " p-2 bg-slate-700 dark:bg-gray-900 rounded-t-2xl text-white dark:text-gray-50 text-sm md:text-base h-auto flex flex-col text-center items-center justify-around border border-b-0 border-x border-t dark:border-gray-600"
						}`}
						href={`/biblia/libros/${bibleId}`}>
						<LordIconHover
							size={22}
							ICON_SRC={LOTTIE_BOOKS_HIT}
							state="hover-hit"
							text="Libros"
						/>
					</Link>
				)}

				{bookId && (
					<Link
						className={`${
							isActive(
								pathname,
								`/biblia/libros/capitulos/${bibleId}/${bookId}`
							)
								? "bg-white text-slate-950 dark:bg-gray-800 p-2 rounded-t-2xl dark:text-gray-50 border border-b-0 border-x border-t border-slate-200 dark:border-gray-600"
								: " p-2 bg-slate-700 dark:bg-gray-900 rounded-t-2xl text-white dark:text-gray-50 text-sm md:text-base h-auto flex flex-col text-center items-center justify-around border border-b-0 border-x border-t dark:border-gray-600"
						}`}
						href={`/biblia/libros/capitulos/${bibleId}/${bookId}`}>
						<LordIconHover
							size={22}
							ICON_SRC={LOTTIE_GRID_PINCH}
							state="hover-pinch"
							text="Capítulos"
						/>
					</Link>
				)}

				{chapterId && (
					<Link
						className={`${
							isActive(
								pathname,
								`/biblia/libros/capitulos/versiculos/${bibleId}/${bookId}/${chapterId}`
							)
								? "bg-white text-slate-950 dark:bg-gray-800 p-2 rounded-t-2xl dark:text-gray-50 border border-b-0 border-x border-t border-slate-200 dark:border-gray-600"
								: " p-2 bg-slate-700 dark:bg-gray-900 rounded-t-2xl text-white dark:text-gray-50 text-sm md:text-base h-auto flex flex-col text-center items-center justify-around border border-b-0 border-x border-t dark:border-gray-600"
						}`}
						href={`/biblia/libros/capitulos/versiculos/${bibleId}/${bookId}/${chapterId}`}>
						<LordIconHover
							size={22}
							ICON_SRC={LOTTIE_READING_HOVER_PINCH}
							state="hover-pinch"
							text={`${bookId} ${chapterId}`}
						/>
					</Link>
				)}

				{bibleId && (
					<Link
						className={`${
							isActive(pathname, `/biblia/${bibleId}/buscar`)
								? "bg-white text-slate-950 dark:bg-gray-800 p-2 rounded-t-2xl dark:text-gray-50 border border-b-0 border-x border-t border-slate-200 dark:border-gray-600"
								: " p-2 bg-slate-700 dark:bg-gray-900 rounded-t-2xl text-white dark:text-gray-50 text-sm md:text-base h-auto flex flex-col text-center items-center justify-around border border-b-0 border-x border-t dark:border-gray-600"
						}`}
						href={`/biblia/${bibleId}/buscar`}>
						<LordIconHover
							size={22}
							ICON_SRC={LOTTIE_MAGNIFIER_SPIN}
							state="hover-spin"
							text="Buscar"
						/>
					</Link>
				)}
			</nav>
		</header>
	);
}
