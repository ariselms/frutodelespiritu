import Image from "next/image";
import Link from "next/link";
export function BookPillBlock({
	seccion,
  colorAccent,
	seccionDescription,
	seccionImgUrl,
	libros
}: {
	seccion: string;
  colorAccent: string;
	seccionDescription: string;
	seccionImgUrl: string;
	libros: any;
}) {
	return (
		<div
			className={`bg-orange-50 dark:bg-gray-800 border-2 border-${colorAccent}-700 p-4 rounded-xl mb-8`}>
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
			<p className="max-w-3xl mx-auto text-center mb-4 text-gray-900 dark:text-gray-100">
				{seccionDescription}
			</p>
			<div className=" dark:bg-gray-800  p-4 flex justify-center flex-wrap h-full max-w-3xl mx-auto">
				{libros?.map((l: any) => (
					<Link
						className={`bg-${colorAccent}-700 mr-2 mb-2 text-white font-bold px-7 py-3 rounded-full`}
						key={l.id}
						href={`/biblia/libros/capitulos/${l.bibleId}/${l.id}`}>
						{l.name}
					</Link>
				))}
			</div>
		</div>
	);
}
