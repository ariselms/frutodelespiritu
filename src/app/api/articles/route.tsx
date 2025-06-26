import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

// The `request` object contains all the information about the incoming request
export async function GET(request: NextRequest) {
	try {
		// 1. Get URL Search Parameters
		const { searchParams } = new URL(request.url);

		// 2. Get and validate 'limit' and 'page'
		//    Provide sensible defaults if they are missing or invalid.
		const limit = Number(searchParams.get("limit")) || 9;
		const page = Number(searchParams.get("page")) || 1;

		// Ensure they are positive integers
		if (limit <= 0) {
			return NextResponse.json(
				{ error: "Limit must be a positive number" },
				{ status: 400 }
			);
		}
		if (page <= 0) {
			return NextResponse.json(
				{ error: "Page must be a positive number" },
				{ status: 400 }
			);
		}

		// 3. Calculate the OFFSET for SQL pagination
		//    For page 1, offset is 0. For page 2, offset is `limit`, and so on.
		const offset = (page - 1) * limit;

		// 4. Run two queries concurrently for better performance
		//    - One to get the paginated list of articles
		//    - One to get the total count of all articles for calculating total pages
		const [articlesResult, countResult] = await Promise.all([
			// Query for the specific page of articles
			sql`
        SELECT * FROM articles
        WHERE draft = false
        ORDER BY created_at DESC
        LIMIT ${limit}
        OFFSET ${offset}
      `,
			// Query for the total count of non-draft articles
			sql`
        SELECT COUNT(*) as total_count
        FROM articles
        WHERE draft = false
      `
		]);

		const articles = articlesResult.rows;
		const totalItems = Number(countResult.rows[0].total_count);
		const totalPages = Math.ceil(totalItems / limit);

		// 5. Return the data along with pagination metadata
		return NextResponse.json(
			{
				success: true,
				message: "Articles fetched successfully!",
				// The front-end expects `data` and `meta` objects from our previous example
				data: {
					articles,
					totalItems,
					totalPages,
					currentPage: page
				}
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error in GET /api/articles:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
export async function POST(request: Request) {

  try {
		const body = await request.json();

    console.log("--- Received body ---");
    console.log(body);

		const { rows: newPublication } = await sql`
      INSERT INTO articles
      (image_url, title, summary, category_id, slug, by_user_id, content, video_url, draft, created_at, updated_at)
      VALUES (
        ${body.image_url},
        ${body.title},
        ${body.summary},
        ${body.category_id as number},
        ${body.slug},
        ${body.by_user_id as number},
        ${body.content},
        ${body.video_url},
        ${body.draft},
        ${new Date(body.createdat).toISOString()},
        ${new Date(body.updatedat).toISOString()}
      ) RETURNING *
    `;

		// user new publication to send success message
		if (newPublication) {
			return NextResponse.json({
				success: true,
				message: "Publication posted successfully!",
				data: newPublication[0]
			}, { status: 201 });
			// send an error if anything goes wrong
		} else {
			return NextResponse.json({
				success: false,
				message: "There was an error, please try again.",
        data: null
      }, { status: 500 });;
		}

	} catch (error) {

    console.error("Error in POST /api/articles:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });

  }

}