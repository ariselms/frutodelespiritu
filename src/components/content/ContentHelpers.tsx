import Link from "next/link";
import { BtnLinkBtnTextProps } from "@/models/componentTypes";

export const ContentLeftTwoImagesRightDescription = ({
	firstParagraph,
	secondParagraph,
	btnLink,
	btnText
} : BtnLinkBtnTextProps) => (
  <>
    <p>
			{firstParagraph}
    </p>
    <p>
			{secondParagraph}
    </p>
    <Link
      href={btnLink}
      className={ContentWithImagesBtnStyles}>
        {btnText}
    </Link>
  </>
);

export const ContentRightTwoImagesLeftDescription = ({
  firstParagraph,
  secondParagraph,
  btnLink,
  btnText
} : BtnLinkBtnTextProps) => (
  <>
    <p>
      {firstParagraph}
    </p>
    <p>
      {secondParagraph}
    </p>
    <Link
      href={btnLink}
      className={ContentWithImagesBtnStyles}>
        {btnText}
    </Link>
  </>
);

const ContentWithImagesBtnStyles: string = "inline-block mt-6 p-5 text-sm font-medium text-center text-white dark:text-gray-950 rounded-lg cursor-pointer bg-orange-700 dark:bg-gray-50 hover:bg-orange-600 dark:hover:bg-gray-200 focus:ring-4 focus:ring-orange-300  dark:focus:ring-gray-800 transition-all duration-300 ease-in";