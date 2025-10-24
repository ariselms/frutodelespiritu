import { NextResponse } from "next/server";
import { db, sql } from "@vercel/postgres"; // Import 'db' for transactions
import { isAuthenticated } from "@/helpers/server";

export const dynamic = "force-dynamic";

// 1. Define the shape of the row we expect from the join table.
//    Change 'string' to 'number' if your ID is a number/serial.
type ItemIdRow = {
  memory_item_id: number;
}

// delete a single list and its related items
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ listId: string }> }
) {
  const userAuthenticated = await isAuthenticated();

  if (!userAuthenticated) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized",
        data: null
      },
      { status: 401 }
    );
  }

  const { listId } = await params;

  const client = await db.connect();

  try {
    // Start the transaction
    await client.query("BEGIN");

    // 1. Find all memory_item IDs related to this list
    //    We use the <ItemIdRow> generic here
    const { rows: itemsToDelete } = await client.sql<ItemIdRow>`
      SELECT memory_item_id FROM memory_list_item_join WHERE memory_list_id = ${listId};
    `;

    // Because of <ItemIdRow>, 'itemIds' is now correctly typed as 'string[]' (or 'number[]')
    const itemIds: number[] = itemsToDelete.map((item) => item.memory_item_id);

    // 2. Delete the relationships from the join table
    await client.sql`
      DELETE FROM memory_list_item_join WHERE memory_list_id = ${listId};
    `;

    // 3. Delete the actual memory_item records
    if (itemIds.length > 0) {
      // This query now works because 'itemIds' is not 'any[]'
      await client.query(`
        DELETE FROM memory_item WHERE id = ANY($1::int[]);
      `, [itemIds]);
    }

    // 4. Delete the parent list itself
    const { rows: deletedList } = await client.sql`
      DELETE FROM memory_list WHERE id = ${listId} RETURNING *;
    `;

    // If no list was found and deleted, roll back and return 404
    if (deletedList.length === 0) {
      await client.query("ROLLBACK");
      return NextResponse.json(
        {
          success: false,
          message: "List not found.",
          data: null
        },
        { status: 404 }
      );
    }

    // If all deletions were successful, commit the transaction
    await client.query("COMMIT");

    return NextResponse.json(
      {
        success: true,
        message: "List and all associated items deleted successfully.",
        data: deletedList[0]
      },
      { status: 200 }
    );
  } catch (error) {
    // If any error occurs, roll back all changes
    await client.query("ROLLBACK");
    console.error("Transaction failed:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while deleting the list.",
        data: null
      },
      { status: 500 }
    );
  } finally {
    // Always release the client back to the pool
    client.release();
  }
}

export async function PUT(
	request: Request,
	{ params }: { params: Promise<{ listId: string }> }
) {

  const userAuthenticated = await isAuthenticated();

  if (!userAuthenticated) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized",
        data: null
      },
      { status: 401 }
    );
  }

  const { listId } = await params;

  if(!listId) {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
        data: null
      },
      { status: 404 }
    );
  }

  const body = await request.json();

  const { by_user_id, name, description } = body;

  const {rows: MemoryListExists} = await sql`
    SELECT * FROM memory_list
      WHERE id = ${listId} AND by_user_id = ${by_user_id}
  `;

  if(MemoryListExists.length === 0) {
    return NextResponse.json(
      {
        success: false,
        message: "List not found.",
        data: null
      },
      { status: 404 }
    );
  }

  const { rows: updatedList } = await sql`
    UPDATE memory_list
      SET name = ${name}, description = ${description}
      WHERE id = ${listId} AND by_user_id = ${by_user_id}
      RETURNING *
  `;

  return NextResponse.json(
    {
      success: true,
      message: "List updated successfully.",
      data: updatedList[0]
    },
    { status: 200 }
  );
};
