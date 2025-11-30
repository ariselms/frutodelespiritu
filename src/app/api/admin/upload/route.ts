import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {

	const body = (await request.json()) as HandleUploadBody;

	try {
		const jsonResponse = await handleUpload({
			body,
			request,
			// The 'BLOB_READ_WRITE_TOKEN' is a Vercel-provided environment variable.
			// You don't need to create it manually.
			token: process.env.BLOB_READ_WRITE_TOKEN,
			onBeforeGenerateToken: async (
				pathname: string
				/* clientPayload?: string, */
			) => {
				// This is where you can add security checks.
				// For example, confirm the user is authenticated.
				// For now, we'll just return the pathname.
				return {
					allowedContentTypes: ["image/jpeg", "image/png", "image/gif"],
					allowOverwrite: true,
          pathname: `lectures/${pathname}`,
				};
			},
			onUploadCompleted: async ({ blob, tokenPayload }) => {
				// You can perform any logic here after the upload is complete.
				// For example, you could log the upload or update a database.
				// console.log("Blob upload completed", blob, tokenPayload);
			}
		});

		return NextResponse.json(jsonResponse);

	} catch (error) {
		return NextResponse.json(
			{ error: (error as Error).message },
			{ status: 400 }
		);
	}
}
