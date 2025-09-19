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
