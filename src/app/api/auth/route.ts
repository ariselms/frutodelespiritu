import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";

export async function POST(request: Request) {

	const { email, code } = await request.json();

	const genericErrorMessage = "Ha ocurrido un error en nuestro lado. Intenta de nuevo mas tarde.";

	try {
		// lookup the user with email
		const { rows: userExist } =
			await sql`SELECT * FROM users WHERE contact_email = ${email}`;
		// check if the user exists
		if (userExist.length > 0) {
			let user = userExist[0];

			// check if the code is expired
			if (user.email_code_expiration < new Date()) {
				const codeExpiredMessage = "El código ha expirado";

				return NextResponse.json({
					success: false,
					message: codeExpiredMessage,
					data: null
				}, { status: 400 });
			}

			const decodedCode = atob(user.email_code_number);

			if (decodedCode !== code) {
				const invalidCodeMessage = "Código inválido, intenta de nuevo";

				return NextResponse.json({
					success: false,
					message: invalidCodeMessage,
					data: null
				}, { status: 400 });
			}

			if (decodedCode === code) {
				const authenticationSuccessMessage = "Usuario autenticado exitosamente.";

				const serverResponse = NextResponse.json({
					success: true,
					message: authenticationSuccessMessage,
					data: user
				}, { status: 200 });

				serverResponse.cookies.set("session_token", user.session_token);

				return serverResponse;

			} else {
				return NextResponse.json({
					success: false,
					message: genericErrorMessage,
					data: null
				}, { status: 400 });
			}
		}

		return NextResponse.json({
			success: false,
			message: "El usuario no existe",
			data: null
		}, { status: 400 });

	} catch (error) {
		console.error(error);

		return NextResponse.json({
			success: false,
			message: error,
			data: null
		}, { status: 500 });
	}
}

export async function GET() {
	const cookieStore = cookies();

	const authCookie = (await cookieStore).get("session_token");

	try {
		const { rows: userExist } =
			await sql`SELECT * FROM users WHERE session_token = ${authCookie?.value}`;

		if (userExist.length > 0) {

			const user = userExist[0];

			if (user.session_expiration < new Date()) {
				return NextResponse.json({
					success: false,
					message: "Session token has expired",
					data: null
				});
			}

			if (user.session_token !== authCookie?.value) {
				return NextResponse.json({
					success: false,
					message: "Invalid session token",
					data: null
				});
			}

			return NextResponse.json(
				{
					success: true,
					message: "User fetched successfully",
					data: user
				},
				{ status: 200 }
			);
		}

		return NextResponse.json(
			{
				success: false,
				message: "User not found",
				data: null
			},
			{ status: 404 }
		);
	} catch (error) {
		console.error(error);

		return NextResponse.json(
			{
				success: false,
				message: "Error fetching user",
				data: null
			},
			{ status: 500 }
		);
	}
}

export async function DELETE() {
	try {
		const cookieStore = cookies();

		(await cookieStore).delete("session_token");

		return NextResponse.json(
			{
				success: true,
				message: "User logged out successfully",
				data: null
			},
			{ status: 200 }
		);
	} catch (error) {

		console.error(error);

		return NextResponse.json(
			{
				success: false,
				message: "Error logging out user",
				data: null
			},
			{ status: 500 }
		);
	}
}

// TODO:
// 1. set email credentials in namecheap DONE
// 2. complete workflow by persisting the user
// 3. double check the workflow and refactor as necessary
// 4. test the workflow several times
// 5. start working in the quote page
// 6. start working in the subscription emails
// 10.set up sub categories and everything that it implies
// 9. set up orders functionality with cart and checkout
// 7. complete the products for sale functionaltiy
// 8. start working in react admin  to implement crud operations for super admins
// 11. start working in an upgrade that will allow users to preview certain products before buying them
