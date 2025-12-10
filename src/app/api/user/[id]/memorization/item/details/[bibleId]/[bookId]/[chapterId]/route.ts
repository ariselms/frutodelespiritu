import { isAuthenticated } from "@/helpers/server";
import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(
	request: Request,
	{
		params
	}: {
		params: Promise<{
			id: string; // user id
			bibleId: string;
			bookId: string;
			chapterId: string;
		}>;
	}
) {
	const userAuthenticated = await isAuthenticated();

	if (!userAuthenticated) {
		return NextResponse.json(
			{
				success: false,
				message: "Unauthorized"
			},
			{
				status: 401
			}
		);
	}

	const { id, bibleId, bookId, chapterId } = await params;

	// Updated Query with LEFT JOIN
	const { rows: userSavedVerses } = await sql`
    SELECT
      mi.*,
      join_table.memory_list_id as learning_list_id,
      ll.name as learning_list_name
    FROM memory_item mi
    LEFT JOIN learning_list_memory_item_join join_table
      ON mi.id = join_table.memory_item_id
    LEFT JOIN learning_list ll
      ON join_table.memory_list_id = ll.id
    WHERE mi.by_user_id = ${id}
      AND mi.bible_id = ${bibleId}
      AND mi.book_id = ${bookId}
      AND mi.chapter_id = ${chapterId}
  `;

	return NextResponse.json({
		success: true,
		message: "Success",
		data: userSavedVerses
	});
}
