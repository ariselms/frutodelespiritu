"use client";

import { useState, useEffect } from "react";
import { BibleSearchResultList } from "./BibleSearchResultList";
import { useSearchParams, useRouter } from "next/navigation";
import { FetchEndpoints } from "@/static";

// TODO: CREATE AN ENDPOINT FOR SEARCHING IN THE SELECTED BIBLES
// TODO: ADD THE SELECTED BIBLE COMPONENT TO THIS PAGE

export function BibleSearch({ bibleId }: { bibleId: string }) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const [isLoading, setIsLoading] = useState(false);

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
			setIsLoading(true);

			// url to request bible term:
			const url = FetchEndpoints.BibleApiBase.SearchBibleVerses(
				bibleKeywordSearch.trim()
			);

			const requestBibleSearch = await fetch(url, {
				method: "GET",
				headers: {
					"api-key": `${process.env.NEXT_PUBLIC_BIBLE_API_KEY}`,
					Accept: "application/json"
				}
			});

			// 1. Call .json() only ONCE and await its result
			const responseData = await requestBibleSearch.json();

			if (!responseData || !responseData.data) {
				setBibleKeywordResults(null);
				return;
			}

			// 2. Now you can use the 'responseData' variable as much as you want
			console.log("Full response:", responseData);

			const { data } = responseData; // Destructure the data from the variable

			setBibleKeywordResults(data);

		} catch (error) {

			console.error(error);

		} finally {

			setIsLoading(false);

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
								className="w-4 h-4 text-blue-700 dark:text-gray-950"
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
							className="block w-full lg:w-4/6 py-4 px-10  text-sm text-gray-900 border border-blue-100 rounded-2xl bg-blue-50 focus:ring-blue-300 focus:border-blue-100 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 focus-visible:outline-blue-300 dark:focus-visible:outline-gray-500"
							id="blog_search_term"
							type="search"
							placeholder="e.j. Amor del padre"
							onChange={handleKeywordChange}
							value={bibleKeywordSearch}
						/>
					</div>
				</div>
			</form>

			{isLoading && <p className="text-black dark:text-white mt-4">Buscando resultados...</p>}

			{!isLoading && bibleKeywordResults?.verses?.length === 0 || bibleKeywordResults === null && (
				<p className="text-black dark:text-white mt-4">No se encontraron resultados.</p>
			)}

			{!isLoading && bibleKeywordResults?.verses?.length === 1 && (
				<p className="text-black dark:text-white mt-4">Se encontró 1 resultado.</p>
			)}

			{!isLoading &&
				bibleKeywordResults?.verses?.length > 1 && (
					<p className="text-black dark:text-white mt-4">
						Mostrando {bibleKeywordResults?.verses?.length} resultados.
					</p>
			)}

			<BibleSearchResultList
				bibleId={bibleId}
				results={bibleKeywordResults?.verses}
			/>

		</>
	);
}
