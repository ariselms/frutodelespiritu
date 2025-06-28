import Image from "next/image";

export function RecentArticles() {
	return (
		<article className="flex flex-col xl:flex-row">
			<a href="#" className="mb-2 xl:mb-0 w-2/6 pt-3 mr-3">
				<Image
					width={300}
					height={300}
					src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-1.png"
					className="inline-block mr-5 w-full"
					alt="Image 1"
				/>
			</a>
			<div className="flex-1 flex flex-col justify-center w-4/6">
				<h2 className="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
					<a href="#">Our first office</a>
				</h2>
				<p className="mb-4 text-gray-800 dark:text-gray-300 max-w-sm">
					Over the past year, Volosoft has undergone many changes! After months
					of preparation.
				</p>
				<a
					href="#"
					className="inline-flex items-center font-medium underline underline-offset-4 text-orange-600 dark:text-orange-500 hover:no-underline">
					Read in 2 minutes
				</a>
			</div>
		</article>
	);
}
