// app/api/admin/categories/route.ts
import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { isAuthenticated } from "@/helpers/server";

/**
 * GET handler for fetching a list of categories.
 */
export async function GET(request: Request) {
	try {
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
		// 1. Parse Filter, Range, and Sort Parameters from the URL
		const filterStr = searchParams.get("filter") || "{}";
		const filter = JSON.parse(decodeURIComponent(filterStr));

		// This part for getMany is fine as it doesn't need Content-Range
		if (filter.id && Array.isArray(filter.id)) {
			const ids = filter.id;
			const { rows } =
				await sql`SELECT * FROM categories WHERE id = ANY(${ids}::int[]);`;
			return NextResponse.json(
				{
					success: true,
					message: "Categories fetched successfully.",
					data: rows
				},
				{ status: 200 }
			);
		}

		// This is the getList part that needs the header
		const { rows } = await sql`SELECT * FROM categories ORDER BY name ASC;`;
		const totalCount = rows.length;

		// Construct the Content-Range header string
		const contentRange = `categories 0-${
			totalCount > 0 ? totalCount - 1 : 0
		}/${totalCount}`;

		// Add the headers object to your response
		return NextResponse.json(
			{
				success: true,
				message: "Category list fetched successfully.",
				data: rows,
				total: totalCount
			},
			{
				status: 200,
				headers: {
					"Content-Range": contentRange,
					"Access-Control-Expose-Headers": "Content-Range"
				}
			}
		);
	} catch (error) {
		console.error("Error fetching categories:", error);
		return NextResponse.json(
			{
				success: false,
				message: "Error fetching categories",
				data: null
			},
			{ status: 500 }
		);
	}
}

/**
 * POST handler for creating a new category.
 */
export async function POST(request: Request) {
	try {
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

		const body = await request.json();

		const { name, user_by_id } = body;

		const { rows: newCategory } = await sql`
      INSERT INTO categories (name, user_by_id)
      VALUES (${name}, ${user_by_id})
      RETURNING *;
    `;

		return NextResponse.json(
			{
				success: true,
				message: "Category created successfully.",
				data: newCategory[0]
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error("Error creating category:", error);
		return NextResponse.json(
			{
				success: false,
				message: "Error creating category",
				data: null
			},
			{ status: 500 }
		);
	}
}
