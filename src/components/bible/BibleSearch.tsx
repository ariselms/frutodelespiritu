"use client";

import { useState, useEffect } from "react";
import { BibleSearchResultList } from "./BibleSearchResultsSearchResults";
import { useSearchParams, useRouter } from "next/navigation";
import { FetchEndpoints } from "@/static";

// TODO: Create a type for categories if needed
export function BibleSearch({bibleId}: {bibleId: string}) {
  const router = useRouter();
  const searchParams = useSearchParams();

	const [bibleKeywordSearch, setBibleKeywordSearch] = useState(
    searchParams.get("query") || ""
  );

  const [bibleKeywordResults, setBibleKeywordResults] = useState<any>();

  useEffect(() => {
    if (bibleKeywordSearch) {
      handleKeywordSearchSubmit()
    }
  }, []);

	const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setBibleKeywordSearch(event.target.value);
	};

	const handleKeywordSearchSubmit = async (
		event?: React.FormEvent<HTMLFormElement>
	) => {
		event?.preventDefault();

    router.push(`/biblia/${bibleId}/buscar?query=${bibleKeywordSearch.trim()}`);

		try {
			// url to request bible term:
			const url = FetchEndpoints.BibleApiBase.SearchBibleVerses(
        bibleKeywordSearch.trim()
      );

			const request = await fetch(url, {
				method: "GET",
				headers: {
					"api-key": `${process.env.NEXT_PUBLIC_BIBLE_API_KEY}`,
					Accept: "application/json"
				}
			});

			if (!request.ok) {
				const errorData = await request.json();
				console.error(`HTTP error! Status: ${request.status}`, errorData);
				return;
			}

			const { data } = await request.json();

			setBibleKeywordResults(data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<form
				onSubmit={handleKeywordSearchSubmit}
				className="w-full flex flex-col">
				<div className="w-full">
					<label
						className="dark:text-gray-50 mb-2 inline-block text-leading-6 text-gray-800"
						htmlFor="blog_search_term">
						Ingresa una palabra clave y oprime enter. Para limpiar la búsqueda,
						solo vacía el campo.
					</label>
					<div className="relative">
						<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
							<svg
								className="w-4 h-4 text-orange-700 dark:text-gray-950"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 20 20">
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
								/>
							</svg>
						</div>
						<input
							className="block w-full lg:w-4/6 py-4 px-10  text-sm text-gray-900 border border-orange-300 rounded-2xl bg-orange-50 focus:ring-orange-300 focus:border-orange-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 focus-visible:outline-orange-300 dark:focus-visible:outline-gray-500"
							id="blog_search_term"
							type="search"
							placeholder="e.j. Amor del padre"
							onChange={handleKeywordChange}
							value={bibleKeywordSearch}
						/>
					</div>
				</div>
			</form>
			<BibleSearchResultList bibleId={bibleId} results={bibleKeywordResults?.verses} />
		</>
	);
}
