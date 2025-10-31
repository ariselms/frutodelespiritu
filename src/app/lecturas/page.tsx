import JumbotronSection from "@/components/JumbotronSection";
import { ArticleSearch } from "@/components/blog/ArticleSearch";
// We will create this new component for the pagination buttons
import { PaginationControls } from "@/components/blog/PaginationControls";
import { ArticleList } from "@/components/blog/item";
import { sql } from "@vercel/postgres";
import { ArticleType, CategoryType } from "@/models/articlesTypes";
import Router from "next/router";

// Server Components receive `searchParams` as a prop
export default async function ReflexionesPage({
	searchParams
}: {
	searchParams: any;
}) {
	// 1. Get URL Search Parameters
	let { page, limit, keyword,
    // category
  } = await searchParams;

	// 2. Get and validate 'limit' and 'page'
	page = Number(page) || 1; // Default to page 1
	limit = Number(limit) || 10; // Default to 10 items per page
	keyword = keyword || ""; // Default to empty string if no keyword
	// category = Number(category) || undefined; // Default to undefined if no category

	// 3. Calculate the OFFSET for SQL pagination
	const offset = (page - 1) * limit;

	let [articlesResult, categoriesResult, countResult]: any[] = [];
	// 4. Run two queries concurrently for better performance
	[articlesResult, categoriesResult,
    // countResult
  ] = await Promise.all([
		// Query for the specific page of articles
		sql`
          SELECT
            lectures.*,
            users.name as author_name,
            users.role as author_role,
            users.image_url as author_image_url,
            categories.name as category_name
          FROM lectures
          INNER JOIN users ON lectures.by_user_id = users.id
          INNER JOIN categories ON lectures.category_id = categories.id
          WHERE lectures.draft = false
          AND lectures.title ILIKE '%' || ${keyword} || '%'
          OR lectures.summary ILIKE '%' || ${keyword} || '%'
          OR lectures.content ILIKE '%' || ${keyword} || '%'
          ORDER BY lectures.created_at DESC
          LIMIT ${limit}
          OFFSET ${offset}
      `,

		// Query for categories to use in the search component
		sql`
        SELECT * FROM categories
      `,
	]);

	const articles: ArticleType[] = articlesResult.rows;
	const categories: CategoryType[] = categoriesResult.rows;
	const totalItems: number = articlesResult.rows.length;
	const totalPages: number = Math.ceil(totalItems / limit);

	let JumbotronTitle: string = "Todas las lecturas";

	// if (category === 1) {
	// 	JumbotronTitle = "Estudios de la Biblia";
	// }

	// if (category === 2) {
	// 	JumbotronTitle = "Reflexiones de la Biblia";
	// }

	return (
		<main>
			<JumbotronSection
				section={JumbotronTitle}
				description="Estudios bìblicos y reflexiones para meditar, aprender y crecer en la fe."
			/>

			<ArticleList articles={articles}>
				<ArticleSearch searchTerm={keyword || ""} categories={categories} />
			</ArticleList>

			<PaginationControls
				currentPage={page}
				totalPages={totalPages}
				totalItems={totalItems}
				limit={limit}
			/>
		</main>
	);
}

export const metadata = {
	title: "Reflexiones | Fruto del Espíritu",
	description:
		"Utiliza nuestras reflexiones (devocionales) para meditar sobre la Palabra de Dios o entra más profunto al conocimiento del Todopoderoso a través de los Estudios Bíblicos. También puedes guardar estudios y reflexiones para el futuro. Descúbre mucho más en el nuevo y rediseñado Fruto del Espíritu.",
	keywords: [
		"devocionales",
		"cristiano",
		"reflexiones",
		"estudios bíblicos",
		"biblias en espanol",
		"la biblia en espanol",
		"biblia en espanol",
		"entiende la biblia",
		"espiritu santo",
		"aprende la biblia",
		"libros de la biblia reina valera 1960 en orden",
		"lista de libros de la biblia reina valera 1960",
		"tres significados de mundo en la biblia",
		"significados de mundo en la biblia"
	],
	robots: {
		index: true,
		follow: true
	},
	openGraph: {
		title: "Reflexiones | Fruto del Espíritu",
		description:
			"Utiliza nuestras reflexiones (devocionales) para meditar sobre la Palabra de Dios o entra más profunto al conocimiento del Todopoderoso a través de los Estudios Bíblicos. También puedes guardar estudios y reflexiones para el futuro. Descúbre mucho más en el nuevo y rediseñado Fruto del Espíritu.",
		url: "https://frutodelespiritu.com/lecturas",
		siteName: "Fruto del Espíritu",
		type: "website",
		locale: "es_US",
		images: [
			{
				url: "https://frutodelespiritu.com/images/logo.png",
				alt: "Fruto del Espíritu"
			}
		]
	}
};
