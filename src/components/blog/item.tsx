"use client";
import { ArticleType } from "@/models/articlesTypes";
import Image from "next/image";
import Link from "next/link";

export function ArticleItem({ article }: { article: ArticleType }) {
	// Ensure it's a Date object if it's coming as a string
	const creation_date = new Date(article.updated_at);

	// Format the date to a more readable format
	const formatDate = (date: Date) => {
		const options: Intl.DateTimeFormatOptions = {
			year: "numeric",
			month: "long",
			day: "numeric"
		};
		return date.toLocaleDateString("es-US", options);
	};

	return (
		<article className="relative isolate flex flex-col gap-8 lg:flex-row p-0 bg-sky-50 dark:bg-gray-900/50 border-sky-100 dark:border-gray-600 rounded-2xl border">
			<div className="relative aspect-video sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
				<Image
					alt="Article image"
					src={article?.image_url}
					width={500}
					height={500}
					className="absolute inset-0 size-full rounded-t-2xl lg:rounded-tr-none lg:rounded-l-2xl bg-transparent object-cover lg:border-y-0 lg:border-l-0 lg:border-r border-sky-100 dark:border-gray-600"
				/>
			</div>
			<div className="flex flex-col px-4 pt-0 pb-10 lg:pt-6">
				<div className="flex items-center gap-x-4 text-xs">
					{/* <span className="relative z-10 rounded-2xl bg-sky-100 border border-sky-200 dark:border-none dark:bg-white px-3 py-1.5 font-medium text-black dark:text-black transition-colors duration-200">
							{article.category_name}
						</span> */}
					<time
						dateTime={formatDate(creation_date)}
						className="text-gray-800 dark:text-gray-200">
						{formatDate(creation_date)}
					</time>
				</div>
				<div className="group relative max-w-xl">
					<h3 className="mt-4 text-xl font-semibold text-sky-700 dark:text-white group-hover:text-sky-800 dark:group-hover:text-gray-200 dark:underline">
						<Link href={`/lecturas/${article.slug}`}>
							<span className="absolute inset-0" />
							{article.title}
						</Link>
					</h3>
					<p className="mt-6 text-base text-gray-800 dark:text-gray-100">
						{article.summary}
					</p>
				</div>
			</div>
		</article>
	);
}

export function ArticleList({
	children,
	articles
}: {
	children: React.ReactNode;
	articles: ArticleType[];
}) {
	return (
		<section className="bg-white dark:bg-gray-800 border border-t-sky-100 dark:border-t-gray-700 border-b-transparent py-8 sm:py-16">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				{children}
				<div className="space-y-4 mt-8 lg:mt-16">
					{articles?.map((article: ArticleType) => (
						<ArticleItem key={article.id} article={article} />
					))}
				</div>
			</div>
		</section>
	);
}
