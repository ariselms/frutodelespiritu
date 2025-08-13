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

  const BibleIds: string[] = BibleIdsPrivate;

  const FetchPromises = BibleIds.map(async (bibleId: string) => {

    const url = FetchEndpoints.BibleApiBase.GetSpanishBibles(bibleId);

    try {
      const request = await fetch(url, {
        method: "GET",
        headers: {
          "api-key": `${process.env.BIBLE_API_KEY}`,
          Accept: "application/json"
        }
      });

      if (!request.ok) {

        const errorData = await request.json();

        console.error(
          `HTTP error! Status: ${request.status} for Bible ID: ${bibleId}`,
          errorData
        );

        return {
          bibleId: bibleId,
          error: `Failed to fetch: ${request.status}`
        };
      }

      const response = await request.json();

      return {
        bibleId: bibleId,
        data: response.data
      };

    } catch (error) {

      return {
        bibleId: bibleId,
        error: `Failed to fetch: ${error}`
      };

    }
  });

  const allBibleResponses = await Promise.all(FetchPromises);

  const spanishBibles = allBibleResponses
    .filter((res) => res && !res.error && res.data)
    .map((res) => ({
      bibleId: res.bibleId,
      data: res.data
    })) as BibleResponseType[];

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
    url: `${serverBaseUrl}/biblia/libros/${bible.bibleId}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6
  }));

  console.log(staticRoutes)
  console.log(postEntries)
  console.log(bibleEntries)

	return [...staticRoutes, ...postEntries, ...bibleEntries];
}
