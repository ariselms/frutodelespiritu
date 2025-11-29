import { ContentAndTwoImagesProps } from "@/models/componentTypes";
import Image from "next/image";

export default function HomePageCard({
  title,
  description,
  firstImgUrl,
  firstImgUrlAlt = "",
}: ContentAndTwoImagesProps) {


  return (
		<section className="mb-8 last:mb-0 mx-[1rem] xl:mx-0">
			<div className="max-w-screen-xl mx-auto bg-blue-50 dark:bg-gray-900/50 flex flex-col-reverse items-start lg:flex lg:flex-row-reverse lg:items-center lg:justify-start pt-8 pb-12 px-4 lg:px-6 rounded-2xl border border-blue-200 dark:border-gray-600">
				<div className="font-light text-black sm:text-lg dark:text-white flex-3">
					<h2 className="mb-4 text-4xl tracking-tight font-extrabold ">
						{title}
					</h2>
					<div className="w-full max-w-[80ch] flex flex-col items-start justify-start">{description}</div>
				</div>
				<div className="relative flex justify-center flex-1">
					<Image
						width={300}
						height={300}
						className="z-20 w-50 h-50 rounded-2xl mb-8"
						src={firstImgUrl}
						alt={firstImgUrlAlt}
					/>
				</div>
			</div>
		</section>
	);
}