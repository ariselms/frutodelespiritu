import { BibleDataType } from "@/models/bibleTypes";
import RoundedButtonWithLordIcon from "@/components/RoundedButton";

export const SpanishBibleItem = ({ bible }: { bible: BibleDataType }) => {

	return (
		<div
			className="bg-sky-50 dark:bg-gray-900/50 border border-sky-200 dark:border-gray-600 rounded-2xl p-4 flex flex-col h-full"
			key={bible?.id}>
			<h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
				{bible?.name}
			</h5>
			<div className="flex justify-start pr-10 pb-4">
				<RoundedButtonWithLordIcon
					text="Abrir Biblia"
					route={`/biblia/libros/${bible.id}?booksView=Detallada`}
				/>
			</div>
		</div>
	);
};
