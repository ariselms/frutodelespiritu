"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Label, Radio } from "flowbite-react";
import { SearchResultList } from "./SearchResults";

// TODO: Create a type for categories if needed
export function BibleSearch() {
    // TODO: searchType.Range - the user will have the option to:
    // 1. Select a bible
    // 2. Select a bible book
    // 3. Select a chapter range with number and verse
    // 4. See tje results

    // TODO: searchType.Keyword - the user will have the option to:
    // 1. Select a bible
    // 2. Input a keyword
    // 3. See result

    const router = useRouter();
    const [searchType, setSearchType] = useState<string>("Keyword");
    const [spanishBibles, setSpanishBibles] = useState([])
    const [selectedBibleBooks, setSelectedBibleBooks] = useState([])
    const [selectedBookChapter, setSelectedBookChapter] = useState("")
    const [chapterRange, setChapterRange] = useState("")
    const [bibleKeywordSearch, setBibleKeywordSearch] = useState("");
    const [bibleKeywordResults, setBibleKeywordResults] = useState<any>();

    const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBibleKeywordSearch(event.target.value)
    };

    const handleKeywordSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            // url to request bible term:
            const url = `https://api.scripture.api.bible/v1/bibles/592420522e16049f-01/search?query=${bibleKeywordSearch}&limit=20`;

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

            const {data} = await request.json();

            setBibleKeywordResults(data);

        } catch (error) {

            console.log(error);

          }
    };

    const handleSearchTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(event.target.value)
        setSearchType(event.target.value)
    };

    console.log("Search results:", bibleKeywordResults?.verses);

    return (
			<>
				<form onSubmit={handleKeywordSubmit} className="w-full flex flex-col">
					<div className="w-full mb-4">
						<p className="dark:text-gray-50 mb-2 inline-block text-sm">
							Elige que tipo de búsqueda quieres
						</p>
						<div className="flex">
							<div className="flex items-center flex-wrap gap-2">
								<div className="flex items-center border rounded-lg p-4 border-orange-300 dark:border-gray-600 bg-orange-50 dark:bg-gray-700">
									<Radio
										color="black"
										onChange={handleSearchTypeChange}
										name="searchType"
										value="Keyword"
										checked={searchType === "Keyword"}
										className="mr-2 border-orange-500 checked:bg-orange-500 checked checked:ring-orange-500 dark:border-gray-900 dark:checked:bg-gray-900 dark:checked:ring-gray-900"
									/>
									<Label htmlFor="All">Palabra Clave</Label>
								</div>
								<div className="flex items-center border rounded-lg p-4 border-orange-300 dark:border-gray-600 bg-orange-50 dark:bg-gray-700">
									<Radio
										color="black"
										onChange={handleSearchTypeChange}
										name="searchType"
										value="Range"
										checked={searchType === "Range"}
										className="mr-2 border-orange-500 checked:bg-orange-500 checked checked:ring-orange-500 dark:border-gray-900 dark:checked:bg-gray-900 dark:checked:ring-gray-900"
									/>
									<Label htmlFor="All">Rango de versículos</Label>
								</div>
							</div>
						</div>
					</div>
					{searchType === "Keyword" && (
						<div className="w-full">
							<label
								className="dark:text-gray-50 mb-2 inline-block text-sm"
								htmlFor="blog_search_term">
								Ingresa una palabra clave y oprime enter. Para limpiar la
								búsqueda, solo vacía el campo.
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
									<svg
										className="w-4 h-4 text-orange-500 dark:text-gray-300"
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
									className="block w-full lg:w-4/6 p-4 ps-10 text-sm text-gray-900 border border-orange-300 rounded-lg bg-orange-50 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 focus-visible:outline-orange-500 dark:focus-visible:outline-gray-500"
									id="blog_search_term"
									type="search"
									placeholder="e.j. Amor del padre"
									onChange={handleKeywordChange}
									value={bibleKeywordSearch}
								/>
							</div>
						</div>
					)}
				</form>
        <SearchResultList results={bibleKeywordResults?.verses} />
			</>
		);
}
