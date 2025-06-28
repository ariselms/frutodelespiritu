"use client";

import Image from "next/image";
import Link from "next/link";

export function BlogSection() {
	return (
		<div className="mx-auto max-w-screen-sm text-center mb-16">
			<h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
				Aprendizaje y crecimiento
			</h2>
			<p className="mt-2 text-lg/8 text-gray-600 dark:text-gray-200">
				Descubre artículos y recursos que te ayudarán a profundizar en tu fe y a
				crecer espiritualmente.
			</p>
		</div>
	);
}

// TODO: Create BlogItem type
export function BlogItem({ article }: { article: any }) {
	const creation_date = new Date(article.created_at); // Ensure it's a Date object if it's coming as a string

	// Format the date to a more readable format
	const formatDate = (date: Date) => {
		const options: Intl.DateTimeFormatOptions = {
			year: "numeric",
			month: "long",
			day: "numeric",
		};
		return date.toLocaleDateString("es-US", options);
	};

	return (
		<article className="relative isolate flex flex-col gap-8 lg:flex-row p-6 border border-orange-200 dark:border-gray-700 rounded-2xl">
			<div className="relative aspect-video sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
				<img
					alt="Article image"
					src={"/images/church.svg"}
					className="absolute inset-0 size-full rounded-2xl bg-transparent object-cover border-0"
				/>
			</div>
			<div className="flex flex-col justify-between">
				<div>
					<div className="flex items-center gap-x-4 text-xs">
						<span className="relative z-10 rounded-full bg-orange-100 border border-orange-700 dark:border-gray-50 dark:bg-gray-900 px-3 py-1.5 font-medium text-orange-700 dark:text-gray-50  transition-colors duration-200">
							{article.category_name}
						</span>
						<time
							dateTime={formatDate(creation_date)}
							className="text-gray-700 dark:text-gray-300">
							{formatDate(creation_date)}
						</time>
					</div>
					<div className="group relative max-w-xl">
						<h3 className="mt-3 text-xl font-semibold text-orange-700 dark:text-gray-100 group-hover:text-gray-600 dark:group-hover:text-gray-200">
							<Link href={`/lecturas/${article.id}`}>
								<span className="absolute inset-0" />
								{article.title}
							</Link>
						</h3>
						<p className="mt-5 text-base text-gray-700 dark:text-gray-200">
							{article.summary}
						</p>
					</div>
				</div>
				<div className="mt-6 flex pt-6">
					<div className="relative flex items-center gap-x-4">
						<Image
              width={40}
              height={40}
							alt=""
							src={article.author_image_url || "/images/church.svg"}
							className="size-10 rounded-full bg-gray-50"
						/>
						<div className="text-sm/6">
							<p className="font-semibold text-gray-900 dark:text-gray-100">
								<a href={""}>
									<span className="absolute inset-0" />
									{article.author_name}
								</a>
							</p>
						</div>
					</div>
				</div>
			</div>
		</article>
	);
}

// TODO: Create Blog type
export function BlogList({ children, articles }: { children: React.ReactNode; articles: any }) {
	return (
		<section className="bg-white dark:bg-gray-800 py-24 sm:py-32">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<BlogSection />
        {children}
				<div className="mt-16 space-y-20 lg:mt-20 lg:space-y-8  ">
					{articles?.map((article: any) => (
						<BlogItem key={article.id} article={article} />
					))}
				</div>
			</div>
		</section>
	);
}
