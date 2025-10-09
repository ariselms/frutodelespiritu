import MainJumbotron from "@/components/JumbotronMain";
import ContentLeftTwoImagesRight from "@/components/content/ContentLeftTwoImagesRight";
import ContentRightTwoImagesLeft from "@/components/content/ContentRightTwoImagesLeft";
import { AlertBanner } from "@/components/AlertBanner";
import {
	ContentLeftTwoImagesRightDescription,
	ContentRightTwoImagesLeftDescription
} from "@/components/content/ContentHelpers";

export default async function Home() {
	return (
		<main>
			<AlertBanner
				type="info"
				message="Contamos con 8 biblias disponibles en español para tu beneficio. Muy pronto tendrás la habilidad de tomar notas y guradar listas para memorizar la palabra de Dios. Gracias por tu paciencia."
			/>
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
						btnLink="/lecturas?category=1"
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
						btnLink="/lecturas?category=2"
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

// In a page.js or layout.js file, export a metadata object
export const metadata = {
	title:
		"Fruto del Espíritu - tu recurso de reflexiones (devocionales) y estudios bíblicos",
	description:
		"Bienvenido a Fruto del Espíritu, tu recurso de reflexiones y estudios bíblicos. Toma notas, guarda reflexiones y estudios bíblicos. Aprende a escribir sermones y prepárate de manera eficiente con nosotros utilizando modo estudio y muchos más. Descúbre mucho más en el nuevo y rediseñado Fruto del Espíritu.",
	keywords: [
		"devocionales",
		"cristiano",
		"reflexiones",
		"estudios bíblicos",
		"biblias en espanol",
		"la biblia en espanol",
		"biblia en espanol",
		"entiende la biblia",
		"espiritu santo",
		"aprende la biblia",
		"libros de la biblia reina valera 1960 en orden",
		"lista de libros de la biblia reina valera 1960",
		"tres significados de mundo en la biblia",
		"significados de mundo en la biblia"
	],
	robots: {
		index: true,
		follow: true
	},
	openGraph: {
		title:
			"Fruto del Espíritu - tu recurso de reflexiones (devocionales) y estudios bíblicos",
		description:
			"Bienvenido a Fruto del Espíritu, tu recurso de reflexiones y estudios bíblicos. Toma notas, guarda reflexiones y estudios bíblicos. Aprende a escribir sermones y prepárate de manera eficiente con nosotros utilizando modo estudio y muchos más. Descúbre mucho más en el nuevo y rediseñado Fruto del Espíritu.",
		url: "https://frutodelespiritu.com/lecturas",
		siteName: "Fruto del Espíritu",
		type: "website",
		locale: "es_US",
		images: [
			{
				url: "https://frutodelespiritu.com/images/logo.png",
				alt: "Fruto del Espíritu"
			}
		]
	}
};
