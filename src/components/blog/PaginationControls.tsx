"use client";

import { useSearchParams, useRouter } from "next/navigation";
// Removed Flowbite-React Pagination import as we're now using custom HTML
// import { Pagination } from "flowbite-react";
// useState is not used in this snippet, can be removed if not needed elsewhere
// import { useState } from "react";

interface PaginationControlsProps {
	totalPages: number;
	currentPage: number;
	totalItems: number | undefined; // Optional, if you want to control total items
	limit: number | undefined; // Optional, if you want to control items per page
}

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
			router.push(`/reflexiones?${newParams.toString()}`);
		}
	};

	const canGoPrev = currentPage > 1;
	const canGoNext = currentPage < totalPages;

	return (
		<div className="flex flex-col items-center pb-24">
			{/* Help text - dynamically updated for Spanish */}
			<span className="text-sm text-gray-700 dark:text-gray-400">
				Mostrando{" "}
				<span className="font-semibold text-gray-900 dark:text-white">
					{startItem}
				</span>{" "}
				a{" "}
				<span className="font-semibold text-gray-900 dark:text-white">
					{endItem}
				</span>{" "}
				de{" "}
				<span className="font-semibold text-gray-900 dark:text-white">
					{totalItems ?? 0}
				</span>{" "}
				Entradas
			</span>
			{/* Buttons */}
			<div className="inline-flex mt-2 xs:mt-0">
				<button
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={!canGoPrev} // Disable if on the first page
					className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed">
					Anterior {/* Changed to Spanish "Anterior" */}
				</button>
				<button
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={!canGoNext} // Disable if on the last page
					className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed">
					Siguiente {/* Changed to Spanish "Siguiente" */}
				</button>
			</div>
		</div>
	);
}
