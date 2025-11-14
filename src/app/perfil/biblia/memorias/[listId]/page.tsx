import { sql } from "@vercel/postgres";
import { MemoryOrNoteItemList } from "@/components/bible/MemoryOrNoteItemList";
import Link from "next/link";

// TODO: import the Modal logic for the memory mode feature, create a standalone component that I can use by passing the list of memory items
import BibleMemoryMode from "@/components/bible/BibleMemoryMode";

export default async function ({
	params
}: {
	params: Promise<{ listId: string }>;
}) {
	let memoryOrNotelist: any = {};

	const { listId } = await params;

	const { rows: memoryList } =
		await sql`SELECT * FROM learning_list WHERE id = ${listId}`;

	const { rows: memoryListItems } = await sql`
    SELECT
      mi.*
    FROM
      memory_item mi
    JOIN
      learning_list_memory_item_join mlij ON mi.id = mlij.memory_item_id
    JOIN
      learning_list ml ON mlij.memory_list_id = ml.id
    WHERE
      ml.id = ${listId};
  `;

	if (memoryList && memoryListItems) {
		memoryOrNotelist = {
			listInfo: memoryList[0],
			listItems: memoryListItems.length > 0 ? memoryListItems : []
		};
	}

	return (
		<div className="w-full bg-white dark:bg-gray-800 text-sky-950 dark:text-gray-50">
			<section className="container mx-auto p-4 text-lg">
				<div className="flex items-center flex-wrap justify-between gap-x-1">
					<Link
						href="/perfil/biblia"
						className="text-sky-900 hover:text-sky-800 dark:text-gray-100 dark:hover:text-gray-200 underline underline-offset-4 my-4 flex items-center">
						&larr; Volver a Mis Listas de Aprendizaje
					</Link>

					{memoryOrNotelist?.listItems?.length > 0 && (
						<BibleMemoryMode bibleData={memoryOrNotelist?.listItems} />
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
					memoryOrNoteListItems={memoryOrNotelist.listItems}
				/>
			</section>
		</div>
	);
}
