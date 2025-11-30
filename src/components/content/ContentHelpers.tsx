import { BtnLinkBtnTextProps } from "@/models/componentTypes";
import RoundedButtonWithLordIcon from "@/components/RoundedButtonWithLordIcon";

export const HomePageCardDescription = ({
	firstParagraph,
	btnLink,
	btnText
}: BtnLinkBtnTextProps) => (
	<>
		<p className="">{firstParagraph}</p>
		<div className="px-4 mt-8">
			<RoundedButtonWithLordIcon text={btnText} route={btnLink} />
		</div>
	</>
);