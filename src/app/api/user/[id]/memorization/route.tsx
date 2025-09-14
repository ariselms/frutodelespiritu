import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { isAuthenticated } from "@/helpers/server";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request
) {
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

  const { rows: userExist } = await sql`SELECT * FROM users WHERE id = ${userId}`;

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