import { sql } from "@vercel/postgres";

export default async function ({
	params
}: {
	params: Promise<{ listId: string}>;
}) {
  let memoryListData: any = {};

  const { listId } = await params

  const {rows: memoryList} = await sql`SELECT * FROM memory_list WHERE id = ${listId}`

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

  if(memoryList.length > 0 && memoryListItems.length > 0) {
    memoryListData = {listInfo: memoryList[0], listItems: memoryListItems}
  }

  console.log("Memory List Data: ", memoryListData);


	return (
		<>
			<h1>Lista: {memoryListData.listInfo.name}</h1>
			<p>{memoryListData.listInfo.description}</p>
		</>
	);
}
