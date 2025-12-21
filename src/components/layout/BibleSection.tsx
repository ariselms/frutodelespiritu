import Image from "next/image";

export default function BibleHeaderSection({
	section = "La Santa Biblia"
}: {
	section: string;
}) {
	return (
		<section className="pb-4">
			<div className="max-w-7xl p-0 mx-auto flex items-center justify-center">
				<h1 className="max-w-[80ch] text-2xl lg:text-4xl font-extrabold tracking-tight leading-none  text-black dark:text-white">
					{section}
				</h1>
			</div>
		</section>
	);
}
