import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { isAuthenticated } from "@/helpers/server";

export const dynamic = "force-dynamic";

// get a single item_list

// delete a single list
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

	const { rows: deletedList } = await sql`DELETE FROM memory_list WHERE id = ${listId} RETURNING *;`;

  console.log("Deleted list: ", deletedList);

	if (deletedList.length === 0) {
		return NextResponse.json(
			{
				success: false,
				message: "List not found.",
				data: null
			},
			{ status: 404 }
		);
	}

	return NextResponse.json(
		{
			success: true,
			message: "List deleted successfully.",
			data: deletedList[0]
		},
		{ status: 200 }
	);
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
        message: "List not found.",
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
