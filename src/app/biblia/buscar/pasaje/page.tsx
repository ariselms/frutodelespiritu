import BibleHeaderSection from "@/components/layout/BibleSection";

export default function BuscarPasajeBibliaPage() {
  return (
		<main>
			<section className="w-full dark:bg-gray-900 text-gray-800">
				<div className="max-w-7xl mx-auto py-8 px-2 xl:px-0">
					<BibleHeaderSection section="Buscar pasajes de la Biblia" />
				</div>
			</section>
		</main>
	);
}