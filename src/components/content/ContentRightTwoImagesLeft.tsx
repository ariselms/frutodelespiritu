import { ContentAndTwoImagesProps } from "@/models/componentTypes";

export default function ContentRightTwoImagesLeft({
  title,
  description,
  firstImgUrl,
  secondImgUrl,
  firstImgUrlAlt = "",
  secondImgUrlAlt = "",
}: ContentAndTwoImagesProps) {
  return (
		<section className="dark:bg-gray-900 py-16">
			<div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
				<div className="grid grid-cols-2 gap-4 mt-8">
					<img
						className="w-full rounded-lg"
						src={firstImgUrl}
						alt={firstImgUrlAlt}
					/>
					<img
						className="mt-4 w-full lg:mt-10 rounded-lg"
						src={secondImgUrl}
						alt={secondImgUrlAlt}
					/>
				</div>
				<div className="font-light text-gray-800 sm:text-lg dark:text-gray-300">
					<h2 className="mb-4 text-4xl tracking-tight font-extrabold">
						{title}
					</h2>
					{description}
				</div>
			</div>
		</section>
	);
}
