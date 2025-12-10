import { NextResponse } from "next/server";
import { isAuthenticated } from "@/helpers/server";
import { sql } from "@vercel/postgres";

export const dynamic = "force-dynamic";

export async function PUT(
	request: Request,
	{ params }: { params: Promise<{ itemId: string }> }
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

	const { itemId } = await params;

	if (!itemId) {
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

	const {
		bible_book,
		bible_id,
		bible_name,
		book_id,
		by_user_id,
		chapter_id,
		content,
		passage_text,
		title,
		verse_from,
		verse_to
	} = body;

	const { rows: MemoryItemExists } = await sql`
    SELECT * FROM learning_item
      WHERE id = ${itemId} AND by_user_id = ${by_user_id}
  `;

	if (MemoryItemExists.length === 0) {
		return NextResponse.json(
			{
				success: false,
				message: "Memory item not found.",
				data: null
			},
			{ status: 404 }
		);
	}

	const { rows: updatedMemoryItem } = await sql`
    UPDATE learning_item
      SET bible_book = ${bible_book},
          bible_id = ${bible_id},
          bible_name = ${bible_name},
          book_id = ${book_id},
          chapter_id = ${chapter_id},
          content = ${content},
          passage_text = ${passage_text},
          title = ${title},
          verse_from = ${verse_from},
          verse_to = ${verse_to}
      WHERE id = ${itemId} AND by_user_id = ${by_user_id}
      RETURNING *
  `;

	return NextResponse.json(
		{
			success: true,
			message: "Memory item updated successfully.",
			data: updatedMemoryItem[0]
		},
		{ status: 200 }
	);
}
