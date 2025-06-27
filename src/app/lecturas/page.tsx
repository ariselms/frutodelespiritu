import JumbotronSection from "@/components/JumbotronSection";
import { KeywordSearch } from "@/components/blog/KeywordSearch";
// We will create this new component for the pagination buttons
import { PaginationControls } from "@/components/blog/PaginationControls";
import { BlogList } from "@/components/blog/item";
import { sql } from "@vercel/postgres";

// Server Components receive `searchParams` as a prop
export default async function ReflexionesPage({
	searchParams
}: {
	searchParams: any;
}) {
	// 1. Get URL Search Parameters
	let { page, limit, keyword, category } = await searchParams;

	// 2. Get and validate 'limit' and 'page'
	page = Number(page) || 1; // Default to page 1
	limit = Number(limit) || 10; // Default to 10 items per page
	keyword = keyword || ""; // Default to empty string if no keyword
	category || ""; // Default to empty string if no category

	// 3. Calculate the OFFSET for SQL pagination
	const offset = (page - 1) * limit;

	let [articlesResult, categoriesResult, countResult]: any[] = [];

	if (category === undefined) {
		// 4. Run two queries concurrently for better performance
		[articlesResult, categoriesResult, countResult] = await Promise.all([
			// Query for the specific page of articles
			sql`
          SELECT
            articles.*,
            users.name as author_name,
            users.role as author_role,
            users.image_url as author_image_url,
            categories.name as category_name
          FROM articles
          INNER JOIN users ON articles.by_user_id = users.id
          INNER JOIN categories ON articles.category_id = categories.id
          WHERE articles.draft = false
          AND articles.title ILIKE '%' || ${keyword} || '%'
          OR articles.summary ILIKE '%' || ${keyword} || '%'
          OR articles.content ILIKE '%' || ${keyword} || '%'
          ORDER BY articles.created_at DESC
          LIMIT ${limit}
          OFFSET ${offset}
      `,

			// Query for categories to use in the search component
			sql`
        SELECT * FROM categories
      `,

			// Query for the total count of non-draft articles
			sql`
          SELECT COUNT(*) as total_count
          FROM articles
          WHERE draft = false
        `
		]);
	} else {
		// 4. Run two queries concurrently for better performance
		[articlesResult, categoriesResult, countResult] = await Promise.all([
			// Query for the specific page of articles
			sql`
          SELECT
            articles.*,
            users.name as author_name,
            users.role as author_role,
            users.image_url as author_image_url,
            categories.name as category_name
          FROM articles
          INNER JOIN users ON articles.by_user_id = users.id
          INNER JOIN categories ON articles.category_id = categories.id
          WHERE articles.draft = false
          AND articles.category_id = ${category}
          ORDER BY articles.created_at DESC
          LIMIT ${limit}
          OFFSET ${offset}
      `,

			// Query for categories to use in the search component
			sql`
          SELECT * FROM categories
      `,

			// Query for the total count of non-draft articles
			sql`
          SELECT COUNT(*) as total_count
          FROM articles
          WHERE draft = false
          AND category_id = ${category}
      `
		]);
	}

	const articles = articlesResult.rows;
	const totalItems = Number(countResult.rows[0].total_count);
	const totalPages = Math.ceil(totalItems / limit);

	return (
		<main>
			<JumbotronSection
				section="Lecturas Biblicas"
				imageSrc="/images/cross-with-flowers.svg"
			/>

			<BlogList articles={articles}>
				<KeywordSearch
					searchTerm={keyword || ""}
					categories={categoriesResult.rows}
				/>
			</BlogList>

			<PaginationControls
				currentPage={page}
				totalPages={totalPages}
				totalItems={totalItems}
				limit={limit}
			/>
		</main>
	);
}
