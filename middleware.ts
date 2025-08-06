// file: middleware.ts (in your project's root or /src folder)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	// Define allowed origins
	const allowedOrigins = [
		"http://localhost:3000",
		"https://frutodelespiritu-dev.vercel.app",
    "https://frutodelespiritu.vercel.app",
    "https://frutodelespiritu.com"
	];

	const origin = request.headers.get("origin");
	const allowOrigin = origin && allowedOrigins.includes(origin) ? origin : "*";

	// Handle preflight requests
	if (request.method === "OPTIONS") {
		const response = new NextResponse(null, { status: 204 });
		response.headers.set("Access-Control-Allow-Origin", allowOrigin);
		response.headers.set(
			"Access-Control-Allow-Methods",
			"GET, POST, PUT, DELETE, OPTIONS"
		);
		// 👇 THIS IS THE CRITICAL LINE TO ADD/UPDATE 👇
		response.headers.set(
			"Access-Control-Allow-Headers",
			"Content-Type, Authorization"
		);
		response.headers.set("Access-Control-Max-Age", "86400");
		return response;
	}

	// Add CORS headers to all other responses
	const response = NextResponse.next();
	response.headers.set("Access-Control-Allow-Origin", allowOrigin);

	return response;
}

// Match all API routes
export const config = {
	matcher: "/api/:path*"
};
