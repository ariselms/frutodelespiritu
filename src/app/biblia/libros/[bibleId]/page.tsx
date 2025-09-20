import BibleHeaderSection from "@/components/layout/BibleSection";
import { BookPillBlock } from "@/components/bible/BookPill";
import {
	BibleCheckTypes,
	BibleTranslationsView,
	SeccionesBiblia
} from "@/static";
import { BibleBookType } from "@/models/bibleTypes";
import { checkIfParamsExistOrSetDefault } from "@/helpers/index";
import { SpanishBibleApiIds } from "@/static";
import { redirect } from "next/navigation";
import BibleTranslationsViewComponent from "@/components/bible/BibleTranslationsView";
import { CompactBooksView } from "@/components/bible/CompactBooksView";
export default async function BibleBooksPage({
	params,
	searchParams
}: {
	params: Promise<{ bibleId: string }>;
	searchParams: any;
}) {
	let { bibleId } = await params;
	let view = await searchParams;
	let booksView = view?.booksView;
	if (
		booksView &&
		booksView !== BibleTranslationsView.detailed &&
		booksView !== BibleTranslationsView.compact
	) {
		booksView = BibleTranslationsView.detailed;
		redirect(`/biblia/libros/${bibleId}`);
	}
	if (booksView === undefined) {
		booksView = BibleTranslationsView.detailed;
	}
	const idExists = checkIfParamsExistOrSetDefault(
		BibleCheckTypes.BibleTranslation,
		bibleId
	);
	if (!idExists) {
		bibleId = SpanishBibleApiIds.ReinaValera1909;
		redirect(`/biblia/libros/${bibleId}`);
	}
	const bibleInfoRequest = await fetch(
		`https://bible.helloao.org/api/${bibleId}/books.json`
	);
	const bibleInfoResponse = await bibleInfoRequest.json();
	const bibleInfo = await bibleInfoResponse.translation;
	const books = await bibleInfoResponse.books;
	let pentateuco: BibleBookType[] = books.slice(0, 5);
	let historicos: BibleBookType[] = books.slice(5, 17);
	let poetiocs: BibleBookType[] = books.slice(17, 22);
	let profetas: BibleBookType[] = books.slice(22, 39);
	let evangelios: BibleBookType[] = books.slice(39, 43);
	let historico: BibleBookType[] = books.slice(43, 44);
	let cartas: BibleBookType[] = books.slice(44, 65);
	let revelaciones: BibleBookType[] = books.slice(65, 66);
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
					<BibleHeaderSection section={bibleInfo?.name} />
					<BibleTranslationsViewComponent
						booksView={booksView}
						translations={BibleTranslationsView}
						bibleId={bibleId}
					/>
					{booksView === BibleTranslationsView.detailed ? (
						<>
							<div className="bg-orange-50 dark:bg-gray-700 border-1 border-orange-200 dark:border-gray-600 rounded-2xl ">
<<<<<<< HEAD
                <BibleTestament era="Antiguo" />

=======
								<BibleTestament era="Antiguo" />
>>>>>>> preview
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
							</div>
<<<<<<< HEAD

							<div className="bg-orange-50 dark:bg-gray-700 border-1 border-orange-200 dark:border-gray-600 rounded-2xl mt-4">
								<BibleTestament era="Nuevo" />

=======
							<div className="bg-orange-50 dark:bg-gray-700 border-1 border-orange-200 dark:border-gray-600 rounded-2xl mt-4">
								<BibleTestament era="Nuevo" />
>>>>>>> preview
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
						</>
					) : (
						<CompactBooksView libros={books} />
					)}
				</div>
			</section>
		</main>
	);
}
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
<<<<<<< HEAD

const BibleTestament = ({era} : {era: string}) => {
  return (
=======
const BibleTestament = ({ era }: { era: string }) => {
	return (
>>>>>>> preview
		<h3 className="text-3xl lg:text-3xl font-bold text-center mt-4 mb-8 text-orange-950 dark:text-white underline">
			{era} Testamento
		</h3>
	);
<<<<<<< HEAD
}
=======
};
>>>>>>> preview
