import { JumbotronSectionProps } from "@/models/componentTypes";

export default function JumbotronSection({
	section,
	description
}: JumbotronSectionProps) {
	return (
		<section className=" bg-blue-50 dark:bg-gray-950 py-8">
			<div className="max-w-screen-xl px-4 py-4 mx-auto lg:gap-8 xl:gap-0 lg:grid-cols-12 text-black dark:text-white text-center lg:text-left">
				<div className="col-span-12 lg:col-span-7 text-center h-full flex justify-center items-center">
					<h1 className=" max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl ">
						{section}
					</h1>
				</div>
				{description && (
					<p className=" col-span-12 text-center">{description}</p>
				)}
			</div>
		</section>
	);
}
