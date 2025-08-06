// file: middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	// Handle preflight requests
	if (request.method === "OPTIONS") {
		const response = new NextResponse(null, { status: 204 });
		response.headers.set("Access-Control-Allow-Origin", "*");
		response.headers.set(
			"Access-Control-Allow-Methods",
			"GET, POST, PUT, DELETE, OPTIONS"
		);
		response.headers.set(
			"Access-Control-Allow-Headers",
			"Content-Type, Authorization"
		);
		response.headers.set("Access-Control-Max-Age", "86400");
		return response;
	}

	// Add CORS headers to all other responses
	const response = NextResponse.next();
	response.headers.set("Access-Control-Allow-Origin", "*");

	return response;
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: "/api/:path*"
};
