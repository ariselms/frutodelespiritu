import Link from "next/link";

export default function ClickVerseHint() {
	return (
		<div
			className="flex flex-col gap-2 p-4 text-sm text-cyan-700 dark:text-cyan-800 bg-blue-50 dark:bg-gray-900/50 mx-auto rounded-lg border border-blue-200 dark:border-gray-600 mb-2"
			role="alert">
			<div className="flex items-center" data-testid="flowbite-alert-wrapper">
				<div>
					<div className="flex items-start md:items-center flex-wrap gap-x-3">
						<svg
							stroke="currentColor"
							fill="currentColor"
							stroke-width="0"
							viewBox="0 0 20 20"
							aria-hidden="true"
							className="text-black dark:text-white h-8 w-8 mb-1 md:mb-0 flex-1"
							height="1em"
							width="1em"
							xmlns="http://www.w3.org/2000/svg">
							<path
								fill-rule="evenodd"
								d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
								clip-rule="evenodd"></path>
						</svg>
						<p className="text-black dark:text-white inline-block font-medium md:mb-0 flex-8 md:flex-20 max-w-[80ch]">
							<span className="font-extrabold">Información Importante:</span>{" "}
							Para guardar, versículos, tomar notas y más. Solo presiona el
							versículo [ejemplo <span className="inline-flex items-center justify-center h-4 w-4 p-3 text-white rounded-full bg-blue-700">1</span>] para llamar las opciones disponibles.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
