import { BtnLinkBtnTextProps } from "@/models/componentTypes";
import RoundedButtonWithLordIcon from "@/components/RoundedButton";

export const HomePageCardDescription = ({
	firstParagraph,
	btnLink,
	btnText
}: BtnLinkBtnTextProps) => (
	<>
		<p>{firstParagraph}</p>
    <RoundedButtonWithLordIcon
      text={btnText}
      route={btnLink}
    />
	</>
);