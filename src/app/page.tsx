import MainJumbotron from "@/components/JumbotronMain";
import ContentLeftTwoImagesRight from "@/components/content/ContentLeftTwoImagesRight";
import { ContentLeftTwoImagesRightDescription, ContentRightTwoImagesLeftDescription } from "@/components/content/ContentHelpers";
import ContentRightTwoImagesLeft from "@/components/content/ContentRightTwoImagesLeft";

export default async function Home() {
	return (
		<main>
			<MainJumbotron />
			<ContentLeftTwoImagesRight
				title="Lee La Biblia"
				description={
					<ContentLeftTwoImagesRightDescription
						firstParagraph="Lee la Biblia en nuestra plataforma libre de costo."
						secondParagraph="Nuestra plataforma es una herramienta de estudio para aprender y reflexionar sobre la Biblia."
						btnLink="/biblia"
						btnText="Lee la Biblia"
					/>
				}
				firstImgUrl="/images/bible.svg"
				firstImgUrlAlt="Biblia"
				secondImgUrl="/images/church.svg"
				secondImgUrlAlt="Iglesia"
			/>
			<ContentRightTwoImagesLeft
				title="Estudios"
				description={
					<ContentRightTwoImagesLeftDescription
						firstParagraph="Encuentra estudios y reflexiones para aprender y crecer en la fe."
						secondParagraph="Nuestra plataforma es una herramienta de estudio para aprender y reflexionar sobre la Biblia."
						btnLink="/estudios"
						btnText="Estudios"
					/>
				}
				firstImgUrl="/images/reading.svg"
				firstImgUrlAlt="Biblia"
				secondImgUrl="/images/studying.svg"
				secondImgUrlAlt="Iglesia"
			/>
			<ContentLeftTwoImagesRight
				title="Reflexiones"
				description={
					<ContentLeftTwoImagesRightDescription
						firstParagraph="Encuentra reflexiones y estudios para aprender y crecer en la fe."
						secondParagraph="Nuestra plataforma es una herramienta de estudio para aprender y reflexionar sobre la Biblia."
						btnLink="/reflexiones"
						btnText="Reflexiones"
					/>
				}
				firstImgUrl="/images/cross-in-hand.svg"
				firstImgUrlAlt="Biblia"
				secondImgUrl="/images/cross-with-flowers.svg"
				secondImgUrlAlt="Iglesia"
			/>
		</main>
	);
}