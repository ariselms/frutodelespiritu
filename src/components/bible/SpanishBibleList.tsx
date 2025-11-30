import { BibleDataType } from "@/models/bibleTypes";
import RoundedButtonWithLordIcon from "@/components/RoundedButtonWithLordIcon";

export const SpanishBibleItem = ({ bible }: { bible: BibleDataType }) => {
	return (
		<div className="w-full px-4" key={bible?.id}>
			<RoundedButtonWithLordIcon
				text={bible?.name}
				route={`/biblia/libros/${bible.id}?booksView=Detallada`}
			/>
		</div>
	);
};
