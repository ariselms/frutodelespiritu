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

    console.log(body);

		const {
			by_user_id,
			bible_id, // bible id (abbreviation)
			book_id, // book id (abbreviation)
			chapter_id,
			verse_from,
			verse_to,
			passage_text,
			bible_book, // book name
			bible_name, // bible version name
			note_title, // note title
			note_content, // note content
			name, // new learning list name if to be created
			description, // new learning list description if to be created
		} = memorizationData;

		// -- Check if the user selected a learning list to save the memorization item -- //
		if (selectedLearningList !== "") {

			// get the learning list to use it's id
			const { rows: learningList } = await sql`
        SELECT * FROM learning_list
        WHERE
          name = ${selectedLearningList} AND
          by_user_id = ${by_user_id}
      `;

			// if the memorization list does not exist, return an error
			if (learningList.length === 0) {
				return NextResponse.json(
					{
						success: false,
						message: "La lista de aprendizaje no existe.",
						data: null
					},
					{ status: 400 }
				);
			}

      const listId = learningList[0].id;

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
          bible_name = ${bible_name} AND
          title = ${note_title} AND
          content = ${note_content}
      `;

      console.log("memoryItemExist:", memoryItemExist);

      // if the memory item exists
			if (memoryItemExist.length > 0) {

        return NextResponse.json(
          {
            success: false,
            message: "Esta selección ya ha sido guardada. Visita tu lista de aprendizaje para actualizarla.",
            data: null
          },
          { status: 400 }
        );
			}

			// insert new learning_item
			const { rows: newMemoryItem, rowCount } = await sql`
        INSERT INTO
          learning_item (by_user_id, bible_name, bible_id, bible_book, book_id, chapter_id, verse_from, verse_to, passage_text, title, content, learning_list_id)
        VALUES (
          ${by_user_id},
          ${bible_name},
          ${bible_id},
          ${bible_book},
          ${book_id},
          ${String(chapter_id)},
          ${verse_from},
          ${verse_to},
          ${passage_text},
          ${note_title},
          ${note_content},
          ${listId}
        ) RETURNING *
      `;

			if (rowCount === 0) {
				return NextResponse.json(
					{
						success: false,
						message: "Error al guardar el memorización.",
						data: null
					},
					{ status: 500 }
				);
			}

			return NextResponse.json(
				{
					success: true,
					message: "La lista de aprendizaje creada correctamente.",
					data: newMemoryItem
				},
				{ status: 200 }
			);
		}

		// if there is no name or description, means that a new memorization list needs to be created
		if (name !== "" && description !== "") {

      const { rows: newLearningListNameExists} = await sql`
        SELECT * FROM learning_list
        WHERE
          name = ${name} AND
          by_user_id = ${by_user_id}
      `;

      if(newLearningListNameExists.length > 0) {
        return NextResponse.json(
          {
            success: false,
            message: "Ya tienes una lista de aprendizaje con ese nombre. Por favor elige otro nombre.",
            data: null
          },
          { status: 200 }
        );
      }
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
						message: "Error al crear la lista de aprendizaje.",
						data: null
					},
					{ status: 500 }
				);
			}

			return NextResponse.json(
				{
					success: true,
					message: "Lista de aprendizaje creada correctamente.",
					data: newMemorizationList[0]
				},
				{ status: 200 }
			);
		}
	} catch (error) {
		console.error("Error creando memorización: ", error);

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
				message:
					"Error creating memorization: " +
					(error instanceof Error ? `: ${error.message}` : ""),
				data: null
			},
			{ status: 500 }
		);
	}
}
