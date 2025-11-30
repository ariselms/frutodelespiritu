import Image from "next/image";
import SubscriberForm from "@/components/forms/SubscriberForm";

export default function JumbotronMain() {
	return (
		<section className="h-full w-full">
			<div className="w-full h-full bg-white dark:bg-gray-800 pt-66 pb-24 md:pt-44 md:pb-20 xl:pt-42">
				<div className="grid max-w-screen-xl px-4 2xl:px-0 mx-auto lg:gap-12 xl:gap-0 lg:grid-cols-12">
					<div className="mr-auto place-self-center col-span-10 xl:col-span-8 px-1">
						<h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-wide leading-none md:text-5xl xl:text-6xl text-black dark:text-gray-100">
							<span>Biblia,</span> <span>Estudios,</span>{" "}
							<span>Reflexiones</span>
						</h1>
						<p className="fade-in-move-up max-w-2xl mb-10 font-light text-gray-950 lg:mb-8 md:text-lg lg:text-xl dark:text-blue-50">
							Explora la sabiduría de la Biblia a través de estudios profundos y
							reflexiones inspiradoras que nutren tu espíritu y fortalecen tu
							fe.
						</p>
						<SubscriberForm />
					</div>
					<div className="relative hidden lg:mt-0 lg:col-span-5 xl:col-span-4 xl:flex">
						<Image
							width={300}
							height={300}
							className="fade-in-move-up z-20 w-full h-full object-cover"
							src="/images/pray.svg"
							alt="praying man stricker illustration"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
