import JumbotronSection from "@/components/JumbotronSection";

export default function ContactosPage() {
  return (
    <main>
      <JumbotronSection
        section="Contacto"
        description="Utiliza la siguiente información para ponerte en contacto con nosotros."
      />
      <section className="py-16 bg-white dark:bg-black text-black dark:text-white">
        <div className="max-w-[80ch] mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg lg:text-xl leading-8 mb-12">
            La información de contacto estará disponible aquí próximamente.
          </p>
          <p className="text-base lg:text-xl text-gray-600 dark:text-gray-400  mb-6">
            Agradecemos su paciencia mientras trabajamos para proporcionar los detalles
            de contacto.
          </p>
          <p className="text-base lg:text-xl mt-16 underline underline-offset-4">
            <b>Cándidamente</b>, equipo de <i>Fruto del Espíritu</i>
          </p>
        </div>
      </section>
    </main>
  );
}
