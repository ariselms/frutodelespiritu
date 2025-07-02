import Image from "next/image";

export default function BibleHeaderSection({section = "La Santa Biblia"}: {section: string}) {
  return (
		<>
			<div className="bg-orange-100 dark:bg-gray-800 border-orange-400 dark:border dark:border-gray-700 border-1 rounded-lg mb-12 py-2">
				<div className="grid max-w-screen-xl px-4 py-0 mx-auto lg:gap-8 xl:gap-0 lg:grid-cols-12">
					<div className="mr-auto place-self-center lg:col-span-7">
						<h1 className="max-w-2xl text-4xl font-extrabold tracking-tight leading-none  text-orange-700 dark:text-white">
							{section}
						</h1>
					</div>
					<div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
						<Image
							width={60}
							height={60}
							src="/images/bible.svg"
							alt="mockup"
						/>
					</div>
				</div>
			</div>
		</>
	);
}