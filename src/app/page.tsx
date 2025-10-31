import MainJumbotron from "@/components/JumbotronMain";
import HomePageCard from "@/components/content/HomePageCards";
import { AlertBanner } from "@/components/AlertBanner";
import {
	HomePageCardDescription
} from "@/components/content/ContentHelpers";

export default async function Home() {
	return (
		<main className="relative">
			<AlertBanner
				type="info"
				message="Contamos con 8 biblias disponibles en español para tu beneficio. Muy pronto tendrás la habilidad de tomar notas y guradar listas para memorizar la palabra de Dios. Gracias por tu paciencia."
			/>

			<MainJumbotron />

			<div className="bg-white dark:bg-gray-800 pb-28">
				<HomePageCard
					title="Lee y Estudia La Biblia"
					description={
						<HomePageCardDescription
							firstParagraph="La Biblia es la herramienta del creyente. Es importante vivirla, por lo tanto es importante estudiarla. Con 8 biblias disponibles en español, puedes elegir la que mejor te guste. Puedes tomar notas, crear listas de memorización dinámicas y mucho más."
							btnLink="/biblia"
							btnText="Elige tu Biblia"
						/>
					}
					firstImgUrl="/images/bible.svg"
					firstImgUrlAlt="Biblia"
					secondImgUrl="/images/church.svg"
					secondImgUrlAlt="Iglesia"
				/>

				<HomePageCard
					title="Lecturas Bíblicas"
					description={
						<HomePageCardDescription
							firstParagraph="Encuentra lecturas basadas en la bibla para aprender y crecer en la fe. Elige entre una variedad de temas edificantes con oraciones guías que te ayudan tanto a cultivar como a crecer en la fe. Puedes leerlas, compartirlas, o guardarlas para futuras referencias."
							btnLink="/lecturas?page=1&limit=10"
							btnText="Leer Lecturas"
						/>
					}
					firstImgUrl="/images/cross-in-hand.svg"
					firstImgUrlAlt="Biblia"
					secondImgUrl="/images/cross-with-flowers.svg"
					secondImgUrlAlt="Iglesia"
				/>
			</div>
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
