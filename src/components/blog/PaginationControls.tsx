"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { PaginationControlsProps } from "@/models/navigationTypes";

export function PaginationControls({
	totalPages,
	currentPage,
	totalItems,
	limit
}: PaginationControlsProps) {
	const router = useRouter();

	const searchParams = useSearchParams();

	// Define items per page, defaulting to 10 if limit is not provided
	const itemsPerPage = limit ?? 10;

	// Calculate the starting and ending item numbers for the "Showing X to Y" text
	const startItem = (currentPage - 1) * itemsPerPage + 1;
	// Ensure endItem does not exceed totalItems
	const endItem = Math.min(currentPage * itemsPerPage, totalItems ?? 0);

	const handlePageChange = (newPage: number) => {
		// Ensure the new page is within valid bounds
		if (newPage >= 1 && newPage <= totalPages) {
			const newParams = new URLSearchParams(searchParams.toString());
			newParams.set("page", String(newPage));
      newParams.set("limit", String(itemsPerPage));
      // Scroll to the top of the page
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
			router.push(`/lecturas?${newParams.toString()}`);

		}
	};

	const canGoPrev = currentPage > 1;
	const canGoNext = currentPage < totalPages;

	return (
		<div className="flex flex-col items-center pb-24 dark:bg-gray-800">
			{/* Help text - dynamically updated for Spanish */}
			<span className="text-sm text-gray-800 dark:text-gray-300">
				Mostrando resultados <span className="font-semibold">{startItem}</span>{" "}
				al <span className="font-semibold">{endItem}</span> de{" "}
				<span className="font-semibold">{totalItems ?? 0}</span>{" "}
			</span>
			{/* Buttons */}
			<div className="inline-flex mt-2 xs:mt-0 gap-2">
				<button
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={!canGoPrev} // Disable if on the first page
					className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-orange-600 hover:bg-orange-700 cursor-pointer rounded disabled:opacity-50 disabled:cursor-not-allowed">
					Anterior {/* Changed to Spanish "Anterior" */}
				</button>
				<button
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={!canGoNext} // Disable if on the last page
					className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-orange-600 hover:bg-orange-700 cursor-pointer rounded disabled:opacity-50 disabled:cursor-not-allowed">
					Siguiente {/* Changed to Spanish "Siguiente" */}
				</button>
			</div>
		</div>
	);
}
