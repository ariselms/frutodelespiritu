"use client";

import { Dropdown, DropdownItem } from "flowbite-react";
import { HiBookOpen } from "react-icons/hi";
import { useState, useEffect } from "react";
import { BibleDataType } from "@/models/bibleTypes";
import { useParams, useRouter } from "next/navigation";

export default function InLectureBibleSelection({
	chapterDetails
}: {
	chapterDetails: any;
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

          const url = "https://bible.helloao.org/api/available_translations.json";

          const bibleRequest = await fetch(url);

          const bibleResponse = await bibleRequest.json();

          console.log(bibleResponse)

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
console.log(chapterDetails.book.id);
console.log(chapterDetails.chapter.number);
	const handleBibleSelection = ({ bId }: { bId: string }) => {
		console.log(
			"URL: ",
			`/biblia/libros/capitulos/versiculos/${bId}/${chapterDetails?.book.id}/${chapterDetails?.chapter?.number}`
		);
		push(`/biblia/libros/capitulos/versiculos/${bId}/${chapterDetails?.book.id}/${chapterDetails?.chapter?.number}`);
	};

	return (
		<Dropdown
			className="rounded-2xl border border-orange-300 dark:border-gray-600 bg-orange-50 hover:bg-orange-100 dark:bg-gray-900 dark:hover:bg-gray-800 px-5 py-1 font-bold text-orange-700 dark:text-gray-50 inline-flex items-center transition-all text-md"
			label={currentBible}
			dismissOnClick={true}>

			{isLoading && <DropdownItem>Loading...</DropdownItem>}

			{!isLoading &&
				spanishBibles.map((bible) => (
					<DropdownItem
						onClick={() => handleBibleSelection({ bId: bible.id })}
						key={bible.id}
						icon={HiBookOpen}>
						{bible.name}
					</DropdownItem>
				))}
		</Dropdown>
	);
}
