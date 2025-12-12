import JumbotronSection from "@/components/JumbotronSection";

export default function MisionVisionPage() {
  return (
		<main>
			<JumbotronSection
				section="Misión y Visión"
				description="Conoce nuestra misión y visión."
			/>
			<section className="py-16 bg-white dark:bg-black text-black dark:text-white">
				<div className="max-w-[80ch] mx-auto px-4 sm:px-6 lg:px-8">
					<p className="text-lg lg:text-xl leading-8 mb-12">
						Fruto del Espíritu tiene la visión de proveer un espacio en línea
						donde las personas puedan encontrar inspiración y recursos para
						vivir una vida plena y significativa basada en los valores
						cristianos. Nos esforzamos por ser una comunidad inclusiva y
						acogedora que fomente el crecimiento espiritual y personal de cada
						individuo.
					</p>
					<p className="text-base lg:text-xl text-gray-600 dark:text-gray-400  mb-6">
						<b className="text-black dark:text-white">Nuestra misión</b> es compartir el mensaje del amor y la
						esperanza a través de contenido relevante y actividades que
						promuevan el bienestar integral. Creemos en el poder transformador
						de la fe y buscamos impactar positivamente la vida de quienes nos
						visitan, guiándolos en su camino espiritual.
					</p>
					<p className="text-base lg:text-xl text-gray-600 dark:text-gray-400  mb-6">
						<b className="text-black dark:text-white">Nuestra visión</b> es ser reconocidos como un recurso confiable y
						valioso para aquellos que buscan fortalecer su fe y vivir de acuerdo
						con los principios cristianos. A través de nuestro compromiso con la
						excelencia y la autenticidad, aspiramos a construir una comunidad
						vibrante y solidaria que refleje los frutos del espíritu en cada
						aspecto de nuestra labor.
					</p>
					<p className="text-base lg:text-xl mt-16 underline underline-offset-4">
						<b>Cándidamente</b>, equipo de <i>Fruto del Espíritu</i>
					</p>
				</div>
			</section>
		</main>
	);
}
