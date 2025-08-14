import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { isAuthenticated } from "@/helpers/server";

/**
 * GET handler for fetching a single category by ID.
 */
export async function GET(
	request: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		// Check if the user is authenticated
		const userAuthenticated = await isAuthenticated();

		if (!userAuthenticated) {
			return NextResponse.json(
				{
					success: false,
					message: "Unauthorized",
					dara: null
				},
				{ status: 401 }
			);
		}

		const { id } = await params;

		const { rows: categoryRequested } =
			await sql`SELECT * FROM categories WHERE id = ${id};`;

		if (categoryRequested.length === 0) {
			return NextResponse.json(
				{
					success: false,
					message: "Category not found.",
					data: null
				},
				{ status: 404 }
			);
		}

		return NextResponse.json(
			{
				success: true,
				message: "Category fetched successfully.",
				data: categoryRequested[0]
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error fetching category:", error);

		return NextResponse.json(
			{
				success: false,
				message: "Error fetching category",
				data: null
			},
			{ status: 500 }
		);
	}
}

/**
 * PUT handler for updating a category by ID.
 */
export async function PUT(
	request: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		// Check if the user is authenticated
		const userAuthenticated = await isAuthenticated();

		if (!userAuthenticated) {
			return NextResponse.json(
				{
					success: false,
					message: "Unauthorized",
					dara: null
				},
				{ status: 401 }
			);
		}

		const { id } = await params;
		const body = await request.json();
		const { name } = body;

		const { rows: updatedCategory } =
			await sql`UPDATE categories SET name = ${name} WHERE id = ${id};`;

		if (updatedCategory.length === 0) {
			return NextResponse.json(
				{
					success: false,
					message: "Category not found.",
					data: null
				},
				{ status: 404 }
			);
		}

		return NextResponse.json(
			{
				success: true,
				message: "Category updated successfully.",
				data: updatedCategory[0]
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error updating category:", error);

		return NextResponse.json(
			{
				success: false,
				message: "Error updating category",
				data: null
			},
			{ status: 500 }
		);
	}
}

export async function DELETE(
	request: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		// Check if the user is authenticated
		const userAuthenticated = await isAuthenticated();

		if (!userAuthenticated) {
			return NextResponse.json(
				{
					success: false,
					message: "Unauthorized",
					dara: null
				},
				{ status: 401 }
			);
		}

		const { id } = await params;

		const { rows: deletedCategory } = await sql`DELETE FROM categories WHERE id = ${id};`;

		if (deletedCategory.length === 0) {
			return NextResponse.json(
				{
					success: false,
					message: "Category not found.",
					data: null
				},
				{ status: 404 }
			);
		}

		return NextResponse.json(
			{
				success: true,
				message: "Category deleted successfully.",
				data: deletedCategory[0]
			},
			{ status: 200 }
		);
	} catch (error) {

		console.error("Error deleting category:", error);

		return NextResponse.json(
			{
				success: false,
				message: "Error deleting category",
				data: null
			},
			{ status: 500 }
		);
	}
}
