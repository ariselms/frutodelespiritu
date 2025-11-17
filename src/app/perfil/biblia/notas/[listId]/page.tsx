import { sql } from "@vercel/postgres";
import MemoryOrNoteItemList from "@/components/bible/MemoryOrNoteItemList";
import Link from "next/link";

export default async function ({
	params
}: {
	params: Promise<{ listId: string}>;
}) {
  let memoryOrNotelist: any = {};

  const { listId } = await params

  const {rows: noteList} = await sql`SELECT * FROM note_list WHERE id = ${listId}`;

  const { rows: noteListItems } = await sql`
    SELECT
      ni.*
    FROM
      note_item mi
    JOIN
      note_list_item_join nlij ON ni.id = nlij.note_item_id
    JOIN
      note_list ml ON nlij.note_list_id = nl.id
    WHERE
      nl.id = ${listId};
  `;

  if(noteList && noteListItems) {
    memoryOrNotelist = {
      listInfo: noteList[0],
      listItems: noteListItems.length > 0 ? noteListItems : []
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
					<strong>Nombre de Lista:</strong> {memoryOrNotelist?.listInfo?.name}
				</h1>
				<p>
					<strong>Descripción:</strong>{" "}
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
