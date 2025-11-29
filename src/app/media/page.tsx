import JumbotronSection from "@/components/JumbotronSection";
import BibleEverywhere from "@/components/bible/BibleEverywhere";

export default function MediaPage(){

    const biblePassage = {
      translation: null,
      book: null,
      chapter: null,
      verse_from: null,
      verse_to: null,
      passage_text: null
    }

    return (
			<main>
        <JumbotronSection
          section="Media"
          description="Elige versículos bíblicos y descárgalos para tus proyectos de video, audio y multimedia o comparte en las redes."
        />
				<div className="max-w-7xl mx-auto py-8 px-2 xl:px-0 flex flex-col lg:flex-row gap-8 lg:gap-16">
          <aside className="w-full lg:w-1/3">
            <h2 className="text-xl mb-2">Elige un versículo bíblico:</h2>
            <BibleEverywhere />
          </aside>
          <div>

          </div>
        </div>
			</main>
		);
}