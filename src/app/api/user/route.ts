import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
export async function POST(request: Request) {
	try {
		const { email } = await request.json();

		const {rows: userExists} = await sql`
    SELECT * FROM users
    WHERE contact_email = ${email}
  `;

    if(userExists.length === 0) {
      // add new user
      await sql`
        INSERT INTO users (contact_email)
        VALUES (${email})
      `;

      return NextResponse.json(
				{
					success: true,
					message: `${email} ha sido suscrito correctamente`,
					data: null
				},
				{ status: 200 }
			);
    }

		return NextResponse.json(
			{
				success: true,
				message: `${email} ha sido suscrito anteriormente`,
				data: null
			},
			{ status: 200 }
		);
	} catch (error) {

		console.error(error);

		return NextResponse.json(
			{
				success: false,
				message:
					"Lo sentimos, ha ocurrido un error, por favor intenta nuevamente",
				data: null
			},
			{ status: 500 }
		);
	}
}
