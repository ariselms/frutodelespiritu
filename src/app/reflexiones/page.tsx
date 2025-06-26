import JumbotronSection from "@/components/JumbotronSection";
// We will create this new component for the pagination buttons
import { PaginationControls } from "@/components/blog/PaginationControls";
import { BlogList } from "@/components/blog/item";
import { FetchEndpoints, serverBaseUrl } from "@/static";
import { PaginatedResponse } from "@/models/navigationTypes";
import { sql } from "@vercel/postgres";

// Server Components receive `searchParams` as a prop
export default async function ReflexionesPage({
	searchParams
}: {
	searchParams: any;
}) {
	// 1. Get URL Search Parameters
	let { page, limit } = await searchParams;

	// 2. Get and validate 'limit' and 'page'
	//    Provide sensible defaults if they are missing or invalid.
	page = Number(page) || 1; // Default to page 1
	limit = Number(limit) || 10; // Default to 10 items per page

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

	return (
		<main>
			<JumbotronSection
				section="Reflexiones Biblicas"
				imageSrc="/images/cross-with-flowers.svg"
			/>
			<BlogList articles={articles} />

			<PaginationControls
				currentPage={page}
				totalPages={totalPages}
				totalItems={totalItems}
				limit={limit}
			/>
		</main>
	);
}
