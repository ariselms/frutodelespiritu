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
			<div className="max-w-screen-xl mx-auto bg-sky-50 dark:bg-gray-900/50 flex flex-col-reverse items-start lg:flex lg:flex-row-reverse lg:items-center lg:justify-around py-8 px-4 lg:px-6 rounded-2xl border border-sky-200 dark:border-gray-600">
				<div className="font-light text-black sm:text-lg dark:text-white">
					<h2 className="mb-4 text-4xl tracking-tight font-extrabold ">
						{title}
					</h2>
					<span className="">{description}</span>
				</div>
				<div className="relative flex justify-center">
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