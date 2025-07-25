import Image from "next/image";
import SubscriberForm from "@/components/forms/SubscriberForm";

export default function JumbotronMain() {
	return (
		<section className="bg-white dark:bg-gray-900">
			<div className="grid max-w-screen-xl px-4 py-24 mx-auto lg:gap-12 xl:gap-0 lg:py-32 lg:grid-cols-12">
				<div className="mr-auto place-self-center lg:col-span-7 xl:col-span-8">
					<h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-wide leading-none md:text-5xl xl:text-6xl text-orange-700 dark:text-gray-100">
						<span>Biblia</span> <span>Estudios</span> <span>Reflexiones</span>
					</h1>
					<p className="max-w-2xl mb-10 font-light text-gray-950 lg:mb-8 md:text-lg lg:text-xl dark:text-orange-50">
						Explora la sabiduría de la Biblia a través de estudios profundos y
						reflexiones inspiradoras que nutren tu espíritu y fortalecen tu fe.
					</p>
          <SubscriberForm />
				</div>
				<div className="hidden lg:mt-0 lg:col-span-5 xl:col-span-4 lg:flex">
					<Image
						width={300}
						height={300}
						className="w-full h-full object-cover"
						src="/images/pray.svg"
						alt="praying man stricker illustration"
					/>
				</div>
			</div>
		</section>
	);
}
