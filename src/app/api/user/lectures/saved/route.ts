import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);

		const userId = Number(searchParams.get("userId"));

    const { rows: userLectures } = await sql`
      SELECT
        lectures.*
      FROM lectures
      JOIN saved_lectures ON saved_lectures.saved_lecture_id = lectures.id
      WHERE
        saved_lectures.saved_by_user_id = ${Number(userId)}
      ORDER BY lectures.created_at DESC
    `;

    console.log("User lectures: ", userLectures);

		if (userLectures.length > 0) {
			return NextResponse.json(
				{
					success: true,
					message: "Lecturas solicitadas correctamente.",
					data: userLectures
				},
				{ status: 200 }
			);
		}

    return NextResponse.json(
      {
        success: true,
        message: "No hay lecturas guardadas por este usuario.",
        data: []
      },
      { status: 200 }
    );

	} catch (error) {

    console.error("Error fetching user lectures:", error);

		return NextResponse.json({
      success: false,
      message: "Error obteniendo lectura.",
      data: null
    });
	}
}

// DELETE handler for removing a saved lecture
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const userId = Number(searchParams.get("userId"));
    const lectureId = Number(searchParams.get("lectureId"));

    await sql`
      DELETE FROM saved_lectures
      WHERE saved_by_user_id = ${Number(userId)}
      AND saved_lecture_id = ${Number(lectureId)}
    `;

    return NextResponse.json(
      {
        success: true,
        message: "Lectura guardada removida correctamente.",
        data: null
      },
      { status: 200 }
    );

  } catch (error) {

    console.error("Error removing saved lecture:", error);

    return NextResponse.json({
      success: false,
      message: "Error eliminando lectura guardada.",
      data: null
    });

  }
}
