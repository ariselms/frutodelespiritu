"use client";
import { TabItem, Tabs } from "flowbite-react";
import { FaBrain } from "react-icons/fa";
import { FaStickyNote } from "react-icons/fa";
import LearningListComponent from "@/components/learning-lists/LearningListComponent";
import { NotesAndMemoryTabTheme } from "@/components/theme";
import GeneralNotesListComponent from "@/components/learning-lists/GeneralNotesListComponent";

export default function UserBiblePage() {
	return (
		<main className="dark:bg-gray-800">
			<article className="container mx-auto px-2 text-black dark:text-white py-8">
				<Tabs
					theme={NotesAndMemoryTabTheme}
					className="mb-0"
					aria-label="Full width tabs"
					variant="default">
					<TabItem
						active
						title="Listas de Aprendizaje"
						icon={FaBrain}>
						<LearningListComponent />
					</TabItem>
					<TabItem
						title="Notas Generales"
						icon={FaStickyNote}>
						<GeneralNotesListComponent />
					</TabItem>
				</Tabs>
			</article>
		</main>
	);
}
