"use client";

import { Dropdown, DropdownItem } from "flowbite-react";
import { useState, useEffect } from "react";
import { BibleDataType } from "@/models/bibleTypes";
import { useParams, useRouter } from "next/navigation";
import { DropdownBibleSelectionTheme } from "@/components/theme/";

export default function InLectureBibleSelection({
	ChapterDetails
}: {
	ChapterDetails: any;
}) {
	const [spanishBibles, setSpanishBibles] = useState<BibleDataType[]>([]);

	const [currentBible, setCurrentBible] = useState<string | null>(null);

	const [isLoading, setIsLoading] = useState(true);

	const { push } = useRouter();

	const { bibleId } = useParams();

	useEffect(() => {
		try {
			const getAllSpanishBibles = async () => {

				try {

					// TODO: Move this into a single function
					// Also used in BibliaPage() .page.tsx
					const url = "https://bible.helloao.org/api/available_translations.json";

					const bibleRequest = await fetch(url);

					const bibleResponse = await bibleRequest.json();

					if (bibleResponse?.translations?.length) {
						const filteredBibles = bibleResponse.translations.filter(
							(bible: BibleDataType) => bible.language === "spa"
						);
						setSpanishBibles(filteredBibles);

						const foundCurrentBible = filteredBibles.find(
							(bible: BibleDataType) => bible.id === bibleId
						);
						setCurrentBible(
							foundCurrentBible ? foundCurrentBible.name : "Select a Bible"
						);
					}
				} catch (err: any) {

					console.error("Error fetching or parsing bibles:", err);

					setCurrentBible("Error loading");

				} finally {

					setIsLoading(false);

				}
			};

			getAllSpanishBibles();

		} catch (error) {

			console.error(error);

		}
	}, [bibleId]); // <-- Important: Added bibleId dependency

	const handleBibleSelection = ({ bId }: { bId: string }) => {
		push(`/biblia/libros/capitulos/versiculos/${bId}/${ChapterDetails?.book.id}/${ChapterDetails?.chapter?.number}`);
	};

	return (
		<Dropdown
			theme={DropdownBibleSelectionTheme}
			className="rounded-2xl border border-blue-100 dark:border-gray-600 bg-blue-700 hover:bg-blue-800 dark:bg-gray-900 dark:hover:bg-gray-800 font-bold text-blue-50 dark:text-gray-50 flex items-center transition-all px-4 py-2 sm:mt-0 text-xs sm:text-base md:text-lg cursor-pointer"
			label={`${currentBible}`}
			dismissOnClick={true}>
			{isLoading && <DropdownItem>Loading...</DropdownItem>}

			{!isLoading &&
				spanishBibles.map((bible) => (
					<DropdownItem
						onMouseEnter={
							// add change to background color and text color on hover
							(e) => (
								e.currentTarget.style.backgroundColor = "#f0f9ff",
								e.currentTarget.style.color = "#111827"
							)
						}
						onMouseLeave={
							(e) => (
								e.currentTarget.style.backgroundColor = "transparent",
								e.currentTarget.style.color = "inherit"
							)
						}
						onClick={() => handleBibleSelection({ bId: bible.id })}
						key={bible.id}>
						{bible.name}
					</DropdownItem>
				))}
		</Dropdown>
	);
}
