import Image from "next/image";

export default function BibleHeaderSection({
	section = "La Santa Biblia"
}: {
	section: string;
}) {
	return (
    <section className="py-8">
			<div className="max-w-screen-xl px-4 py-0 mx-auto flex items-center justify-center">
        <Image width={60} height={60} src="/images/bible.svg" alt="mockup" className="mr-2" />
        <h1 className="ml-2 max-w-2xl text-4xl font-extrabold tracking-tight leading-none  text-orange-700 dark:text-white">
          {section}
        </h1>
			</div>
		</section>
	);
}
