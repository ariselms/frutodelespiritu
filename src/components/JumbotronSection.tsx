import Image from "next/image";
import { JumbotronSectionProps } from "@/models/componentTypes";
import { ScrollTriggerFadeInUp } from "@/components/animations/gsap";

export default function JumbotronSection({section, imageSrc}: JumbotronSectionProps) {
  return (
		<ScrollTriggerFadeInUp>
			<section className="bg-orange-50 dark:bg-gray-900 py-8">
				<div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:grid-cols-12">
					<div className="mr-auto place-self-center lg:col-span-7">
						<h1 className="fade-in-move-up max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-orange-700 dark:text-white">
							{section}
						</h1>
					</div>
					<div className="fade-in-move-up hidden lg:mt-0 lg:col-span-5 lg:flex">
						<Image width={150} height={150} src={imageSrc} alt="mockup" />
					</div>
				</div>
			</section>
		</ScrollTriggerFadeInUp>
	);
}
