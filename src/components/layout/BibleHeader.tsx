"use client";
import Link from "next/link";
import { isActive } from "@/helpers";
import { useParams, usePathname } from "next/navigation";
import Image from "next/image";
import {LordIconHover} from "@/components/animations/lordicon";
// Assuming 'lock.json' is in a folder accessible by your component
import LOTTIE_BIBLE_OPEN from "@/lotties/bible-open.json";
import LOTTIE_BOOKS_HIT from "@/lotties/books-hit.json";
import LOTTIE_GRID_PINCH from "@/lotties/grid-pinch.json";
import LOTTIE_MAGNIFIER_ROTATION from "@/lotties/magnifier-rotation.json";
export default function BibleHeader() {
	const params = useParams();
	const pathname = usePathname();
	// bible id, chapter id
	const { bibleId, bookId, chapterId } = params;
	return (
		<header className="bg-orange-50 dark:bg-gray-900 border-b border-orange-300 dark:border-b dark:border-gray-700">
			<nav className="max-w-5xl mx-auto flex items-end justify-center gap-1 md:gap-2 lg:gap-4 pt-8 text-orange-50 dark:text-gray-300 overflow-auto">
				<Link
					className={`${
						isActive(pathname, "/biblia") &&
						"bg-orange-700 dark:bg-gray-800 px-4 py-2 rounded-t-2xl dark:text-gray-50"
					} px-4 py-2 bg-gray-500 rounded-t-2xl text-white dark:text-gray-50 text-sm md:text-base min-h-20 sm:min-h-16 lg:min-h-12 flex flex-col text-center items-center justify-around`}
					href="/biblia">
					<LordIconHover
						size={32}
						ICON_SRC={LOTTIE_BIBLE_OPEN}
						state="hover-pinch"
						text="Traducciones"
					/>
				</Link>
				{bibleId && (
					<Link
						className={`${
							isActive(pathname, `/biblia/libros/${bibleId}`) &&
							"bg-orange-700 dark:bg-gray-800 px-4 py-2 rounded-t-2xl dark:text-gray-50"
						} px-4 py-2 bg-gray-500 rounded-t-2xl text-white dark:text-gray-50 text-sm md:text-base min-h-20 sm:min-h-16 lg:min-h-12 flex flex-col text-center items-center justify-around`}
						href={`/biblia/libros/${bibleId}`}>
						<LordIconHover
							size={32}
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
							) &&
							"bg-orange-700 dark:bg-gray-800 px-4 py-2 rounded-t-2xl dark:text-gray-50"
						} px-4 py-2 bg-gray-500 rounded-t-2xl text-white dark:text-gray-50 text-sm md:text-base min-h-20 sm:min-h-16 lg:min-h-12 flex flex-col text-center items-center justify-around`}
						href={`/biblia/libros/capitulos/${bibleId}/${bookId}`}>
						<LordIconHover
							size={32}
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
							) &&
							"bg-orange-700 dark:bg-gray-800 px-4 py-2 rounded-t-2xl dark:text-gray-50"
						} px-4 py-2 bg-gray-500 rounded-t-2xl text-white dark:text-gray-50 text-sm md:text-base min-h-20 sm:min-h-16 lg:min-h-12 flex flex-col text-center items-center justify-around`}
						href={`/biblia/libros/capitulos/versiculos/${bibleId}/${bookId}/${chapterId}`}>
						<Image
							alt="Logo"
							width={100}
							height={100}
							src="/images/animated/static-reading.png"
							className="w-8 h-8 mr-0"
						/>
						Lectura
					</Link>
				)}
				{bibleId && (
					<Link
						className={`${
							isActive(pathname, `biblia/${bibleId}/buscar`) &&
							"bg-orange-700 dark:bg-gray-800 px-4 py-2 rounded-t-2xl dark:text-gray-50"
						} px-4 py-2 bg-gray-500 rounded-t-2xl text-white dark:text-gray-50 text-sm md:text-base min-h-20 sm:min-h-16 lg:min-h-12 flex flex-col text-center items-center justify-around`}
						href={`/biblia/${bibleId}/buscar`}>
						<LordIconHover
							size={32}
							ICON_SRC={LOTTIE_MAGNIFIER_ROTATION}
							state="hover-rotation"
							text="Buscar"
						/>
					</Link>
				)}
			</nav>
		</header>
	);
}
