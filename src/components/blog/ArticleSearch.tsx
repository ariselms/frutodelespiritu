"use client";

import { CategoryType } from "@/models/articlesTypes";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Label, Radio } from "flowbite-react";

// TODO: Create a type for categories if needed
export function ArticleSearch({
	searchTerm,
	categories
}: {
	searchTerm: string;
	categories: CategoryType[];
}) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [inputSearchTerm, setInputSearchTerm] = useState(searchTerm || "");
	const [selectedCategory, setSelectedCategory] = useState(
		searchParams.get("category") || "All"
	);
	const newParams = new URLSearchParams(searchParams.toString());

	const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		newParams.set("keyword", event.target.value);
		newParams.set("page", "1"); // Reset to page 1 on new search
		newParams.set("limit", "10"); // Reset to default limit
		setInputSearchTerm(event.target.value);
		if (event.target.value === "") {
			newParams.delete("keyword"); // Remove keyword if input is empty
			newParams.delete("category");
			setSelectedCategory("All");
			router.push(`/lecturas?${newParams.toString()}`);
		}
	};

	const handleKeywordSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		newParams.set("keyword", inputSearchTerm);
		newParams.set("page", "1"); // Reset to page 1 on new search
		newParams.set("limit", "10"); // Reset to default limit
		newParams.delete("category");
		setSelectedCategory("All");
		router.push(`/lecturas?${newParams.toString()}`);
	};

	const hanldeCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		newParams.set("page", "1"); // Reset to page 1 on new search
		newParams.set("limit", "10"); // Reset to default limit
		newParams.delete("keyword");
		setInputSearchTerm("");

		const categoryValye = event.target.value;
		setSelectedCategory(categoryValye);

		if (categoryValye === "All") {
			newParams.delete("category");
		} else {
			newParams.set("category", categoryValye);
		}

		router.push(`/lecturas?${newParams.toString()}`);
	};

	return (
		<form onSubmit={handleKeywordSubmit} className="w-full flex flex-col">
			<div className="w-full mb-4">
				<label
					className="dark:text-gray-50 mb-2 inline-block text-sm"
					htmlFor="blog_search_term">
					Ingresa una palabra y oprime enter. Para limpiar la búsqueda, solo
					vacía el campo.
				</label>
				<div className="relative">
					<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
						<svg
							className="w-4 h-4 text-orange-500 dark:text-gray-300"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 20 20">
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
							/>
						</svg>
					</div>
					<input
						className="block w-full lg:w-4/6 px-8 p-4 text-sm text-gray-900 border border-orange-300 rounded-2xl bg-orange-50 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 focus-visible:outline-orange-500 dark:focus-visible:outline-gray-500"
						id="blog_search_term"
						type="search"
						placeholder="e.j. Preservar tu alma"
						onChange={handleKeywordChange}
						value={inputSearchTerm}
					/>
				</div>
			</div>
			<div className="w-full">
				<p className="dark:text-gray-50 mb-2 inline-block text-sm">
					Puedes elegir una categoría para filtrar las publicaciones
				</p>
				<div className="flex">
					<div className="flex items-center flex-wrap gap-2">
						<div className="flex items-center border rounded-2xl p-4 border-orange-300 dark:border-gray-600 bg-orange-50 dark:bg-gray-700">
							<Radio
								color="black"
								onChange={hanldeCategoryChange}
								name="categories"
								value="All"
								checked={selectedCategory === "All"}
								className="mr-2 border-orange-500 checked:bg-orange-500 checked checked:ring-orange-500 dark:border-gray-900 dark:checked:bg-gray-900 dark:checked:ring-gray-900"
							/>
							<Label htmlFor="All">Todas Publicaciones</Label>
						</div>
						{categories.map((category) => (
							<div
								key={category.id}
								className="flex items-center border rounded-2xl p-4 border-orange-300 dark:border-gray-600 bg-orange-50 dark:bg-gray-700">
								<Radio
									color="black"
									onChange={hanldeCategoryChange}
									id={category.id.toString()}
									name="categories"
									value={category.id}
									checked={Number(selectedCategory) === category.id}
									className="mr-2 border-orange-500 checked:bg-orange-500 checked checked:ring-orange-500 dark:border-gray-900 dark:checked:bg-gray-900 dark:checked:ring-gray-900"
								/>
								<Label htmlFor={category.id.toString()}>{category.name}</Label>
							</div>
						))}
					</div>
				</div>
			</div>
		</form>
	);
}
