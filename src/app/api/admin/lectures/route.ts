// app/api/admin/lectures/route.ts
export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import slugify from "slugify";
import { nanoid } from "nanoid";
import { isAuthenticated } from "@/helpers/server";
/**
 * Helper function to sanitize and build a WHERE clause from a filter object.
 * @param filter - The filter object from the 'filter' query parameter.
 * @returns An object with the WHERE clause string and an array of values for parameterization.
 */

function buildWhereClause(filter: any): { clause: string; values: any[] } {
	let conditions: string[] = [];
	let values: any[] = [];
	let paramIndex = 1; // Start index for SQL parameters ($1, $2, etc.)

	for (const key in filter) {
		if (filter.hasOwnProperty(key)) {
			const value = filter[key];

			// Handle 'q' (global search) filter for the lectures table
			if (key === "q" && value) {
				// Apply a case-insensitive LIKE across relevant text fields
				conditions.push(`(
          title ILIKE $${paramIndex} OR
          summary ILIKE $${paramIndex} OR
          content ILIKE $${paramIndex} OR
          slug ILIKE $${paramIndex}
        )`);
				values.push(`%${value}%`);
				paramIndex++;
			}
			// Handle array filters (e.g., for 'id' from getMany)
			else if (Array.isArray(value)) {
				if (value.length > 0) {
					const placeholders = value.map(() => `$${paramIndex++}`).join(",");
					conditions.push(`"${key}" IN (${placeholders})`);
					values.push(...value);
				}
			}
			// Handle exact match filters for other fields (e.g., category_id, draft)
			else {
				conditions.push(`"${key}" = $${paramIndex}`);
				values.push(value);
				paramIndex++;
			}
		}
	}

	const clause =
		conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
	return { clause, values };
}

/**
 * GET handler for fetching a list of lectures with filtering, sorting, and pagination.
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
					dara: null
				},
				{ status: 401 }
			);
		}

		const { searchParams } = new URL(request.url);
		// 1. Parse Filter, Range, and Sort Parameters from the URL
    const filterStr = searchParams.get("filter") || "{}";
		const filter = JSON.parse(decodeURIComponent(filterStr));
		const rangeStr = searchParams.get("range");
		const sortStr = searchParams.get("sort");

		// 2. Determine Pagination (Range)
		let offset = 0;
		let limit = 10; // Default limit
		if (rangeStr) {
			const [start, end] = JSON.parse(decodeURIComponent(rangeStr));
			offset = start;
			limit = end - start + 1;
		}

		// 3. Determine Sorting
		let sortField = "id"; // Default sort field
		let sortOrder = "DESC"; // Default sort order

		if (sortStr) {
			const [field, order] = JSON.parse(decodeURIComponent(sortStr));
			sortField = field;
			sortOrder = order;

			// Whitelist sortable fields to prevent SQL Injection
			const allowedSortFields = [
				"id",
				"title",
				"summary",
				"slug",
				"draft",
				"created_at",
				"updated_at",
				"is_featured"
			];

			if (!allowedSortFields.includes(sortField)) {
				console.warn(`Attempted to sort by disallowed field: ${sortField}`);
				sortField = "created_at"; // Fallback to a safe default
			}

			if (!["ASC", "DESC"].includes(sortOrder.toUpperCase())) {
				sortOrder = "DESC"; // Fallback to a safe default
			}
		}
		// 4. Build the WHERE clause from the filter
		const { clause: whereClause, values: whereValues } =
			buildWhereClause(filter);

		// 5. Fetch the total count of records that match the filter
		const countQuery = `SELECT COUNT(*) FROM lectures ${whereClause};`;
		const { rows: countRows } = await sql.query(countQuery, whereValues);
		const totalCount = parseInt(countRows[0].count, 10);

		// 6. Fetch the paginated and sorted data
		const dataQuery = `
      SELECT * FROM lectures
      ${whereClause}
      ORDER BY "${sortField}" ${sortOrder}
      LIMIT $${whereValues.length + 1} OFFSET $${whereValues.length + 2};
    `;
		const { rows: lectures } = await sql.query(dataQuery, [
			...whereValues,
			limit,
			offset
		]);

		// 7. Construct the Content-Range header for pagination
		const startIndex = offset;
		const endIndex =
			lectures.length > 0 ? offset + lectures.length - 1 : offset;
		const contentRangeHeader = `lectures ${startIndex}-${endIndex}/${totalCount}`;

		return NextResponse.json(
			{
				success: true,
				message: "Lectures fetched successfully!",
				data: lectures,
				total: totalCount
			},
			{
				status: 200,
				headers: {
					"Content-Range": contentRangeHeader,
					// Expose the header for CORS
					"Access-Control-Expose-Headers": "Content-Range"
				}
			}
		);
	} catch (error) {
		console.error("Error fetching lectures:", error);
		return NextResponse.json(
			{ message: "Error fetching lectures" },
			{ status: 500 }
		);
	}
}

/**
 * POST handler for creating a new lecture.
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
					dara: null
				},
				{ status: 401 }
			);
		}

		const body = await request.json();

		const {
			title,
			summary,
			content,
			image_url,
			video_url,
			draft,
			is_featured,
			category_id,
			by_user_id
		} = body;

		if (!title || !summary || !content || !image_url) {
			// Return the newly created record
			return NextResponse.json(
				{
					success: true,
					message:
						"Title, summary, content, and image_url are required fields.",
					data: null
				},
				{ status: 201 }
			);
		}

		let slug = slugify(title, {
			lower: true,
			strict: true
		});

		slug += `-${nanoid(6)}`;

		const lectureData = {
			image_url,
			title,
			summary,
			category_id,
			by_user_id,
			slug,
			content,
			video_url: video_url || null,
			draft: draft || false,
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
			is_featured: is_featured || false
		};

		// Dynamically build the insert query from the request body
		const columns = Object.keys(lectureData);
		const values = Object.values(lectureData);
		const placeholders = columns.map((_, index) => `$${index + 1}`).join(", ");
		const columnNames = columns.map((col) => `"${col}"`).join(", ");

		const insertQuery = `
        INSERT INTO lectures (${columnNames})
        VALUES (${placeholders})
        RETURNING *;
    `;

		const { rows: newLecture } = await sql.query(insertQuery, values);

		if (newLecture.length === 0) {

			return NextResponse.json(
				{
					success: false,
					message: "Failed to create service.",
					data: null
				},
				{ status: 500 }
			);

		}

		// Return the newly created record
		return NextResponse.json(
			{
				success: true,
				message: "Lecture created successfully",
				data: newLecture[0]
			},
			{ status: 201 }
		);

	} catch (error) {

		console.error("Error creating lecture:", error);

		return NextResponse.json(
			{
        success: false,
        message: "Error creating lecture",
        data: null
      },
			{ status: 500 }
		);

	}
}
