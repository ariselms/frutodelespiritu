import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(request: Request) {
	try {
		const { userId, lectureId } = await request.json();

    // Id del usuario y id de la lectura son requeridos
		if (!userId || !lectureId) {
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

		const { rows: lectureExist } =
			await sql`SELECT * FROM lectures WHERE id = ${Number(lectureId)}`;

		if (lectureExist.length === 0) {
			return NextResponse.json({
				success: false,
				message: "Data insuficiente.",
				data: null
			});
		}

		const { rows: savedLecture } = await sql`
      INSERT INTO saved_lectures (saved_by_user_id, saved_lecture_id)
      VALUES (${Number(userId)}, ${Number(lectureId)})
      RETURNING *
    `;

		return NextResponse.json(
			{
				success: true,
				message: "Lectura guardada exitosamente",
				data: savedLecture[0]
			},
			{ status: 200 }
		);
	} catch (error: any) {

		console.error(error);

		if (error?.message && error?.message.includes("duplicate key value")) {
			return NextResponse.json(
				{
					success: false,
					message: "Lectura ya guardada, visita tu perfil para administrarla.",
					data: null
				},
				{ status: 400 }
			);
		}

		return NextResponse.json(
			{
				success: false,
				message:
					typeof error === "object" && error !== null && "message" in error
						? (error as { message: string }).message
						: "Unknown error",
				data: null
			},
			{ status: 500 }
		);
	}
}

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);

		const userId = Number(searchParams.get("userId"));
		const lectureId = Number(searchParams.get("lectureId"));

		// select saved lectures
		const { rows: userSavedLectures } = await sql`
      SELECT * FROM saved_lectures
        WHERE saved_by_user_id = ${Number(userId)}
        AND saved_lecture_id = ${Number(lectureId)}
    `;

		if (userSavedLectures.length > 0) {
			return NextResponse.json(
				{
					success: true,
					message: "Lectura guardada encontrada.",
					data: true
				},
				{ status: 200 }
			);
		} else {
			return NextResponse.json(
				{
					success: true,
					message: "Lectura no guardada.",
					data: false
				},
				{ status: 200 }
			);
		}
	} catch (error) {

		return NextResponse.json({ message: "Error obteniendo lectura." });

	}
}
