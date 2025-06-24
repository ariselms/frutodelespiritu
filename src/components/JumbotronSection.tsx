import Image from "next/image";

export default function JumbotronSection({section, imageSrc}: {section: string, imageSrc: string}) {
  return (
    <section className="bg-orange-100 dark:bg-gray-900 py-16">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-orange-700 dark:text-white">
            {section}
          </h1>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <Image
            width={150}
            height={150}
            src={imageSrc}
            alt="mockup"
          />
        </div>
      </div>
    </section>
  );
}
