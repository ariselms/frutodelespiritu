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
			<main className="bg-white dark:bg-gray-800">
				<JumbotronSection
					section="Media"
					description="Elige versículos bíblicos y descárgalos para tus proyectos de video, audio y multimedia o comparte en las redes."
				/>
				<div className="max-w-7xl mx-auto py-8 px-2 xl:px-0 ">
					<div className="px-4 xl:px-0 w-full flex flex-col lg:flex-row gap-8 lg:gap-12">
						<aside className="flex-1 lg:flex-1">
							<BibleEverywhere />
						</aside>
						<aside className="flex-1 lg:flex-2">Content</aside>
					</div>
				</div>
			</main>
		);
}