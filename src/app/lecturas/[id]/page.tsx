// this is the view to see the single article details, it will use the article id to fetch it from the server side
import { QueryResultRow, sql } from "@vercel/postgres";
import Link from "next/link";
import "../../lectures.css";
import Image from "next/image";
import { ArticleType } from "@/models/articlesTypes";
import ArticleDetailRandomVerse from "@/components/bible/ArticleDetailRandomVerse";

export default async function SingleLecturePage({
	params
}: {
	params: Promise<{ id: string }>;
}) {
  const { id } = await params;

	let FetchedDetailedArticled: ArticleType | QueryResultRow;
  let FetchedRecentArticles: ArticleType[] | QueryResultRow[];

	const { rows: DbArticleDetails } = await sql`
    SELECT
      lectures.*,
      users.name as author_name,
      categories.name as category_name,
      categories.id as category_id
    FROM lectures
    INNER JOIN users ON lectures.by_user_id = users.id
    INNER JOIN categories ON lectures.category_id = categories.id
    WHERE lectures.draft = false
    AND lectures.id = ${id}
  `;

  const { rows: DbRecentArticles } = await sql`
    SELECT
      lectures.*,
      categories.name as category_name,
      categories.id as category_id
    FROM lectures
    INNER JOIN categories ON lectures.category_id = categories.id
    WHERE lectures.draft = false
    AND lectures.id != ${id}
    ORDER BY created_at DESC
    LIMIT 6
  `;

	FetchedDetailedArticled = DbArticleDetails[0];

  FetchedRecentArticles = DbRecentArticles;

	return (
		<main className="pb-16 lg:pb-24 bg-orange-50 dark:bg-gray-900 antialiased">
			<header
				className="w-full h-[450px] xl:h-[537px] bg-no-repeat bg-cover bg-center bg-blend-darken relative"
				style={{
					backgroundImage: `url(${FetchedDetailedArticled?.image_url})`
				}}>
				<div className="absolute top-0 left-0 w-full h-full text-orange-700 bg-orange-100/80 dark:bg-black/70"></div>
				<div className="absolute top-20 left-1/2 px-4 mx-auto w-full max-w-screen-xl -translate-x-1/2 xl:top-1/2 xl:-translate-y-1/2 xl:px-0">
					<Link
						href={`/lecturas?category=${FetchedDetailedArticled.category_id}`}
						className="inline-block mb-4 rounded-lg px-2 py-1 bg-orange-700 hover:bg-orange-600 dark:bg-gray-800 dark:hover:bg-gray-900 text-white transition-all">
						{FetchedDetailedArticled.category_name}
					</Link>
					<h1 className="mb-4 max-w-4xl text-2xl font-extrabold leading-none sm:text-3xl lg:text-4xl text-orange-700 dark:text-gray-300">
						{FetchedDetailedArticled.title}
					</h1>
					<p className="text-lg font-normal text-gray-900 dark:text-gray-300 line-clamp-5">
						{FetchedDetailedArticled.summary}
					</p>
				</div>
			</header>
			<div className="rich-text-content flex relative z-20 justify-between p-6 -m-16 mx-4 max-w-screen-xl bg-gray-50 dark:bg-gray-800 shadow shadow-orange-300 dark:shadow-gray-700 rounded-2xl xl:-m-32 xl:p-9 xl:mx-auto">
				<div
					className="pr-8 flex-2"
					dangerouslySetInnerHTML={{ __html: FetchedDetailedArticled.content }}
				/>
				<aside
					className="hidden lg:block flex-1"
					aria-labelledby="sidebar-label">
					<div className="xl:w-full sticky top-6">
						<h3 id="sidebar-label" className="sr-only">
							Sidebar
						</h3>
            <ArticleDetailRandomVerse/>
					</div>
				</aside>
			</div>

			<aside aria-label="Related articles" className="py-8 lg:py-16 mt-40 lg:mt-32 ">
				<div className="px-8 mx-auto max-w-screen-xl">
					<h2 className="mb-6 lg:mb-8 text-2xl font-bold text-gray-900 dark:text-white">
						Artículos recientes
					</h2>
					<div className="grid xl:grid-cols-2 gap-6 lg:gap-8">
						{FetchedRecentArticles.map(
							(article: ArticleType | QueryResultRow) => (
								<article
									key={article.id}
									className="flex flex-col md:flex md:flex-row">
									<Link
										href={`/lecturas/${article.id}`}
										className="xl:mb-0 w-full md:w-2/6 mr-3">
										<Image
											width={300}
											height={300}
											src={
												article?.image_url !== ""
													? article?.image_url
													: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-1.png"
											}
											className="h-full mr-5 w-full object-cover rounded-2xl"
											alt="Image 1"
										/>
									</Link>
									<div className="flex-1 flex flex-col justify-start md:w-4/6 pb-1">
										<Link
											href={`/lecturas?page=1&limit=10&category=${article.category_id}`}
											className="inline-flex items-center font-medium underline underline-offset-4 text-orange-600 dark:text-gray-300 hover:no-underline my-2">
											{article.category_name}
										</Link>
										<h2 className="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white hover:underline">
											<Link href={`/lecturas/${article.id}`}>
												{article.title}
											</Link>
										</h2>
										<p className="mb-4 text-gray-800 dark:text-gray-300 max-w-sm">
											{article.summary}
										</p>
									</div>
								</article>
							)
						)}
					</div>
				</div>
			</aside>
		</main>
	);
}