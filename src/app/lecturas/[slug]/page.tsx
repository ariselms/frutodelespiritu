// this is the view to see the single article details, it will use the article id to fetch it from the server side
import { QueryResultRow, sql } from "@vercel/postgres";
import Link from "next/link";
import "../../lectures.css";
import Image from "next/image";
import { ArticleType } from "@/models/articlesTypes";
import ArticleDetailRandomVerse from "@/components/bible/ArticleDetailRandomVerse";
import {ShareButtons} from "@/components/ShareButtons";
import { SaveLecturebutton } from "@/components/SaveLectureButton";
import ReferenceTagger from "@/components/bible/ReferenceTagger";

export async function generateMetadata({
	params
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

  const {rows: article}: QueryResultRow =
		await sql`SELECT * FROM lectures WHERE slug = ${slug}`;

  let a = article[0];

	return {
		title: `${a?.title} | Fruto del Espíritu`,
		description: a?.summary,
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
		].concat(a?.title?.split(" ")),
		robots: {
			index: true,
			follow: true
		},
		openGraph: {
			title: `${a?.title} | Fruto del Espíritu`,
			description: a?.summary,
			url: `https://frutodelespiritu.com/lecturas/${slug}`,
			siteName: "Fruto del Espíritu",
			type: "website",
			locale: "es_US",
			images: [
				{
					url: `${a?.image_url}`,
					alt: "Fruto del Espíritu"
				}
			]
		}
	};
}

export default async function SingleLecturePage({
	params
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

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
    AND lectures.slug = ${slug}
  `;

	const { rows: DbRecentArticles } = await sql`
    SELECT
      lectures.*,
      categories.name as category_name,
      categories.id as category_id
    FROM lectures
    INNER JOIN categories ON lectures.category_id = categories.id
    WHERE lectures.draft = false
    AND lectures.slug != ${slug}
    ORDER BY created_at DESC
    LIMIT 6
  `;

	FetchedDetailedArticled = DbArticleDetails[0];

	FetchedRecentArticles = DbRecentArticles;

	return (
		<main className="pb-16 lg:pb-24 bg-sky-50 dark:bg-gray-800 antialiased">
			<header
				className="w-full h-[450px] xl:h-[537px] bg-no-repeat bg-cover bg-center bg-blend-darken relative mb-16 flex justify-center items-center"
				style={{
					backgroundImage: `url(${FetchedDetailedArticled?.image_url})`
				}}>
				<div className="absolute top-0 left-0 w-full h-full text-sky-700 bg-sky-100/70 dark:bg-black/60"></div>
				<div className="z-10 px-4 xl:mb-16 mx-auto w-full max-w-screen-xl xl:px-0">
					<Link
						href={`/lecturas?category=${FetchedDetailedArticled.category_id}`}
						className="inline-block mb-4 rounded-2xl px-2 py-1 bg-sky-700 hover:bg-sky-800 dark:bg-gray-900 dark:hover:bg-gray-800 dark:border dark:border-gray-600 text-white transition-all">
						{FetchedDetailedArticled.category_name}
					</Link>
					<h1 className="mb-4 max-w-4xl text-2xl font-extrabold leading-none sm:text-3xl lg:text-4xl text-black dark:text-gray-300">
						{FetchedDetailedArticled.title}
					</h1>
					<p className="text-lg font-normal text-gray-900 dark:text-gray-300 line-clamp-5 max-w-[80ch]">
						{FetchedDetailedArticled.summary}
					</p>
				</div>
			</header>
			<div className="flex relative z-20 justify-between p-6 mx-4 max-w-screen-xl bg-gray-50 dark:bg-gray-950 border border-sky-200 dark:border-gray-600 rounded-2xl xl:-m-32 xl:p-9 xl:mx-auto">
					<div className="rich-text-content">
						<div
							className="pr-8 flex-2"
							dangerouslySetInnerHTML={{
								__html: FetchedDetailedArticled.content
							}}
						/>
					</div>
				<aside
					className="hidden lg:block flex-1"
					aria-labelledby="sidebar-label">
					<div className="xl:w-full sticky top-6">
						<h3 id="sidebar-label" className="sr-only">
							Sidebar
						</h3>
						<ArticleDetailRandomVerse />
						<ShareButtons />
						<SaveLecturebutton lectureId={FetchedDetailedArticled.id} />
					</div>
				</aside>
			</div>
			<div className="lg:hidden py-8 lg:py-16 mt-0 lg:mt-32">
				<SaveLecturebutton lectureId={FetchedDetailedArticled.id} />
				<ShareButtons />
				<ArticleDetailRandomVerse />
			</div>
			<section aria-label="Related articles" className="mt-4 lg:mt-16 xl:mt-44">
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
										href={`/lecturas/${article.slug}`}
										className="xl:mb-0 w-full md:w-2/6 mr-3">
										<Image
											width={300}
											height={300}
											src={article?.image_url}
											className="h-full mr-5 w-full object-cover rounded-2xl"
											alt="Image 1"
										/>
									</Link>
									<div className="flex-1 flex flex-col justify-start md:w-4/6 pb-1">
										<Link
											href={`/lecturas?page=1&limit=10&category=${article?.category_id}`}
											className="inline-flex items-center font-medium underline underline-offset-4 text-sky-700 dark:text-gray-300 hover:no-underline my-2">
											{article?.category_name}
										</Link>
										<h2 className="mb-2 text-xl font-bold leading-tight text-sky-700 dark:text-white hover:underline">
											<Link href={`/lecturas/${article?.slug}`}>
												{article?.title}
											</Link>
										</h2>
										<p className="mb-4 text-gray-800 dark:text-gray-300 max-w-sm">
											{article?.summary}
										</p>
									</div>
								</article>
							)
						)}
					</div>
				</div>
			</section>
		</main>
	);
}
