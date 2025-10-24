import { sql } from "@vercel/postgres";
import { MemoryOrBibleNoteList } from "@/components/bible/MemoryOrBibleNoteList";
import Link from "next/link";

export default async function ({
	params
}: {
	params: Promise<{ listId: string}>;
}) {
  let memoryListData: any = {};

  const { listId } = await params

  const {rows: memoryList} = await sql`SELECT * FROM memory_list WHERE id = ${listId}`;

  const { rows: memoryListItems } = await sql`
    SELECT
      mi.*
    FROM
      memory_item mi
    JOIN
      memory_list_item_join mlij ON mi.id = mlij.memory_item_id
    JOIN
      memory_list ml ON mlij.memory_list_id = ml.id
    WHERE
      ml.id = ${listId};
  `;

  if(memoryList && memoryListItems) {

    memoryListData = {
      listInfo: memoryList[0],
      listItems: memoryListItems.length > 0 ? memoryListItems : []
    };

  }

	return (
		<div className="w-full bg-white dark:bg-gray-800 text-sky-950 dark:text-gray-50">
			<section className="container mx-auto p-4 text-lg">
				<Link
					href="/perfil/biblia"
					className="text-sky-900 hover:text-sky-800 dark:text-gray-100 dark:hover:text-gray-200 underline underline-offset-4 mt-4 mb-7 inline-block">
					&larr; Volver a Mis Listas de Memorización
				</Link>
				<h1>
					<strong>Nombre de Lista:</strong> {memoryListData?.listInfo?.name}
				</h1>
				<p>
					<strong>Descripción:</strong> {memoryListData?.listInfo?.description}
				</p>
			</section>
			<section className="container mx-auto p-4 text-lg">

				<MemoryOrBibleNoteList
          memoryListItems={memoryListData.listItems}
          memoryListInfo={memoryListData.listInfo}/>

			</section>
		</div>
	);
}
