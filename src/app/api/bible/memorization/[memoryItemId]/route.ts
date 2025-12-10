import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { isAuthenticated } from "@/helpers/server";

export async function DELETE(
	request: Request,
	{ params }: { params: Promise<{ memoryItemId: string }> }
) {
	// Check if the user is authenticated
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

  // TODO: I also need the memory list id to delete the join table

	const { memoryItemId } = await params;
	// het userId and bibleId from search params

	const { searchParams } = new URL(request.url);
	const userId = searchParams.get("userId");
	const bibleId = searchParams.get("bibleId");

	const { rows: deletedMemoryItem } = await sql`DELETE FROM
    learning_item
    WHERE id = ${memoryItemId}
    AND by_user_id = ${userId}
    AND bible_id = ${bibleId} RETURNING *;`;

	if (deletedMemoryItem.length === 0) {

		return NextResponse.json(
			{
				success: false,
				message: "Versículos no encontrados",
				data: null
			},
			{ status: 404 }
		);

	}

  if(deletedMemoryItem.length > 0) {

    return NextResponse.json(
      {
        success: true,
        message: "Versículos eliminados correctamente.",
        data: deletedMemoryItem
      },
      { status: 200 }
    );

  }

	return NextResponse.json(
		{
			success: false,
			message: "Hubo un error. Inténtalo de nuevo.",
			data: deletedMemoryItem
		},
		{ status: 500 }
	);
}
