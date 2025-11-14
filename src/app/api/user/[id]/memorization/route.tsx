import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { isAuthenticated } from "@/helpers/server";
import { memo } from "react";

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
    SELECT * FROM learning_list
    WHERE
      learning_list.by_user_id = ${Number(userId)}
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

		const { selectedLearningList, memorizationData } = body;

		const {
			bible_name, // full bible version name
			bible_id, // bible id (abbreviation)
			by_user_id,
			bible_book, // bible book name
			book_id, // book id (abbreviation)
			chapter_id,
			verse_from,
			verse_to,
			passage_text,
			name,
			description
		} = memorizationData;

		// check if the selected memorization list exists
		if (selectedLearningList !== "") {
			// get the memorization list id to use in new learning_list_memory_item_join
			const { rows: memorizationList } = await sql`
        SELECT * FROM learning_list
        WHERE
          name = ${selectedLearningList} AND
          by_user_id = ${by_user_id}
      `;

			// if the memorization list does not exist, return an error
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

			// check if the user have saved the same memory item before
			const { rows: memoryItemExist } = await sql`
        SELECT * FROM memory_item
        WHERE
          by_user_id = ${by_user_id} AND
          bible_name = ${bible_name} AND
          bible_id = ${bible_id} AND
          bible_book = ${bible_book} AND
          book_id = ${book_id} AND
          chapter_id = ${chapter_id} AND
          verse_from = ${verse_from} AND
          verse_to = ${verse_to} AND
          passage_text = ${passage_text}
      `;

			if (memoryItemExist.length > 0) {
				return NextResponse.json(
					{
						success: false,
						message: "Esta selección ya ha sido guardada.",
						data: null
					},
					{ status: 400 }
				);
			}

			// insert new memory_item
			const { rows: newMemoryItem, rowCount } = await sql`
        INSERT INTO
          memory_item (by_user_id, bible_name, bible_id, bible_book, book_id, chapter_id, verse_from, verse_to, passage_text)
        VALUES (
          ${by_user_id},
          ${bible_name},
          ${bible_id},
          ${bible_book},
          ${book_id},
          ${String(chapter_id)},
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

			// insert learning_list_memory_item_join relation
			const { rowCount: joinRowCount } = await sql`
        INSERT INTO
          learning_list_memory_item_join (memory_list_id, memory_item_id)
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

		// if there is no name or description, means that a new memorization list needs to be created
		if (name !== "" && description !== "") {

			// create a new list
			const { rows: newMemorizationList, rowCount } = await sql`
        INSERT INTO learning_list (by_user_id, name, description)
        VALUES (
          ${Number(userId)},
          ${name},
          ${description}
        )
        RETURNING *
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
					data: newMemorizationList[0]
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
