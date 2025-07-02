import Image from "next/image";

export default function BibleHeaderSection({
	section = "La Santa Biblia"
}: {
	section: string;
}) {
	return (
    <div className="mb-8 py-2">
			<div className="max-w-screen-xl px-4 py-0 mx-auto flex items-center">
        <Image width={60} height={60} src="/images/bible.svg" alt="mockup" className="mr-4" />
        <h1 className="max-w-2xl text-4xl font-extrabold tracking-tight leading-none  text-orange-700 dark:text-white">
          {section}
        </h1>
			</div>
		</div>
	);
}
