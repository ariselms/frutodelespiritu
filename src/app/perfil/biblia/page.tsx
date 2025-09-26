"use client";
import { TabItem, Tabs } from "flowbite-react";
import { FaBrain } from "react-icons/fa";
import { FaStickyNote } from "react-icons/fa";
import MemorizationListComponent from "@/components/memorization";
import { BibleNotesAndMemorizationTheme } from "@/components/theme";

export default function UserBiblePage() {
	return (
		<main className="dark:bg-gray-800">
			<article className="container mx-auto px-2 text-black dark:text-white py-8">
				<Tabs theme={BibleNotesAndMemorizationTheme} aria-label="Full width tabs" variant="fullWidth">
					<TabItem active title="Listas de Memorización" icon={FaBrain}>
						<MemorizationListComponent />
					</TabItem>
					<TabItem title="Notas de la Biblia" icon={FaStickyNote}>
						Esta función estará disponible pronto.
					</TabItem>
				</Tabs>
			</article>
		</main>
	);
}
