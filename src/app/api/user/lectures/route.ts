import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(request: Request) {

	try {
		const { userId, lectureId } = await request.json();

    if (!userId || !lectureId) {
      return NextResponse.json(
        {
          success: false,
          message: "User ID and Lecture ID are required",
          data: null
        },
        { status: 400 }
      );
    }

    // check if the user exists
    const { rows: userExist } =
      await sql`SELECT * FROM users WHERE id = ${userId}`;
      // check if the user exists

    if (userExist.length === 0) {
      return NextResponse.json({
        success: false,
        message: "Lo sentimos, hubo un error. Intenta de nuevamente mas tarde.",
        data: null
      });
    }

    // check if the lecture exists
    const { rows: lectureExist } =
      await sql`SELECT * FROM lectures WHERE id = ${Number(lectureId)}`;

    if (lectureExist.length === 0) {
      return NextResponse.json({
        success: false,
        message: "Lo sentimos, hubo un error. Intenta de nuevamente mas tarde.",
        data: null
      });
    }

		const { rows: savedLecture } = await sql`
      INSERT INTO saved_lectures (saved_by_user_id, saved_lecture_id)
      VALUES (${userId}, ${Number(lectureId)})
      RETURNING *
    `;

		const SavedLecture = savedLecture[0];

		return NextResponse.json(
			{
				success: true,
				message: "Lectura guardada exitosamente",
				data: SavedLecture
			},
			{ status: 200 }
		);

  } catch (error: any) {

    console.error(error);

    if(error?.message && error?.message.includes("duplicate key value")) {
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
        message: typeof error === "object" && error !== null && "message" in error ? (error as { message: string }).message : "Unknown error",
        data: null
      },
      { status: 500 }
    );

  }
}

export async function GET(request: Request) {
  try {
    console.log("GET request received");
		// 1. Get URL Search Parameters
		const { searchParams } = new URL(request.url);

    const userId = Number(searchParams.get("lectureId"));
    const lectureId = Number(searchParams.get("userId"));

    console.log(userId, lectureId)

    // select saved lectures
    const { rows: userSavedLectures } = await sql`
      SELECT * FROM saved_lectures
        WHERE saved_by_user_id = ${userId}
        AND saved_lecture_id = ${lectureId}
    `;

    if (userSavedLectures.length > 0) {
      return NextResponse.json({
        success: true,
        message: "Found saved lecture by user.",
        data: true
       }, { status: 200 });
    } else {
      return NextResponse.json({
        success: true,
        message: "Lecture is not saved by user.",
        data: false
       }, { status: 200 });
    }

	} catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error getting lectures" });
  }
}