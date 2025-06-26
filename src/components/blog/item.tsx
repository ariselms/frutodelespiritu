export function BlogSection() {
	return (
		<div className="mx-auto max-w-screen-sm text-center mb-32">
			<h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
				Aprendizaje y crecimiento
			</h2>
			<p className="mt-2 text-lg/8 text-gray-600">
				Descubre artículos y recursos que te ayudarán a profundizar en tu fe y
        a crecer espiritualmente.
			</p>
		</div>
	);
}

// TODO: Create BlogItem type
export function BlogItem({ article }: { article: any }) {
	return (
		<article
			key={article.id}
			className="relative isolate flex flex-col gap-8 lg:flex-row">
			<div className="relative aspect-video sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
				<img
					alt="Article image"
					src={"/images/church.svg"}
					className="absolute inset-0 size-full rounded-2xl bg-gray-50 object-cover"
				/>
				<div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
			</div>
			<div>
				<div className="flex items-center gap-x-4 text-xs">
					<time dateTime={article.created_at} className="text-gray-500">
						{article.created_at}
					</time>
					<a
						href={""}
						className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
						Category
					</a>
				</div>
				<div className="group relative max-w-xl">
					<h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
						<a href={article.slug}>
							<span className="absolute inset-0" />
							{article.title}
						</a>
					</h3>
					<p className="mt-5 text-sm/6 text-gray-600">{article.summary}</p>
				</div>
				<div className="mt-6 flex border-t border-gray-900/5 pt-6">
					<div className="relative flex items-center gap-x-4">
						<img alt="" src={"/images/cross.svg"} className="size-10 rounded-full bg-gray-50" />
						<div className="text-sm/6">
							<p className="font-semibold text-gray-900">
								<a href={""}>
									<span className="absolute inset-0" />
									Author name
								</a>
							</p>
							<p className="text-gray-600">Author role</p>
						</div>
					</div>
				</div>
			</div>
		</article>
	);
}

// TODO: Create Blog type
export function BlogList({ data }: { data: any }) {
	return (
		<section className="bg-white py-24 sm:py-32">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-2xl lg:max-w-4xl">
          <BlogSection />
					<div className="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
						{data?.articles?.map((article: any) => (
							<BlogItem key={article.id} article={article} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
