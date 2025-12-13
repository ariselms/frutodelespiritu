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
      li.*,
      ll.name as learning_list_name,
      ll.id as learning_list_id
    FROM learning_item li
    LEFT JOIN learning_list ll
      ON li.learning_list_id = ll.id
    WHERE
      li.by_user_id = ${id} AND
      li.book_id = ${bookId} AND
      li.chapter_id = ${chapterId}
  `;

	if (userSavedVerses.length === 0) {
		return NextResponse.json({
			success: true,
			message: "No hay versículos guardados.",
			data: null
		});
	}

	return NextResponse.json({
		success: true,
		message: "Versículos solicitados correctamente.",
		data: userSavedVerses
	});
}
