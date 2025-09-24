import { ContentAndTwoImagesProps } from "@/models/componentTypes";
import Image from "next/image";

export default function ContentRightTwoImagesLeft({
  title,
  description,
  firstImgUrl,
  firstImgUrlAlt = "",
}: ContentAndTwoImagesProps) {
  return (
		<section className="fade-in-move-up dark:bg-gray-900 pt-10 pb-16">
			<div className="gap-16 py-8 px-4 mx-auto max-w-screen-xl flex flex-col items-center lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
				<div className="relative flex justify-center">
					<svg
						className="hidden lg:block fill-orange-100 dark:fill-gray-800 absolute z-10 w-125 h-125 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rotate-12"
						viewBox="-120 -120 240 240"
						xmlns="http://www.w3.org/2000/svg">
						<path d="M 76.49640930706043,0 C 78.43336426547953,17.00422111358067 61.762731515693,72.45877354841575 47.01738638281921,81.43650205413994 C 32.272041249945424,90.41423055986412 -25.655766212795008,82.00139080256099 -41.466351755929864,71.8218280457935 C -57.27693729906472,61.64226528902601 -79.7664380817211,17.43733112595886 -79.46729796225962,9.731937208637023e-15 C -79.16815784279814,-17.43733112595884 -52.94686138495376,-60.85216260506411 -39.073230800238,-67.67682096187728 C -25.19960021552224,-74.50147931869046 17.075541702054167,-63.05686947474007 31.52174671546647,-54.597266854505406 C 45.967951728878774,-46.137664234270744 74.55945434864134,-17.00422111358067 76.49640930706043,0 Z" />
					</svg>
					<Image
						width={300}
						height={300}
						className="z-20 w-50 h-50 rounded-2xl"
						src={firstImgUrl}
						alt={firstImgUrlAlt}
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
