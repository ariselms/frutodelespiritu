import Image from "next/image";

export default function BibleHeaderSection({section = "La Santa Biblia"}: {section: string}) {
  return (
		<>
			<div className="bg-orange-100 dark:bg-gray-800 border-orange-400 dark:border dark:border-gray-700 border-1 py-0 rounded-lg mb-12">
				<div className="grid max-w-screen-xl px-4 py-0 mx-auto lg:gap-8 xl:gap-0 lg:grid-cols-12">
					<div className="mr-auto place-self-center lg:col-span-7">
						<h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-orange-700 dark:text-white">
							{section}
						</h1>
					</div>
					<div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
						<Image
							width={150}
							height={150}
							src="/images/bible.svg"
							alt="mockup"
						/>
					</div>
				</div>
			</div>
		</>
	);
}