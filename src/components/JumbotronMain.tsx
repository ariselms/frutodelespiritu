import Image from "next/image";
import SubscriberForm from "@/components/forms/SubscriberForm";

export default function JumbotronMain() {
	return (
		<section className="bg-white dark:bg-gray-900 ">
			<div className="grid max-w-screen-xl px-4 py-24 mx-auto lg:gap-12 xl:gap-0 lg:py-32 lg:grid-cols-12">
				<div className="mr-auto place-self-center lg:col-span-7 xl:col-span-8">
					<h1 className="fade-in-move-up max-w-2xl mb-4 text-4xl font-extrabold tracking-wide leading-none md:text-5xl xl:text-6xl text-orange-700 dark:text-gray-100">
						<span>Biblia</span> <span>Estudios</span> <span>Reflexiones</span>
					</h1>
					<p className="fade-in-move-up max-w-2xl mb-10 font-light text-gray-950 lg:mb-8 md:text-lg lg:text-xl dark:text-orange-50">
						Explora la sabiduría de la Biblia a través de estudios profundos y
						reflexiones inspiradoras que nutren tu espíritu y fortalecen tu fe.
					</p>
					<SubscriberForm />
				</div>
				<div className="relative hidden lg:mt-0 lg:col-span-5 xl:col-span-4 lg:flex">
					<svg
						className="fade-in-move-up fill-orange-100 dark:fill-gray-800 absolute z-0 w-225 h-225 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rotate-90"
						viewBox="-120 -120 240 240"
						xmlns="http://www.w3.org/2000/svg">
						<path d="M 76.49640930706043,0 C 78.43336426547953,17.00422111358067 61.762731515693,72.45877354841575 47.01738638281921,81.43650205413994 C 32.272041249945424,90.41423055986412 -25.655766212795008,82.00139080256099 -41.466351755929864,71.8218280457935 C -57.27693729906472,61.64226528902601 -79.7664380817211,17.43733112595886 -79.46729796225962,9.731937208637023e-15 C -79.16815784279814,-17.43733112595884 -52.94686138495376,-60.85216260506411 -39.073230800238,-67.67682096187728 C -25.19960021552224,-74.50147931869046 17.075541702054167,-63.05686947474007 31.52174671546647,-54.597266854505406 C 45.967951728878774,-46.137664234270744 74.55945434864134,-17.00422111358067 76.49640930706043,0 Z" />
					</svg>
					<Image
						width={300}
						height={300}
						className="fade-in-move-up z-20 w-full h-full object-cover"
						src="/images/pray.svg"
						alt="praying man stricker illustration"
					/>
				</div>
			</div>
		</section>
	);
}
