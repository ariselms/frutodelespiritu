import {sql} from "@vercel/postgres";
import {NextResponse} from "next/server";

export async function GET(
	request: Request,
	{ params }: { params: Promise<{ id: string }> }
) {

  const { id } = await params;

  const result =
		await sql`
      SELECT * FROM lectures
      WHERE category_id != ${id}
      ORDER BY created_at DESC
      LIMIT 6
    `;
	return NextResponse.json(result.rows);
}