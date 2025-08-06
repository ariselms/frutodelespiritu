"use client";

import { FetchEndpoints } from "@/static";
import { Button } from "flowbite-react";
import articlesData from "./data.json";

export default function MigratePage() {
	const migrateData = async () => {

		if (articlesData) {

      const data = articlesData.data.articles.reverse();

      data.map(async (item: any) => {
				// destructure old item
				const {
					image_url,
					title,
					summary,
					category_id,
					slug,
					by_user_id,
					content,
          video_url,
          draft,
          created_at,
          updated_at,
          is_featured
				} = item;

				// create new item
				const newItem = {
					id: null,
					image_url,
					title,
					summary,
					category_id,
					slug,
					by_user_id,
					content,
					video_url,
					draft: false,
					created_at,
          updated_at,
          is_featured: false
				};

				await fetch(FetchEndpoints.Articles.Post, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(newItem)
				});
			});
		}
	};

	return (
		<main>
			<div className="mx-auto max-w-7xl px-3 py-12">
				<span className="">Migrate Page</span>
			</div>
			<div className="mx-auto max-w-7xl px-3 py-12">
				<Button
          color="red"
					className="px-4 py-2 "
					onClick={migrateData}>
					Migrate
				</Button>
			</div>
			<div className="mx-auto max-w-7xl px-3 py-12 ">
				<pre>{JSON.stringify(articlesData, null, 2)}</pre>
			</div>
		</main>
	);
}

// New Format
// id: number | null; -- _id
// imageurl: any; -- NA
// title: string; -- titulo
// summary: string; -- resumen
// category: CategoryId | Category | null; -- categoria.Id
// slug: string; -- slug
// author: AuthorId | Author | null; -- publicadoPor
// content: string; -- contenido
// videoUrl: string; -- NA
// draft: boolean; -- NA
// createdat: Date | string | null; -- createdAt
// updatedat: Date | string | null; -- updatedAt
// author_name?: string; -- publicadoPor.nombre
// category_name?: string; -- categoria.nombre

// Old Format
// _id 60591081cb6cd70008fabac8
// archivado false
// titulo "Todo sobre la oración"
// publicadoPor 6045a90ee6dea5079efac9f4
// slug "todo-sobre-la-oracion-U_-PViRCI"
// resumen "Reflexionemos sobre el tema de la oración y la importancia de orar por…"
// contenido "<p>Como testimonio comienzo con la siguiente declaración:&nbsp;<em>“si…"
// comentarios Array (empty)
// createdAt 2021-03-22T21:47:45.469+00:00
// updatedAt 2021-12-12T18:08:32.311+00:00
// categoria "Estudios Bíblicos"
