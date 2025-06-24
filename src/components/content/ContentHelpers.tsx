import { Button } from "flowbite-react";
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

const ContentWithImagesBtnStyles: string = "inline-block mt-6 px-5 py-3 text-sm font-medium text-center text-white rounded-lg cursor-pointer bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:ring-orange-300  dark:focus:ring-orange-800";