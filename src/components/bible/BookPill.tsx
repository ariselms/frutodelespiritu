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
		<div
			className="bg-orange-50 dark:bg-gray-700 border-1 border-orange-300 dark:border-gray-600 p-4 rounded-2xl mb-8">
			<div className="flex items-center justify-center mb-2">
				<Image
					alt={seccion}
					width={50}
					height={50}
					className="mr-2"
					src={seccionImgUrl}
				/>
				<h2 className="font-bold text-2xl ml-2 text-gray-900 dark:text-gray-100">
					{seccion}
				</h2>
			</div>
			<p className="max-w-3xl mx-auto text-center text-lg mb-4 text-gray-900 dark:text-gray-100">
				{seccionDescription}
			</p>
			<div className="p-4 flex justify-center flex-wrap h-full max-w-3xl mx-auto gap-2">
				{libros?.map((l: any) => (
					<Link
						className="bg-orange-700 hover:bg-orange-800 dark:bg-gray-800 dark:hover:bg-gray-900 text-white font-bold px-8 py-4 rounded-2xl transition-all"
						key={l.id}
						href={`/biblia/libros/capitulos/${l.bibleId}/${l.id}`}>
						{l.name}
					</Link>
				))}
			</div>
		</div>
	);
}

//  bg-orange-200 border border-orange-300 hover:bg-orange-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:border-gray-600 focus:ring-4 focus:ring-orange-300  dark:focus:ring-gray-800 transition-all