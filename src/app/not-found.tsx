import Link from "next/link";

export default function NotFound() {
  return (
		<main>
			<section className="bg-white dark:bg-gray-900">
				<div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
					<div className="mx-auto max-w-screen-sm text-center">
						<h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-slate-600 dark:text-gray-100">
							404
						</h1>
						<p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
							La página no existe.
						</p>
						<p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
							Lo sentimos, pero la página que estabas buscando no existe.
						</p>
						<Link
							href="/"
							className="p-4 text-sm font-medium text-center text-white dark:text-gray-950 rounded-lg cursor-pointer bg-slate-700 hover:bg-slate-600 focus:ring-4 focus:ring-slate-300 dark:bg-gray-50 dark:hover:bg-gray-300 dark:focus:ring-gray-800 transition-all duration-300 ease-in mt-4 inline-block">
							Regresar al inicio
						</Link>
					</div>
				</div>
			</section>
		</main>
	);
}