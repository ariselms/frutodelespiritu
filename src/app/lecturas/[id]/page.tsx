// this is the view to see the single article details, it will use the article id to fetch it from the server side
import { sql } from "@vercel/postgres";
import Link from "next/link";
import "../../articles.css";
import Image from "next/image";

interface PageProps {
  params: { id: string };
}

export default async function SingleLecturePage({
	params
}: {
	params: Promise<{ id: string }>;
}) {
  const { id } = await params;

	let FetchedDetailedArticled;
  let FetchedRecentArticles;

	const { rows: DbArticleDetails } = await sql`
    SELECT
      articles.*,
      users.name as author_name,
      categories.name as category,
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
      categories.name as category,
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
		<main className="pb-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
			<header className="bg-[url('https://flowbite.s3.amazonaws.com/blocks/marketing-ui/articles/background.png')] w-full h-[460px] xl:h-[537px] bg-no-repeat bg-cover bg-center bg-blend-darken relative">
				<div className="absolute top-0 left-0 w-full h-full text-orange-700 bg-orange-100/80 dark:bg-black/70"></div>
				<div className="absolute top-20 left-1/2 px-4 mx-auto w-full max-w-screen-xl -translate-x-1/2 xl:top-1/2 xl:-translate-y-1/2 xl:px-0">
					<Link
						href={`/lecturas?category=${FetchedDetailedArticled.category_id}`}
						className="inline-block mb-4 rounded-lg px-2 py-1 bg-orange-700 dark:bg-gray-700 text-white dark:text-gray-300">
						{FetchedDetailedArticled.category}
					</Link>
					<h1 className="mb-4 max-w-4xl text-2xl font-extrabold leading-none sm:text-3xl lg:text-4xl text-orange-700 dark:text-gray-300">
						{FetchedDetailedArticled.title}
					</h1>
					<p className="text-lg font-normal text-gray-900 dark:text-gray-300">
						{FetchedDetailedArticled.summary}
					</p>
				</div>
			</header>
			<div className="rich-text-content flex relative z-20 justify-between p-6 -m-36 mx-4 max-w-screen-xl bg-white dark:bg-gray-800 rounded xl:-m-32 xl:p-9 xl:mx-auto">
				<div
					className="pr-8"
					dangerouslySetInnerHTML={{ __html: FetchedDetailedArticled.content }}
				/>
				<aside className="hidden xl:block" aria-labelledby="sidebar-label">
					<div className="xl:w-[336px] sticky top-6">
						<h3 id="sidebar-label" className="sr-only">
							Sidebar
						</h3>
						<div className="mb-8">
							<h4 className="mb-2 text-sm font-bold text-gray-900 dark:text-white uppercase">
								Flowbite News morning headlines
							</h4>
							<p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
								Get all the stories you need-to-know from the most powerful name
								in news delivered first thing every morning to your inbox
							</p>
							<button
								type="button"
								data-modal-target="newsletter-modal"
								data-modal-toggle="newsletter-modal"
								className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 text-center w-full">
								Subscribe
							</button>
						</div>
						<div className="mb-12">
							<h4 className="mb-4 text-sm font-bold text-gray-900 dark:text-white uppercase">
								Latest news
							</h4>
							<div className="mb-6 flex items-center">
								<a href="#" className="shrink-0">
									<Image
										width={1}
										height={1}
										src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/articles/image-1.png"
										className="mr-4 max-w-full w-24 h-24 rounded-lg"
										alt="Image 1"
									/>
								</a>
								<div>
									<h5 className="mb-2 text-lg font-bold leading-tight dark:text-white text-gray-900">
										Our first office
									</h5>
									<p className="mb-2 text-gray-500 dark:text-gray-400">
										Over the past year, Volosoft has undergone changes.
									</p>
									<a
										href="#"
										className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline">
										Read in 9 minutes
									</a>
								</div>
							</div>
							<div className="mb-6 flex items-center">
								<a href="#" className="shrink-0">
									<Image
										width={1}
										height={1}
										src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/articles/image-2.png"
										className="mr-4 max-w-full w-24 h-24 rounded-lg"
										alt="Image 2"
									/>
								</a>
								<div>
									<h5 className="mb-2 text-lg font-bold leading-tight dark:text-white text-gray-900">
										Enterprise Design tips
									</h5>
									<p className="mb-2 text-gray-500 dark:text-gray-400">
										Over the past year, Volosoft has undergone changes.
									</p>
									<a
										href="#"
										className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline">
										Read in 14 minutes
									</a>
								</div>
							</div>
							<div className="mb-6 flex items-center">
								<a href="#" className="shrink-0">
									<Image
										width={1}
										height={1}
										src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/articles/image-3.png"
										className="mr-4 max-w-full w-24 h-24 rounded-lg"
										alt="Image 3"
									/>
								</a>
								<div>
									<h5 className="mb-2 text-lg font-bold leading-tight dark:text-white text-gray-900">
										Partnered up with Google
									</h5>
									<p className="mb-2 text-gray-500 dark:text-gray-400">
										Over the past year, Volosoft has undergone changes.
									</p>
									<a
										href="#"
										className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline">
										Read in 9 minutes
									</a>
								</div>
							</div>
						</div>
						<div>
							<a
								href="#"
								className="flex justify-center items-center mb-3 w-full h-48 bg-gray-100 rounded-lg dark:bg-gray-700">
								<svg
									aria-hidden="true"
									className="w-8 h-8 text-gray-400"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg">
									<path
										fillRule="evenodd"
										d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
										clipRule="evenodd"></path>
								</svg>
							</a>
							<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
								Students and Teachers, save up to 60% on Flowbite Creative
								Cloud.
							</p>
							<p className="text-xs text-gray-400 uppercase dark:text-gray-500">
								Ads placeholder
							</p>
						</div>
					</div>
				</aside>
			</div>

			<aside
				aria-label="Related articles"
				className="py-8 lg:py-24 mt-36 bg-orange-100 dark:bg-gray-900">
				<div className="px-8 mx-auto max-w-screen-xl">
					<h2 className="mb-6 lg:mb-8 text-2xl font-bold text-gray-900 dark:text-white">
						Artículos recientes
					</h2>
					<div className="grid gap-6 lg:gap-12 md:grid-cols-2">
						{FetchedRecentArticles.map((article) => (
							<article key={article.id} className="flex flex-col xl:flex-row">
								<Link
									href={`/lecturas/${article.id}`}
									className="xl:mb-0 w-2/6 mr-3">
									<Image
										width={300}
										height={300}
										src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-1.png"
										className="h-full mr-5 w-full object-cover rounded-2xl"
										alt="Image 1"
									/>
								</Link>
								<div className="flex-1 flex flex-col justify-center w-4/6 pb-1">
									<h2 className="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
										<Link href={`/lecturas/${article.id}`}>
											{article.title}
										</Link>
									</h2>
									<p className="mb-4 text-gray-800 dark:text-gray-300 max-w-sm">
										{article.summary}
									</p>
									<Link
										href={`/lecturas?page=1&limit=10&category=${article.category_id}`}
										className="inline-flex items-center font-medium underline underline-offset-4 text-orange-600 dark:text-orange-500 hover:no-underline">
										{article.category}
									</Link>
								</div>
							</article>
						))}
					</div>
				</div>
			</aside>
		</main>
	);
}
