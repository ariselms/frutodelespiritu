import Image from "next/image";

export function MainLoader() {
  return (
		<div className="flex flex-col items-center justify-center h-96 bg-amber-50 dark:bg-gray-800">
			<Image
				unoptimized
				src="/images/gifs/flame.gif"
				alt="Loading"
				width={100}
				height={100}
			/>
			<span className="ml-4 text-black dark:text-white">Cargando...</span>
		</div>
	);
}