"use server";

import nodemailer from "nodemailer";

export async function generateVerificationCodeWithExpirationTime() {
	const code = Math.floor(100000 + Math.random() * 900000).toString();

	let codeExpirationTime: Date = new Date();

	codeExpirationTime.setMinutes(codeExpirationTime.getMinutes() + 30);

	let sessionTokenExpirationTime: Date = new Date();

	sessionTokenExpirationTime.setMinutes(
		sessionTokenExpirationTime.getMinutes() + 1440
	);

	return { code, codeExpirationTime, sessionTokenExpirationTime };
}

export const sendEmail = async (
	mail: string[],
	subject: string,
	htmlBody: string
) => {
	let transporter = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: 465,
		secure: true, // true for 465, false for other ports
		auth: {
			user: process.env.EMAIL_USER, // generated ethereal user
			pass: process.env.EMAIL_PASS // generated ethereal password
		},
		tls: {
			rejectUnauthorized: false
		}
	});

	let info = await transporter.sendMail({
		from: "Fruto del Espíritu <noreply@familiaprint.com>",
		to: mail,
		subject,
		text: "Código de Ingreso",
		html: htmlBody
	});

	console.info(`Message sent: ${info.messageId}`);
};
