// app/api/admin/lectures/[id]/route.ts

import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

/**
 * GET handler for fetching a single lecture by ID.
 */
export async function GET(
	request: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params;

		const { rows: singleLecture } = await sql`SELECT * FROM lectures WHERE id = ${id};`;

		if (singleLecture.length === 0) {
			return NextResponse.json(
				{
          success: false,
          message: "Lecture not found.",
          data: null
        },
				{ status: 404 }
			);
		}

		// For getOne, React Admin expects the record object directly
		return NextResponse.json(
      {
        success: true,
        message: "Lecture fetched successfully",
        data: singleLecture[0]
      }, { status: 200 });

	} catch (error) {
		console.error("Error fetching lecture:", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}

/**
 * PUT handler for updating a lecture.
 */
export async function PUT(
	request: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params;
		const body = await request.json();
		const {
			title,
			summary,
			content,
			video_url,
			draft,
			is_featured,
		} = body;

		const { rows: updatedLecture } = await sql`
      UPDATE lectures
      SET
        title = ${title},
        summary = ${summary},
        content = ${content},
        video_url = ${video_url},
        draft = ${draft},
        updated_at = ${new Date().toISOString()},
        is_featured = ${is_featured}
      WHERE id = ${id}
      RETURNING *;
    `;

		if (updatedLecture.length === 0) {
			return NextResponse.json(
				{
          success: false,
          message: "Lecture not found.",
          data: null
        },
				{ status: 404 }
			);
		}

		return NextResponse.json(
    {
      success: true,
      message: "Lecture updated successfully",
      data:updatedLecture[0]
    }, { status: 200 });

	} catch (error) {
		console.error("Error updating lecture:", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}

/**
 * DELETE handler for deleting a lecture.
 */
export async function DELETE(
	request: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params;
		const { rowCount } = await sql`DELETE FROM lectures WHERE id = ${id};`;

		if (rowCount === 0) {
			return NextResponse.json(
				{
          success: false,
          message: "Lecture not found.",
          data: null
        },
				{ status: 404 }
			);
		}

		// React Admin expects the deleted record (or at least its id) back
		return NextResponse.json({
      success: true,
      message: "Lecture deleted successfully",
      data: id
    }, { status: 200 });
	} catch (error) {
		console.error("Error deleting lecture:", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
