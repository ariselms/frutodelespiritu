import { sql } from "@vercel/postgres";
import Link from "next/link";

// TODO: import the Modal logic for the memory mode feature, create a standalone component that I can use by passing the list of memory items
import BibleMemoryMode from "@/components/bible/BibleMemoryMode";
import MemoryOrNoteItemList from "@/components/bible/MemoryOrNoteItemList";

export default async function ({
	params
}: {
	params: Promise<{ listId: string }>;
}) {
	let memoryOrNotelist: any = {};

	const { listId } = await params;

	const { rows: learningList } =
		await sql`SELECT * FROM learning_list WHERE id = ${listId}`;

	const { rows: memoryListItems } = await sql`
    SELECT * FROM learning_item WHERE
    learning_list_id = ${listId};
  `;

	if (learningList && (memoryListItems)) {
		memoryOrNotelist = {
			listInfo: learningList[0],
			memoryItemsList: memoryListItems.length > 0 ? memoryListItems : []
		};
	}

	return (
		<div className="w-full bg-white dark:bg-gray-800 text-blue-950 dark:text-gray-50">
			<section className="container mx-auto p-4 text-lg">
				<div className="flex items-center flex-wrap justify-between gap-x-1">
					<Link
						href="/perfil/biblia"
						className="text-blue-900 hover:text-blue-800 dark:text-gray-100 dark:hover:text-gray-200 underline underline-offset-4 my-4 flex items-center">
						&larr; Volver a Mis Listas de Aprendizaje
					</Link>

					{memoryOrNotelist?.memoryItemsList?.length > 0 && (
						<BibleMemoryMode bibleData={memoryOrNotelist?.memoryItemsList} />
					)}
				</div>

				<h1 className="text-2xl my-4 md:mt-0 md:mb-2">
					<span className="flex items-center">
						{memoryOrNotelist?.listInfo?.name}
					</span>
				</h1>

				<p className="text-gray-500 dark:text-gray-300">
					{memoryOrNotelist?.listInfo?.description}
				</p>
			</section>

			<section className="container mx-auto p-4 text-lg">
				<MemoryOrNoteItemList
					memoryOrNoteListItems={memoryOrNotelist.memoryItemsList}
				/>
			</section>
		</div>
	);
}
