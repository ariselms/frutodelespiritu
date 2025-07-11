// this is the view to see the single article details, it will use the article id to fetch it from the server side
import { QueryResultRow, sql } from "@vercel/postgres";
import Link from "next/link";
import "../../articles.css";
import Image from "next/image";
import { ArticleType } from "@/models/articlesTypes";

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
      articles.*,
      users.name as author_name,
      categories.name as category_name,
      categories.id as category_id
    FROM articles
    INNER JOIN users ON articles.by_user_id = users.id
    INNER JOIN categories ON articles.category_id = categories.id
    WHERE articles.draft = false
    AND articles.id = ${id}
  `;

  const { rows: DbRecentArticles } = await sql`
    SELECT
      articles.*,
      categories.name as category_name,
      categories.id as category_id
    FROM articles
    INNER JOIN categories ON articles.category_id = categories.id
    WHERE articles.draft = false
    AND articles.id != ${id}
    ORDER BY created_at DESC
    LIMIT 6
  `;

	FetchedDetailedArticled = DbArticleDetails[0];

  FetchedRecentArticles = DbRecentArticles;

	return (
		<main className="pb-16 lg:pb-24 bg-orange-50 dark:bg-gray-900 antialiased">
			<header className="bg-[url('https://flowbite.s3.amazonaws.com/blocks/marketing-ui/articles/background.png')] w-full h-[460px] xl:h-[537px] bg-no-repeat bg-cover bg-center bg-blend-darken relative">
				<div className="absolute top-0 left-0 w-full h-full text-orange-700 bg-orange-100/80 dark:bg-black/70"></div>
				<div className="absolute top-20 left-1/2 px-4 mx-auto w-full max-w-screen-xl -translate-x-1/2 xl:top-1/2 xl:-translate-y-1/2 xl:px-0">
					<Link
						href={`/lecturas?category=${FetchedDetailedArticled.category_id}`}
						className="inline-block mb-4 rounded-lg px-2 py-1 bg-orange-700 dark:bg-gray-700 text-white dark:text-gray-300">
						{FetchedDetailedArticled.category_name}
					</Link>
					<h1 className="mb-4 max-w-4xl text-2xl font-extrabold leading-none sm:text-3xl lg:text-4xl text-orange-700 dark:text-gray-300">
						{FetchedDetailedArticled.title}
					</h1>
					<p className="text-lg font-normal text-gray-900 dark:text-gray-300">
						{FetchedDetailedArticled.summary}
					</p>
				</div>
			</header>
			<div className="rich-text-content flex relative z-20 justify-between p-6 -m-36 mx-4 max-w-screen-xl bg-gray-50 dark:bg-gray-800 rounded xl:-m-32 xl:p-9 xl:mx-auto">
				<div
					className="pr-8"
					dangerouslySetInnerHTML={{ __html: FetchedDetailedArticled.content }}
				/>
				<aside className="hidden xl:block" aria-labelledby="sidebar-label">
					<div className="xl:w-[336px] sticky top-6">
						<h3 id="sidebar-label" className="sr-only">
							Sidebar
						</h3>
						<div className="mb-8 border-2 bg-orange-200 dark:bg-gray-900 border-orange-300 dark:border-gray-700 p-4 rounded-2xl">
							<h4 className="">
								Versículo Destacado
							</h4>
							<p className="mb-4 text-sm text-gray-500 dark:text-gray-400 font-extrabold">
								Juan 3:16
							</p>
							<p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
								Porque de tal manera amó Dios al mundo, que ha dado a su Hijo,
								para que todo lo que tenga fe en él, no se pierda, sino que
								tenga vida eterna.
							</p>
							<Link
								className="inline-block mt-6 px-5 py-3 text-sm font-medium text-center text-white rounded-lg cursor-pointer bg-orange-100 dark:bg-gray-700 border border-orange-300 dark:border-gray-600 focus:ring-4 focus:ring-orange-300  dark:focus:ring-gray-800 w-full"
								href="/biblia">
								Lee la Biblia
							</Link>
						</div>
					</div>
				</aside>
			</div>

			<aside aria-label="Related articles" className="py-8 lg:py-16 mt-32">
				<div className="px-8 mx-auto max-w-screen-xl">
					<h2 className="mb-6 lg:mb-8 text-2xl font-bold text-gray-900 dark:text-white">
						Artículos recientes
					</h2>
					<div className="grid xl:grid-cols-2 gap-6 lg:gap-8">
						{FetchedRecentArticles.map(
							(article: ArticleType | QueryResultRow) => (
								<article key={article.id} className="flex flex-col md:flex md:flex-row">
									<Link
										href={`/lecturas/${article.id}`}
										className="xl:mb-0 w-full md:w-2/6 mr-3">
										<Image
											width={300}
											height={300}
											src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-1.png"
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
