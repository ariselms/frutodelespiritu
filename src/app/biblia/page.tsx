import BibleHeaderSection from "@/components/layout/BibleSection";
import { SpanishBibleItem } from "@/components/bible/SpanishBibleList";
import { BibleResponseType } from "@/models/bibleTypes";

export default async function BibliaPage() {
	// TODO: Add Biblia Page
	// TODO: Create a friendly UI packed with features
	// TODO: Make the UX as user friendly as possible and easy to find things
	const BibleAPIKey = process.env.BIBLE_API_KEY;
	const RV60Id = process.env.NEXT_PUBLIC_BIBLE_RV60;
	const PalabraDeDiosId = process.env.NEXT_PUBLIC_BIBLE_PALABRA_DE_DIOS;
	const SantaBibliaEspanol = process.env.NEXT_PUBLIC_LA_SANTA_BIBLIA_ESPANOL;
	const BibliaLibre = process.env.NEXT_PUBLIC_VERSION_BIBLIA_LIBRE;
	let RequestError = null;

	console.log(BibleAPIKey);

	const BibleIds: string[] = [
		RV60Id,
		PalabraDeDiosId,
		SantaBibliaEspanol,
		BibliaLibre
	].filter((id): id is string => typeof id === "string" && !!id);

	const FetchPromises = BibleIds.map(async (bibleId: string) => {
		const url = `https://api.scripture.api.bible/v1/bibles/${bibleId}`;

		try {
			const request = await fetch(url, {
				method: "GET",
				headers: {
					"api-key": `${BibleAPIKey}`,
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
			console.log(error)
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
					<p className="py-8 text-black dark:text-white text-center">{RequestError}</p>
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
