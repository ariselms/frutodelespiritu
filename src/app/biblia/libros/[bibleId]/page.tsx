import BibleHeaderSection from "@/components/layout/BibleSection";
import { BookPillBlock } from "@/components/bible/BookPill";
import { SeccionesBiblia } from "@/static";

export const metadata = {
	title: "La biblia en espanol | Fruto del Espíritu",
	description:
		"Lista completa de todos los libros de la biblia en orden. Descúbre mucho más en el nuevo y rediseñado Fruto del Espíritu.",
	keywords: [
		"devocionales",
		"cristiano",
		"reflexiones",
		"estudios bíblicos",
		"biblias en espanol",
		"la biblia en espanol",
		"biblia en espanol",
		"entiende la biblia",
		"espiritu santo",
		"aprende la biblia",
		"libros de la biblia reina valera 1960 en orden",
		"lista de libros de la biblia reina valera 1960",
		"tres significados de mundo en la biblia",
		"significados de mundo en la biblia"
	],
	robots: {
		index: true,
		follow: true
	},
	openGraph: {
		title: "La biblia en espanol | Fruto del Espíritu",
		description:
			"Lista completa de todos los libros de la biblia en orden. Descúbre mucho más en el nuevo y rediseñado Fruto del Espíritu.",
		url: "https://frutodelespiritu.com/biblia/libros/592420522e16049f-01",
		siteName: "Fruto del Espíritu",
		type: "website",
		locale: "es_US",
		images: [
			{
				url: "https://frutodelespiritu.com/images/logo.png",
				alt: "Fruto del Espíritu"
			}
		]
	}
};

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
			<section className="w-full dark:bg-gray-800 text-gray-800">
				<div className="max-w-7xl mx-auto py-8 px-2 xl:px-0">
					<BibleHeaderSection section={bibleInfo.data.nameLocal} />

					<h1 className="text-2xl lg:text-3xl font-bold text-center mt-4 mb-8 text-gray-600 dark:text-gray-300">
						Antiguo Testamento
					</h1>

					<BookPillBlock
						seccion="Pentateuco"
						seccionDescription={SeccionesBiblia.Pentateuco}
						seccionImgUrl="/images/bible-icons/pentateucos.png"
						libros={pentateuco}
					/>

					<BookPillBlock
						seccion="Históricos"
						seccionDescription={SeccionesBiblia.LibrosHistoricos}
						seccionImgUrl="/images/bible-icons/historia.png"
						libros={historicos}
					/>

					<BookPillBlock
						seccion="Poeticos"
						seccionDescription={SeccionesBiblia.LibrosPoeticos}
						seccionImgUrl="/images/bible-icons/poeticos.png"
						libros={poetiocs}
					/>

					<BookPillBlock
						seccion="Profetas"
						seccionDescription={SeccionesBiblia.LibrosProfeticos}
						seccionImgUrl="/images/bible-icons/profetas.png"
						libros={profetas}
					/>

					<h1 className="text-2xl lg:text-3xl font-bold text-center mt-16 mb-8 text-gray-600 dark:text-gray-300">
						Nuevo Testamento
					</h1>

					<BookPillBlock
						seccion="Evangelios"
						seccionDescription={SeccionesBiblia.Evangelios}
						seccionImgUrl="/images/bible-icons/evangelios.png"
						libros={evangelios}
					/>

					<BookPillBlock
						seccion="Historia"
						seccionDescription={SeccionesBiblia.HistoriaNuevoTestamento}
						seccionImgUrl="/images/bible-icons/historia.png"
						libros={historico}
					/>

					<BookPillBlock
						seccion="Cartas"
						seccionDescription={SeccionesBiblia.CartasApostolicas}
						seccionImgUrl="/images/bible-icons/cartas.png"
						libros={cartas}
					/>

					<BookPillBlock
						seccion="Revelaciones"
						seccionDescription={SeccionesBiblia.Apocalipsis}
						seccionImgUrl="/images/bible-icons/revelaciones.png"
						libros={revelaciones}
					/>
				</div>
			</section>
		</main>
	);
}
