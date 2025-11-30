import Image from "next/image";
import Link from "next/link";
import { BookPillBlockProps } from "@/models/bibleTypes";

export function BookPillBlock({
	seccion,
	seccionDescription,
	seccionImgUrl,
	libros
}: BookPillBlockProps) {
	return (
		<div className="mb-4 border-b border-blue-200 dark:border-gray-600 last:border-b-0 pt-3 pb-4">
			<div className="flex items-center justify-center mb-2">
				{seccion === "Libros Católicos" ? null : (
					<Image
						alt={seccion}
						width={50}
						height={50}
						className="mr-2"
						src={seccionImgUrl}
					/>
				)}
				<h2 className="font-bold text-2xl ml-2 text-gray-900 dark:text-gray-100">
					{seccion}
				</h2>
			</div>
			<p className="max-w-3xl mx-auto text-center text-lg mb-4 text-gray-900 dark:text-gray-100">
				{seccionDescription}
			</p>
			<div className="p-4 grid grid-cols-2 sm:grid-cols-3 h-full max-w-3xl mx-auto gap-1.5">
				{libros?.map((l: any) => (
					<Link
						className="text-sm bg-blue-700 hover:bg-blue-800 dark:bg-gray-900 dark:hover:bg-gray-800 text-white font-bold py-2.5 px-0.5 rounded-2xl transition-all border dark:border-gray-600 wrap-break-word text-center"
						key={l.id}
						href={`/biblia/libros/capitulos/${l.translationId}/${l.id}`}>
						{l.name.toUpperCase()}
					</Link>
				))}
			</div>
		</div>
	);
}
