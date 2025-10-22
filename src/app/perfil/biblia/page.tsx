"use client";
import { TabItem, Tabs } from "flowbite-react";
import { FaBrain } from "react-icons/fa";
import { FaStickyNote } from "react-icons/fa";
import MemorizationListComponent from "@/components/notes-and-memorization/MemorizationListComponent";
import { NotesAndMemoryTabTheme } from "@/components/theme";
import NotesListComponent from "@/components/notes-and-memorization/NotesListComponent";

export default function UserBiblePage() {
	return (
		<main className="dark:bg-gray-800">
			<article className="container mx-auto px-2 text-black dark:text-white py-8">
				<Tabs
					theme={NotesAndMemoryTabTheme}
					className="mb-0"
					aria-label="Full width tabs"
					variant="default">
					<TabItem active title="Listas de Memorización" icon={FaBrain}>
						<MemorizationListComponent />
					</TabItem>
					<TabItem title="Notas de la Biblia" icon={FaStickyNote}>
						<NotesListComponent />
					</TabItem>
				</Tabs>
			</article>
		</main>
	);
}
