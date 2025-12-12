import JumbotronSection from "@/components/JumbotronSection";

export default function SobreNosotrosPage() {
	return (
		<main>
			<JumbotronSection
				section="Sobre Nosotros"
				description="Conoce más sobre nuestra misión, visión y valores que guían nuestro trabajo."
			/>
			<section className="py-16 bg-white dark:bg-black text-black dark:text-white">
				<div className="max-w-[80ch] mx-auto px-4 sm:px-6 lg:px-8">
					<p className="text-lg lg:text-xl leading-8 mb-12">
						Fruto del Espíritu es una organización dedicada a compartir valores
						cristianos a través de diversos recursos y actividades. Nuestra
						misión es fomentar el crecimiento espiritual y personal de cada
						persona que transita por nuestro sitio web. Creemos en la
						importancia de vivir una vida guiada por los principios del amor, la
						fe y la esperanza.
					</p>
					<p className="text-base lg:text-xl text-gray-600 dark:text-gray-400 mb-6">
						Nos esforzamos por crear herramientas digitales accesibles e
						intuitivas que faciliten el estudio profundo de las Escrituras. Ya
						sea a través de planes de lectura, listas de memorización
						personalizadas o artículos de reflexión teológica, nuestro objetivo
						es equipar a los creyentes con recursos prácticos. Queremos que la
						sabiduría bíblica se integre naturalmente en tu rutina diaria,
						ayudándote a cultivar un carácter que refleje a Cristo en medio de
						la era digital.
					</p>
					<p className="text-base lg:text-xl text-gray-600 dark:text-gray-400 mb-6">
						Más que una plataforma educativa, aspiramos a ser una comunidad
						donde la verdad y la gracia se encuentren. Soñamos con ver vidas
						transformadas que impacten positivamente a sus familias y entornos
						locales. Al enfocarnos en "El Fruto del Espíritu", buscamos que
						virtudes como la paciencia, la bondad y el dominio propio dejen de
						ser conceptos abstractos y se conviertan en la evidencia tangible de
						una fe viva en cada uno de nuestros usuarios.
					</p>
					<p className="text-base lg:text-xl mt-16 underline underline-offset-4 text-black dark:text-white">
						<b>Cándidamente</b>, equipo de <i>Fruto del Espíritu</i>
					</p>
				</div>
			</section>
		</main>
	);
}
