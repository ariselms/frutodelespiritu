import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { sql } from "@vercel/postgres";
import { UserMainHeader } from "@/components/admin/UserMainHeader";

export default async function ProfileLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	const cookie = (await cookies()).get("session_token");

	if (!cookie) {
		redirect("/log");
	}

	const { value } = cookie;

	let user;

	const { rows: userDb } = await sql`SELECT * FROM users
      WHERE session_token = ${value}
      AND session_expiration > NOW()`;

	user = userDb[0];

	if (!user) {
		redirect("/log");
	}

	if (user.session_expiration < new Date()) {
		redirect("/log");
	}

	return (
		<>
      <UserMainHeader />
			{children}
		</>
	);
}
