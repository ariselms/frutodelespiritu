import BibleHeaderSection from "@/components/layout/BibleSection";
import { SpanishBibleItem } from "@/components/bible/SpanishBibleList";
import { BibleResponseType } from "@/models/bibleTypes";
import { BibleIdsPublic, FetchEndpoints, serverBaseUrl } from "@/static";

export const metadata = {
	title:
		"Biblia en español | Fruto del Espíritu",
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
    title:
      "Biblia en español | Fruto del Espíritu",
    description:
      "Disponibles cuatro versiones de la biblia en español. Reina Valera 1960, Palabra de Dios para ti, The Holy Bible in Simple Spanish y la Versión Biblia Libre. Descúbre mucho más en el nuevo y rediseñado Fruto del Espíritu.",
		url: "https://frutodelespiritu.com/lecturas",
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

export default async function BibliaPage() {

	let RequestError = null;

	const BibleIds: string[] = BibleIdsPublic;

	const FetchPromises = BibleIds.map(async (bibleId: string) => {

		const url = FetchEndpoints.BibleApiBase.GetSpanishBibles(bibleId);

		try {
			const request = await fetch(url, {
				method: "GET",
				headers: {
					"api-key": `${process.env.BIBLE_API_KEY}`,
					Accept: "application/json"
				}
			});

			if (!request.ok) {

        const errorData = await request.json();

				console.error(
					`HTTP error! Status: ${request.status} for Bible ID: ${bibleId}`,
					errorData
				);

				RequestError = "Lo sentimos, ha ocurrido un error, intenta de nuevo mas tarde.";

				return {
					bibleId: bibleId,
					error: `Failed to fetch: ${request.status}`
				};
			}

			const response = await request.json();

			return {
				bibleId: bibleId,
				data: response.data
			};

		} catch (error) {

			return {
				bibleId: bibleId,
				error: `Failed to fetch: ${error}`
			};

		}
	});

	const allBibleResponses = await Promise.all(FetchPromises);

	const spanishBibles = allBibleResponses
		.filter((res) => res && !res.error && res.data)
		.map((res) => ({
			bibleId: res.bibleId,
			data: res.data
		})) as BibleResponseType[];

	if(RequestError !== null){
		return (
			<main>
				<section className="w-full dark:bg-gray-800 text-gray-800">
					<p className="py-8 text-black dark:text-white text-center max-w-[80ch] mx-auto">
						Lo sentimos, actualmente dependemos de un servicio externo para proveer los datos de la Biblia. Si lees este mensaje es que alcanzamos el limite de peticiones diarias. Estamos trabajando fuertemente para crear nuestra propia base de datos de la biblia. Por favor intenta de nuevo mas tarde y solicitamos su comprension y paciencia en este asunto. Lamentamos el inconveniente que pueda haber causado. 
					</p>
				</section>
			</main>
		)
	}

	return (
		<main>
			<section className="w-full dark:bg-gray-800 text-gray-800">
				<div className="max-w-7xl mx-auto py-8 px-2 xl:px-0">

					<BibleHeaderSection section="La Santa Biblia" />

					{RequestError && <p>{RequestError}</p>}

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">

						{spanishBibles?.map((bible: BibleResponseType) => (

							<SpanishBibleItem key={bible.bibleId} bible={bible} />

						))}

					</div>
				</div>
			</section>
		</main>
	);
}
