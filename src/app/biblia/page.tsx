import Link from "next/link";

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

  console.log("--- Bible Books Response ---")
  console.log(successfulBibleBooks);

  // TODO: Create a nice layout to switch bibles
  // TODO: Create a reading tab that the user can click to continue reading selected bible

	return (
		<main>
			<section className="w-full bg-orange-400 dark:bg-gray-900 text-white">
				<div className="max-w-7xl mx-auto py-16">
					<h1>
						En estos momento contamos con las siguientes versiones de la biblia:
					</h1>

          <div>
            {successfulBibleBooks.map((bible) => (
              <div className="border m-2 p-2" key={bible.bibleId}>
                <h2>{bible.data.data.name}</h2>
                <p>{bible.data.data.abbreviation}</p>
                <Link href={`/biblia/libros/${bible.bibleId}`}>Leer</Link>
              </div>
            ))}
          </div>
				</div>
			</section>
		</main>
	);
}