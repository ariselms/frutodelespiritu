import BibleHeaderSection from "@/components/layout/BibleSection";
import { BookPillBlock } from "@/components/bible/BookPill";
import { SeccionesBiblia } from "@/static";
import { BibleBookType } from "@/models/bibleTypes";

export async function generateMetadata({
	params
}: {
	params: Promise<{ bibleId: string }>;
}) {
	const { bibleId } = await params;

  const bibleInfoRequest = await fetch(
    `https://bible.helloao.org/api/${bibleId}/books.json`
  );

  const bibleInfoResponse = await bibleInfoRequest.json();

  const bibleInfo = await bibleInfoResponse.translation;

	return {
		title: `${bibleInfo?.name} | Fruto del Espíritu`,
		description: `Lee la biblia ${bibleInfo?.name} en el nuevo y rediseñado Fruto del Espíritu. Contamos con 8 versiones de la biblia en español. Descúbre mucho más en el nuevo y rediseñado Fruto del Espíritu.`,
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
		].concat(bibleInfo?.title?.split(" ")),
		robots: {
			index: true,
			follow: true
		},
		openGraph: {
			title: `${bibleInfo?.name} | Fruto del Espíritu`,
			description: `Lee la biblia ${bibleInfo?.name} en el nuevo y rediseñado Fruto del Espíritu. Contamos con 8 versiones de la biblia en español. Descúbre mucho más en el nuevo y rediseñado Fruto del Espíritu.`,
			url: `https://frutodelespiritu.com/biblia/libros/${bibleId}`,
			siteName: "Fruto del Espíritu",
			type: "website",
			locale: "es_US",
			images: [
				{
					url: `${bibleInfo?.image_url}`,
					alt: "Fruto del Espíritu"
				}
			]
		}
	};
}

export default async function BibleBooksPage({
	params
}: {
	params: Promise<{ bibleId: string }>;
}) {
	const { bibleId } = await params;

	const bibleInfoRequest = await fetch(
		`https://bible.helloao.org/api/${bibleId}/books.json`
	);

	const bibleInfoResponse = await bibleInfoRequest.json();

	const bibleInfo = await bibleInfoResponse.translation

	const books = await bibleInfoResponse.books;

	let pentateuco:BibleBookType[] = books.slice(0, 5);
	let historicos:BibleBookType[] = books.slice(5, 17);
	let poetiocs:BibleBookType[] = books.slice(17, 22);
	let profetas:BibleBookType[] = books.slice(22, 39);
	let evangelios:BibleBookType[] = books.slice(39, 43);
	let historico:BibleBookType[] = books.slice(43, 44);
	let cartas:BibleBookType[] = books.slice(44, 65);
	let revelaciones:BibleBookType[] = books.slice(65, 66);

	if (books.length > 0) {
		pentateuco = books.slice(0, 5);
		historicos = books.slice(5, 17);
		poetiocs = books.slice(17, 22);
		profetas = books.slice(22, 39);
		evangelios = books.slice(39, 43);
		historico = books.slice(43, 44);
		cartas = books.slice(44, 65);
		revelaciones = books.slice(65, 66);
	}

	return (
		<main>
			<section className="w-full dark:bg-gray-800 text-gray-800">
				<div className="max-w-7xl mx-auto py-8 px-2 xl:px-0">
					<BibleHeaderSection section={bibleInfo?.data?.nameLocal} />

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
