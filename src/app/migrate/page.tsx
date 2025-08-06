"use client";

import { useState } from "react";
import { FetchEndpoints } from "@/static";
import { Button } from "flowbite-react";

export default function MigratePage() {

  const [dataToMigrate, setDataToMigrate] = useState<any>(null);

  try {
    const fetchData = async () => {

      const response = await fetch(
        "https://frutodelespiritu-dev.vercel.app/api/articles",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer " + process.env.NEXT_PUBLIC_FRUTO_DEL_ESPIRITU_MIGRATION
          }
        }
      );

      const data = await response.json();

      console.log(data);

      setDataToMigrate(data);
    };

    fetchData();

  } catch (error) {
    console.error(error);
  }



	const migrateData = async () => {

    console.log(dataToMigrate);

    return;

		if (dataToMigrate) {
			dataToMigrate.map(async (item: any) => {
				// destructure old item
				const {
					categoria,
					titulo,
					slug,
					resumen,
					contenido,
					createdAt,
					updatedAt
				} = item;

				// create new item
				const newItem = {
					id: null,
					image_url: "",
					title: titulo,
					summary: resumen,
					category_id: categoria === "Estudios Bíblicos" ? 1 : 2,
					slug: slug,
					by_user_id: 1,
					content: contenido,
					video_url: "",
					draft: false,
					createdat: createdAt,
					updatedat: updatedAt
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
				<pre>{JSON.stringify(dataToMigrate, null, 2)}</pre>
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
