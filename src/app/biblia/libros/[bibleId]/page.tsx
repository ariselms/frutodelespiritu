import BibleHeaderSection from "@/components/layout/BibleSection";
import { BookPillBlock } from "@/components/bible/BookPill";

export default async function BibleBooksPage({
	params
}: {
	params: Promise<{ bibleId: string }>;
}) {
	const { bibleId } = await params;

	const [BibleInfo, BibleBooks] = await Promise.all([
		fetch(`https://api.scripture.api.bible/v1/bibles/${bibleId}`, {
			method: "GET",
			headers: {
				"api-key": `${process.env.BIBLE_API_KEY}`,
				Accept: "application/json"
			}
		}),
		fetch(`https://api.scripture.api.bible/v1/bibles/${bibleId}/books`, {
			method: "GET",
			headers: {
				"api-key": `${process.env.BIBLE_API_KEY}`,
				Accept: "application/json"
			}
		})
	]);

	const bibleInfo = await BibleInfo.json();
	const books = await BibleBooks.json();

	const pentateuco = books?.data.slice(0, 5);
	const historicos = books?.data.slice(5, 17);
	const poetiocs = books?.data.slice(17, 22);
	const profetas = books?.data.slice(22, 39);
	const evangelios = books?.data.slice(39, 43);
	const historico = books?.data.slice(43, 44);
	const cartas = books?.data.slice(44, 65);
	const revelaciones = books?.data.slice(65, 66);

	return (
		<main>
			<section className="w-full dark:bg-gray-900 text-gray-800">
				<div className="max-w-7xl mx-auto py-8 px-2 xl:px-0">
					<BibleHeaderSection section={bibleInfo.data.nameLocal} />

					<h1 className="text-2xl lg:text-3xl font-bold text-center mt-12 mb-8 text-gray-600 dark:text-gray-300">
						Antiguo Testamento
					</h1>

					<BookPillBlock
						seccion="Pentateuco"
						colorAccent="red"
						seccionDescription="El Pentateuco consiste de los primeros cinco libros de la Biblia."
						seccionImgUrl="/images/bible-icons/pentateucos.png"
						libros={pentateuco}
					/>

					<BookPillBlock
						seccion="Históricos"
						colorAccent="orange"
						seccionDescription="Los Históricos son libros de la Biblia que se escribieron despues del Pentateuco."
						seccionImgUrl="/images/bible-icons/historia.png"
						libros={historicos}
					/>

					<BookPillBlock
						seccion="Poeticos"
						colorAccent="purple"
						seccionDescription="Los Poeticos son libros de la Biblia que se escribieron despues del Pentateuco."
						seccionImgUrl="/images/bible-icons/poeticos.png"
						libros={poetiocs}
					/>

					<BookPillBlock
						seccion="Profetas"
						colorAccent="blue"
						seccionDescription="Los Libros de los Profetas son libros de la Biblia."
						seccionImgUrl="/images/bible-icons/profetas.png"
						libros={profetas}
					/>

					<h1 className="text-2xl lg:text-3xl font-bold text-center mt-16 mb-8 text-gray-600 dark:text-gray-300">
						Nuevo Testamento
					</h1>

					<BookPillBlock
						seccion="Evangelios"
						colorAccent="orange"
						seccionDescription="Los Evangelios son libros de la Biblia."
						seccionImgUrl="/images/bible-icons/evangelios.png"
						libros={evangelios}
					/>

					<BookPillBlock
						seccion="Historia"
						colorAccent="orange"
						seccionDescription="Los Libros históricos son libros de la Biblia."
						seccionImgUrl="/images/bible-icons/historia.png"
						libros={historico}
					/>

					<BookPillBlock
						seccion="Cartas"
						colorAccent="green"
						seccionDescription="Los Libros de las Cartas son libros de la Biblia."
						seccionImgUrl="/images/bible-icons/cartas.png"
						libros={cartas}
					/>

					<BookPillBlock
						seccion="Revelaciones"
						colorAccent="blue"
						seccionDescription="Los Libros de las Revelaciones son libros de la Biblia."
						seccionImgUrl="/images/bible-icons/revelaciones.png"
						libros={revelaciones}
					/>
				</div>
			</section>
		</main>
	);
}
