import { useEffect, useState } from "react";

export default function ModalNotesAndMemorization({
	selectedVerses,
	setIsDrawerOpen
}: {
	selectedVerses: Set<string>;
	setIsDrawerOpen: (value: boolean) => void;
}) {
	const [isExtended, setIsExtended] = useState<string>("h-40");
  const [apiSelectedVerses, setApiSelectedVerses] = useState<Set<string>>(new Set());

  // get the selectedVerses and sort it from low to high, then set get the lowest and the highest and set it to the apiSelectedVerses
  useEffect(() => {
    const sortedSelectedVerses = Array.from(selectedVerses).sort();
    const lowestSelectedVerse = sortedSelectedVerses[0];
    const highestSelectedVerse = sortedSelectedVerses[sortedSelectedVerses.length - 1];
    setApiSelectedVerses(new Set([lowestSelectedVerse, highestSelectedVerse]));
  }, [selectedVerses]);

	return (
		<div
			className={`${isExtended} fixed left-0 right-0 top-0 bg-orange-100 dark:bg-gray-900 text-center z-80 overflow-auto m-2 rounded-2xl`}>
      <p>
        {apiSelectedVerses.size === 1 ? `Selected Verse: ${Array.from(apiSelectedVerses).map((verse) => verse)}` : `Selected Verses: ${Array.from(apiSelectedVerses).map((verse) => verse)}`}
      </p>
			<p className="w-[80ch] mx-auto">
				{Array.from(selectedVerses).map((verse, index) => (
					<span
						className="text-sm font-bold cursor-pointer"
						key={verse}
						onClick={() => setIsDrawerOpen(false)}>
						{verse}
						{index !== Array.from(selectedVerses).length - 1 && (
							<span className="mr-2">, </span>
						)}
					</span>
				))}
			</p>
		</div>
	);
}
