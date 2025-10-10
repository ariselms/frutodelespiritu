import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { isAuthenticated } from "@/helpers/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
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

	const { searchParams } = new URL(request.url);

	const userId = Number(searchParams.get("userId"));

	if (!userId) {
		return NextResponse.json(
			{
				success: false,
				message: "Data insuficiente.",
				data: null
			},
			{ status: 400 }
		);
	}

	const { rows: userExist } =
		await sql`SELECT * FROM users WHERE id = ${userId}`;

	if (userExist.length === 0) {
		return NextResponse.json({
			success: false,
			message: "Data insuficiente.",
			data: null
		});
	}

	const { rows: userMemorizationLists } = await sql`
    SELECT * FROM memory_list
    WHERE
      memory_list.by_user_id = ${Number(userId)}
  `;

	return NextResponse.json(
		{
			success: true,
			message: "Memorizaciones solicitadas correctamente.",
			data: userMemorizationLists
		},
		{ status: 200 }
	);
}

export async function POST(request: Request) {
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

  const { searchParams } = new URL(request.url);

  const userId = Number(searchParams.get("userId"));

	try {
		const body = await request.json();

		const { selectedMemorizationList, memorizationData } = body;

		const {
			by_user_id,
			bible_id,
			book_id,
			chapter_id,
			verse_from,
			verse_to,
			passage_text,
			name,
			description
		} = memorizationData;

    console.log("List: ", selectedMemorizationList);
    console.log("Item: ", memorizationData);

		// check if the memorization list exist
		if (selectedMemorizationList !== "") {
			// get the memorization list id
			const { rows: memorizationList } = await sql`
        SELECT * FROM memory_list
        WHERE
          name = ${selectedMemorizationList}
      `;

			if (memorizationList.length === 0) {
				return NextResponse.json(
					{
						success: false,
						message: "La lista de memorización no existe.",
						data: null
					},
					{ status: 400 }
				);
			}

			// save memory_item
			const { rows: newMemoryItem, rowCount } = await sql`
        INSERT INTO
          memory_item (by_user_id, bible_id, book_id, chapter_id, verse_from, verse_to, passage_text)
        VALUES (
          ${by_user_id},
          ${bible_id},
          ${book_id},
          ${chapter_id},
          ${verse_from},
          ${verse_to},
          ${passage_text}) RETURNING *
      `;

			if (rowCount === 0) {
				return NextResponse.json(
					{
						success: false,
						message: "Error al guardar el item de memorización.",
						data: null
					},
					{ status: 500 }
				);
			}

			// insert memory_list_item_join relation
			const { rowCount: joinRowCount } = await sql`
        INSERT INTO
          memory_list_item_join (memory_list_id, memory_item_id)
          VALUES (${memorizationList[0].id}, ${newMemoryItem[0].id})
        RETURNING *
      `;

      if (joinRowCount === 0) {
        return NextResponse.json(
          {
            success: false,
            message: "Error al guardar memorización.",
            data: null
          },
          { status: 500 }
        );
      }

			return NextResponse.json(
				{
					success: true,
					message: "La lista de memorización creada correctamente.",
					data: newMemoryItem
				},
				{ status: 200 }
			);
		}

		if (name !== "" && description !== "") {
			console.log(by_user_id, name, description);

			// if memorization list does not exist, create a new list
			const { rows: newMemorizationList, rowCount } = await sql`
        INSERT INTO memory_list (by_user_id, name, description)
        VALUES (${Number(userId)}, ${name}, ${description})
      `;

			if (rowCount === 0) {
				return NextResponse.json(
					{
						success: false,
						message: "Error al crear la lista de memorización.",
						data: null
					},
					{ status: 500 }
				);
			}

			return NextResponse.json(
				{
					success: true,
					message: "Memorización creada correctamente.",
					data: newMemorizationList
				},
				{ status: 200 }
			);
		}
	} catch (error) {
		console.error("Error creating memorization:", error);

		if (
			error instanceof Error &&
			error.message.includes("duplicate key value")
		) {
			return NextResponse.json(
				{
					success: false,
					message: "Ya has guardado este pasaje bíblico para memorizar.",
					data: null
				},
				{ status: 400 }
			);
		}

		return NextResponse.json(
			{
				success: false,
				message: "Error creating memorization",
				data: null
			},
			{ status: 500 }
		);
	}
}
