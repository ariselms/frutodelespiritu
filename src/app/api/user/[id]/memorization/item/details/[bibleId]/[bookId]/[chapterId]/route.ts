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

 const {rows: userSavedVerses} = await sql`
  SELECT * FROM memory_item
  WHERE by_user_id = ${id}
    AND bible_id = ${bibleId}
    AND book_id = ${bookId}
    AND chapter_id = ${chapterId}
 `

 return NextResponse.json({
		success: true,
		message: "Success",
		data: userSavedVerses
 });

}
