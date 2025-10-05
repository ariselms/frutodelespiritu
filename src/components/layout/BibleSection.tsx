import Image from "next/image";

export default function BibleHeaderSection({
	section = "La Santa Biblia"
}: {
	section: string;
}) {
	return (
    <section className="pb-4">
			<div className="max-w-screen-xl px-4 py-0 mx-auto flex items-center justify-center">
        <h1 className="ml-2 max-w-2xl text-3xl font-extrabold tracking-tight leading-none  text-black dark:text-white">
          {section}
        </h1>
			</div>
		</section>
	);
}
