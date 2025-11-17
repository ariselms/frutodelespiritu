import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { isAuthenticated } from "@/helpers/server";

// GET: /api/bible/memorization
// PRIVATE
// Get all memorizations items from a list and a single user
export async function GET(
	request: Request,
) {
	try {
    // get listId from params
    const { searchParams } = new URL(request.url);
    const listId = searchParams.get("listId");
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

		let memoryListData: any = {};

		const { rows: memoryList } =
			await sql`SELECT * FROM learning_list WHERE id = ${listId}`;

		const { rows: memoryListItems } = await sql`
      SELECT
        mi.*
      FROM
        memory_item mi
      JOIN
        learning_list_memory_item_join mlij ON mi.id = mlij.memory_item_id
      JOIN
        learning_list ml ON mlij.memory_list_id = ml.id
      WHERE
        ml.id = ${listId};
    `;

		if (memoryList && memoryListItems) {
			memoryListData = {
				listInfo: memoryList[0],
				listItems: memoryListItems.length > 0 ? memoryListItems : []
			};

			return NextResponse.json(
				{
					success: true,
					message: "Memorization list retrieved successfully",
					data: memoryListData
				},
				{ status: 200 }
			);
		}

		return NextResponse.json(
			{
				success: false,
				message: "Memorization list not found",
				data: null
			},
			{ status: 404 }
		);
	} catch (error) {
		console.error("Error retrieving memorization list:", error);
		return NextResponse.json(
			{ success: false, message: "Error retrieving memorization list" },
			{ status: 500 }
		);
	}
}

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