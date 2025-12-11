import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres"; // Import 'db' for transactions
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

  console.log("Deleting list and related items for listId:", listId);

  try {


    await sql`
      DELETE FROM learning_item
      WHERE learning_list_id = ${listId}
    `;

    // delete item from learning_item table in cascade
    const { rows: itemToDelete } = await sql`
      DELETE FROM
        learning_list WHERE
        id = ${listId}
      RETURNING *
    `;

    if(itemToDelete.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No se encontraron elementos para eliminar.",
          data: null
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Elementos de la lista eliminados correctamente.",
        data: itemToDelete[0]
      },
      { status: 200 }
    );


  } catch (error) {

    console.error("Transaction failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "A ocurrido un error. Inténtalo de nuevo.",
        data: null
      },
      { status: 500 }
    );
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
    SELECT * FROM learning_list
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
    UPDATE learning_list
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
