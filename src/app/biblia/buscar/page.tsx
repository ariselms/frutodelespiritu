// TODO: use bible passages API to search for a specific bible passage
// TODO: add the functionality to create cards to share on Social Media

import BibleHeaderSection from "@/components/layout/BibleSection";

export default async function BuscarBibliaPage() {
	return (
		<main>
			<section className="w-full dark:bg-gray-900 text-gray-800">
				<div className="max-w-7xl mx-auto py-16 px-2 xl:px-0">
					<BibleHeaderSection section="Buscar en la Biblia" />
				</div>
			</section>
		</main>
	);
}