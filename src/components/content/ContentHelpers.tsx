import Link from "next/link";
import { BtnLinkBtnTextProps } from "@/models/componentTypes";

export const HomePageCardDescription = ({
	firstParagraph,
	secondParagraph,
	btnLink,
	btnText
}: BtnLinkBtnTextProps) => (
	<>
		<p>{firstParagraph}</p>
		<p>{secondParagraph}</p>
		<Link href={btnLink} className={ContentWithImagesBtnStyles}>
			{btnText}
		</Link>
	</>
);

const ContentWithImagesBtnStyles: string =
	"inline-block mt-6 p-5 text-sm font-medium text-center text-white dark:text-gray-50 rounded-2xl cursor-pointer bg-sky-700 dark:bg-gray-900 hover:bg-sky-600 dark:hover:bg-gray-800 focus:ring-4 focus:ring-sky-300  dark:focus:ring-gray-800 transition-all duration-300 ease-in border border-sky-100 dark:border-gray-600";