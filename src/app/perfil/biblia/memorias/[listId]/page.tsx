import { sql } from "@vercel/postgres";
import { MemoryOrNoteItemList } from "@/components/bible/MemoryOrNoteItemList";
import Link from "next/link";
import { LordIconRevealOnLoad } from "@/components/animations/lordicon";
import LOTTIE_BRAIN_IN_REVEAL from "@/lotties/brain-in-reveal.json";

export default async function ({
	params
}: {
	params: Promise<{ listId: string}>;
}) {
  let memoryOrNotelist: any = {};

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

    memoryOrNotelist = {
      listInfo: memoryList[0],
      listItems: memoryListItems.length > 0 ? memoryListItems : []
    };

  }

	return (
		<div className="w-full bg-white dark:bg-gray-800 text-sky-950 dark:text-gray-50">
			<section className="container mx-auto p-4 text-lg">
				<Link
					href="/perfil/biblia"
					className="text-sky-900 hover:text-sky-800 dark:text-gray-100 dark:hover:text-gray-200 underline underline-offset-4 mt-4 mb-7 flex items-center">
					&larr; Volver a Mis Listas de Memorización
          <LordIconRevealOnLoad
            size={48}
            ICON_SRC={LOTTIE_BRAIN_IN_REVEAL}
            state="in-reveal"
            text=""
          />
				</Link>

				<h1 className="text-2xl mb-2">
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
