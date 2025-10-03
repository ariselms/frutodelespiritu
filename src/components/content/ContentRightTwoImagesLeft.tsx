import { ContentAndTwoImagesProps } from "@/models/componentTypes";
import Image from "next/image";

export default function ContentRightTwoImagesLeft({
  title,
  description,
  firstImgUrl,
  firstImgUrlAlt = "",
}: ContentAndTwoImagesProps) {
  return (
		<section className="bg-white dark:bg-gray-800 pt-10 pb-16">
			<div className="gap-16 py-8 px-4 mx-auto max-w-screen-xl flex flex-col items-start lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
				<div className="relative flex justify-center">
					<Image
						width={300}
						height={300}
						className="z-20 w-50 h-50 rounded-2xl"
						src={firstImgUrl}
						alt={firstImgUrlAlt}
					/>
				</div>
				<div className="font-light text-black sm:text-lg dark:text-white">
					<h2 className="mb-4 text-4xl tracking-tight font-extrabold">
						{title}
					</h2>
					{description}
				</div>
			</div>
		</section>
	);
}
