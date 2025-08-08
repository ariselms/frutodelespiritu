// app/sitemap.ts
import { MetadataRoute } from "next";
import { sql } from "@vercel/postgres";
import { BibleIdsPrivate } from "@/static";
import { BibleResponseType } from "@/models/bibleTypes";

const { rows: lecturePosts } = await sql`
  SELECT slug, updated_at FROM lectures
`;

const BibleIds: string[] = BibleIdsPrivate;

const FetchPromises = BibleIds.map(async (bibleId: string) => {

  const url = `https://api.scripture.api.bible/v1/bibles/${bibleId}`;

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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const staticRoutes = [
    {
      url: `https://frutodelespiritu.com/`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1
    },
    {
      url: `https://frutodelespiritu.com/lecturas`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8
    },
    {
      url: `https://frutodelespiritu.com/biblia`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8
    }
  ];

	const postEntries: MetadataRoute.Sitemap = lecturePosts.map((lecture) => ({
		url: `https://frutodelespiritu.com/lecturas/${lecture.slug}`,
		lastModified: new Date(lecture.updated_at),
		changeFrequency: "daily" as const,
		priority: 0.7
	}));

  const bibleEntries: MetadataRoute.Sitemap = spanishBibles.map((bible) => ({
    url: `https://frutodelespiritu.com/biblia/libros/${bible.bibleId}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6
  }));

	return [...staticRoutes, ...postEntries, ...bibleEntries];
}
