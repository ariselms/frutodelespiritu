import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { isAuthenticated } from "@/helpers/server";

export async function POST(
	request: Request,
	{ params }: { params: Promise<{ id: number; listId: string }> }
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

	const { id, listId } = await params;

	// get the body of the request
	const { memorizationData } = await request.json();

	const {
		by_user_id,
		bible_id,
		book_id,
		chapter_id,
		verse_from,
		verse_to,
		passage_text,
		bible_book,
		bible_name,
    note_title,
    note_content
	} = memorizationData;

	if (!id) {
		return NextResponse.json(
			{
				success: false,
				message: "Data insuficiente.",
				data: null
			},
			{ status: 400 }
		);
	}

	if (!listId) {
		return NextResponse.json(
			{
				success: false,
				message: "Data insuficiente.",
				data: null
			},
			{ status: 400 }
		);
	}

	// check if the user have saved the same memory item before
	const { rows: memoryItemExist } = await sql`
    SELECT * FROM learning_item
    WHERE
      learning_list_id = ${listId} AND
      by_user_id = ${by_user_id} AND
      bible_id = ${bible_id} AND
      book_id = ${book_id} AND
      chapter_id = ${chapter_id} AND
      verse_from = ${verse_from} AND
      verse_to = ${verse_to} AND
      passage_text = ${passage_text} AND
      bible_book = ${bible_book} AND
      bible_name = ${bible_name}
  `;

	if (memoryItemExist.length === 0) {
		// If relationshipData.length > 0, the item is in the list AND you have the data.
    return NextResponse.json(
      {
        success: false,
        message: "El versículo no está en la lista de aprendizaje.",
        data: null
      },
      { status: 200 }
    );
	}

	return NextResponse.json(
		{
			success: true,
			message: "El versículo no está en la lista de aprendizaje.",
			data: memoryItemExist[0]
		},
		{ status: 200 }
	);
}
