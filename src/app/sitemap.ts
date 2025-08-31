// app/sitemap.ts
import { MetadataRoute } from "next";
import { sql } from "@vercel/postgres";
import { BibleIdsPrivate } from "@/static";
import { BibleResponseType } from "@/models/bibleTypes";
import { FetchEndpoints, serverBaseUrl } from "@/static";


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const { rows: lecturePosts } = await sql`
    SELECT slug, updated_at FROM lectures
  `;

	let RequestError = null;
	let spanishBibles: any[] = [];

	try {
		const url = "https://bible.helloao.org/api/available_translations.json";

		const bibleRequest = await fetch(url);

		const bibleResponse = await bibleRequest.json();

		if (bibleResponse.translations.length) {
			spanishBibles = bibleResponse.translations.filter(
				(bible: any) => bible.language === "spa"
			);
		}
	} catch (error) {
		console.error(error);
	} finally {
		RequestError = "Error al obtener la información de la Biblia";
	}

  const staticRoutes = [
		{
			url: `${serverBaseUrl}`,
			lastModified: new Date(),
			changeFrequency: "weekly" as const,
			priority: 1
		},
		{
			url: `${serverBaseUrl}/lecturas`,
			lastModified: new Date(),
			changeFrequency: "daily" as const,
			priority: 0.8
		},
		{
			url: `${serverBaseUrl}/biblia`,
			lastModified: new Date(),
			changeFrequency: "weekly" as const,
			priority: 0.8
		},
		{
			url: `${serverBaseUrl}/biblia/buscar`,
			lastModified: new Date(),
			changeFrequency: "weekly" as const,
			priority: 0.8
		},
		{
			url: `${serverBaseUrl}/log`,
			lastModified: new Date(),
			changeFrequency: "weekly" as const,
			priority: 0.8
		}
	];

	const postEntries: MetadataRoute.Sitemap = lecturePosts.map((lecture) => ({
		url: `${serverBaseUrl}/lecturas/${lecture.slug}`,
		lastModified: new Date(lecture.updated_at),
		changeFrequency: "daily" as const,
		priority: 0.7
	}));

  const bibleEntries: MetadataRoute.Sitemap = spanishBibles.map((bible) => ({
    url: `${serverBaseUrl}/biblia/libros/${bible.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6
  }));

	return [...staticRoutes, ...postEntries, ...bibleEntries];
}
