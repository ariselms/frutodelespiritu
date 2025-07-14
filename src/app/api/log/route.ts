import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { generateVerificationCodeWithExpirationTime } from "@/helpers/server";
import { v4 as uuidv4 } from "uuid";
import { sendEmail } from "@/helpers/server";

export async function POST(request: Request) {
	// get the email
	const { email } = await request.json();

  console.log("--- Email Received in Server ---");
	// generate the code
	const { code, codeExpirationTime, sessionTokenExpirationTime } = await generateVerificationCodeWithExpirationTime();

  console.log("--- Code Generated ---");
  console.log(`Code: ${code}`);



	const existingUser = await sql`SELECT * FROM users WHERE contact_email = ${email}`;

	const emaillSubject = "Código de verificación";

	const htmlBody = `
    <h1>
      Código de verificación para ingresar a Fruto del Espíritu
    </h1>

    <p>
      Tu código de verificación es
      <strong>${code}</strong>
    </p>

    <p>
      Si no solicitaste este código, por favor verifica que tu contraseña de correo no haya sido comprometida.
    </p>

    <p>Gracias por usar Fruto del Espíritu</p>
  `;

	// if the user doesn't exist, create it
	if (existingUser.rows.length === 0) {
		try {
			const { rows: newUser } = await sql`INSERT INTO users
        (contact_email, email_code_number, email_code_expiration, session_token, session_expiration)
        VALUES
        ( ${email},
          ${btoa(code.toString())},
          ${codeExpirationTime.toLocaleString()},
          ${uuidv4()},
          ${sessionTokenExpirationTime.toLocaleString()}) RETURNING *`;

			if (newUser.length > 0) {
				await sendEmail(
					[email],
					emaillSubject,
					htmlBody
				);

				return NextResponse.json(
					{
						success: true,
						message: "Se ha enviado un código a tu correo.",
						data: null
					},
					{ status: 200 }
				);
			}
		} catch (dbError) {
			return NextResponse.json(
				{
					success: false,
					message: "Error creating user: " + dbError,
					data: null
				},
				{ status: 500 }
			);
		}
	} else {
		try {
			const updatedUser = await sql`UPDATE users
        SET
          email_code_number = ${btoa(code.toString())},
          email_code_expiration = ${codeExpirationTime.toISOString()},
          session_token = ${uuidv4()},
          session_expiration = ${sessionTokenExpirationTime.toISOString()}
        WHERE contact_email = ${email}
        RETURNING *`;

			if (updatedUser) {
				await sendEmail(
					[email],
					emaillSubject,
					htmlBody
				);

				return NextResponse.json(
					{
						success: true,
						message: "Se ha enviado un código a tu correo.",
						data: null
					},
					{ status: 200 }
				);
			}
		} catch (dbError) {
			return NextResponse.json(
				{
					// Ensure you are returning NextResponse here
					success: false,
					message: "Error updating user: " + dbError,
					data: null
				},
				{ status: 500 }
			);
		}
	}
}
