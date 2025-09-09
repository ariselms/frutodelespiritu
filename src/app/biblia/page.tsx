import BibleHeaderSection from "@/components/layout/BibleSection";
import { SpanishBibleItem } from "@/components/bible/SpanishBibleList";
import { BibleDataType} from "@/models/bibleTypes";

export default async function BibliaPage() {
  let spanishBibles: BibleDataType[] = [];

  try {
    const url = "https://bible.helloao.org/api/available_translations.json";

    const bibleRequest = await fetch(url);

    const bibleResponse = await bibleRequest.json();

    if (bibleResponse.translations.length) {
      spanishBibles = bibleResponse.translations.filter(
        (bible: any) => bible.language === "spa")
		}

  } catch (error) {
    console.error(error);
  }

	return (
		<main>
			<section className="w-full dark:bg-gray-800 text-gray-800">
				<div className="max-w-7xl mx-auto py-8 px-2 xl:px-0">
					<BibleHeaderSection section="La Santa Biblia" />
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{spanishBibles?.map((bible: BibleDataType) => (
							<SpanishBibleItem key={bible.id} bible={bible} />
						))}
					</div>
				</div>
			</section>
		</main>
	);
}

export const metadata = {
	title: "Biblia en español | Fruto del Espíritu",
	description:
		"Disponibles cuatro versiones de la biblia en español. Reina Valera 1960, Palabra de Dios para ti, The Holy Bible in Simple Spanish y la Versión Biblia Libre. Descúbre mucho más en el nuevo y rediseñado Fruto del Espíritu.",
	keywords: [
		"devocionales",
		"cristiano",
		"reflexiones",
		"estudios bíblicos",
		"biblias en español",
		"la biblia en español",
		"biblia en español",
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
		title: "Biblia en español | Fruto del Espíritu",
		description:
			"Disponibles cuatro versiones de la biblia en español. Reina Valera 1960, Palabra de Dios para ti, The Holy Bible in Simple Spanish y la Versión Biblia Libre. Descúbre mucho más en el nuevo y rediseñado Fruto del Espíritu.",
		url: "https://frutodelespiritu.com/biblia",
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