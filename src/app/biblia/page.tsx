import Link from "next/link";
import BibleHeaderSection from "@/components/layout/BibleSection";

export default async function BibliaPage() {
	// TODO: Add Biblia Page
	// TODO: Create a friendly UI packed with features
	// TODO: Make the UX as user friendly as possible and easy to find things
	const BibleAPIKey = process.env.BIBLE_API_KEY;
	const RV60Id = process.env.NEXT_PUBLIC_BIBLE_RV60;
	const PalabraDeDiosId = process.env.NEXT_PUBLIC_BIBLE_PALABRA_DE_DIOS;
	const SantaBibliaEspanol = process.env.NEXT_PUBLIC_LA_SANTA_BIBLIA_ESPANOL;
	const BibliaLibre = process.env.NEXT_PUBLIC_VERSION_BIBLIA_LIBRE;

	const BibleIds = [RV60Id, PalabraDeDiosId, SantaBibliaEspanol, BibliaLibre];

	const FetchPromises = BibleIds.map(async (bibleId) => {

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

				return {
					bibleId: bibleId,
					error: `Failed to fetch: ${request.status}`
				};
			}

			const response = await request.json();

			return {
				bibleId: bibleId,
				data: response
			};
		} catch (error) {
			console.error(`Failed to fetch: ${error}`);
			return {
				bibleId: bibleId,
				error: `Failed to fetch: ${error}`
			};
		}
	});

	// Use Promise.all to wait for all fetch requests to complete.
	// It will return an array of results in the same order as the input promises.
	const allBibleResponses = await Promise.all(FetchPromises);
	// bible url

	//https://api.scripture.api.bible/v1/bibles/${PalabraDeDiosId}/books

	const successfulBibleBooks = allBibleResponses.filter(
		(res) => res && !res.error
	);

	// TODO: Create a nice layout to switch bibles
	// TODO: Create a reading tab that the user can click to continue reading selected bible

	return (
		<main>
			<section className="w-full dark:bg-gray-900 text-gray-800">
				<div className="max-w-7xl mx-auto py-16 px-2 xl:px-0">

          <BibleHeaderSection
            section="La Santa Biblia"
          />

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{successfulBibleBooks.map((bible) => (
							<div
								className="bg-orange-50 dark:bg-gray-800 border border-orange-400 dark:border-gray-700 rounded-xl p-4 flex flex-col h-full"
								key={bible.bibleId}>
								<h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">
									{bible.data.data.name}
								</h5>
								<div
									dangerouslySetInnerHTML={{ __html: bible.data.data.info }}
									className="font-normal text-gray-700 dark:text-gray-300 flex-grow mb-12"
								/>
								<Link
									href={`/biblia/libros/${bible.bibleId}`}
									className="flex items-center justify-center bg-orange-400 dark:bg-gray-950 text-white rounded-lg px-4 py-2 hover:text-gray-100 mt-auto">
									Abrir Biblia
									<svg
										className="-mr-1 ml-2 h-4 w-4"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg">
										<path
											fillRule="evenodd"
											d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
											clipRule="evenodd"
										/>
									</svg>
								</Link>
							</div>
						))}
					</div>
				</div>
			</section>
		</main>
	);
}
