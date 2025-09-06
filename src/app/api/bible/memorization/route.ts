import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { getBibleVersesAndBuildTheWholePassage } from "@/helpers/server";

// POST: /api/bible/memorization
// PRIVATE
// Add a new memorization to the database
export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { book, chapter, verse, content } = body;

		const { rows: newMemorization } = await sql`
      INSERT INTO memorizations (book, chapter, verse, content)
      VALUES (${book}, ${chapter}, ${verse}, ${content})
      RETURNING *;
    `;

		return NextResponse.json(
			{
				success: true,
				message: "Memorization added successfully",
				data: newMemorization
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error("Error adding memorization:", error);
		return NextResponse.json(
			{ success: false, message: "Error adding memorization" },
			{ status: 500 }
		);
	}
}
