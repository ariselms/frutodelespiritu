"use client";
import { useEffect, useState } from "react";

// bible api keys and book ids
const BibleAPIKey = process.env.NEXT_PUBLIC_BIBLE_API_KEY;
const RV60Id = process.env.NEXT_PUBLIC_BIBLE_RV60;
const PalabraDeDiosId = process.env.NEXT_PUBLIC_BIBLE_PALABRA_DE_DIOS;
const SantaBibliaEspanol = process.env.NEXT_PUBLIC_LA_SANTA_BIBLIA_ESPANOL;
const BibliaLibre = process.env.NEXT_PUBLIC_VERSION_BIBLIA_LIBRE;

export const useGetAllSpanishBibles = () => {
	const [bibles, setBibles] = useState<any>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchBibles = async () => {
			const BibleIds = [
				RV60Id,
				PalabraDeDiosId,
				SantaBibliaEspanol,
				BibliaLibre
			];

			// Ensure API key and IDs are set before attempting to fetch
			if (!BibleAPIKey || BibleAPIKey === "YOUR_BIBLE_API_KEY") {
				setError("Please set your Bible API Key and Bible IDs in the code.");
				setLoading(false);
				return;
			}

			const fetchPromises = BibleIds.map(async (bibleId) => {
				// Skip fetch if bibleId is a placeholder
				if (!bibleId || bibleId.startsWith("YOUR_")) {
					console.warn(`Skipping fetch for placeholder Bible ID: ${bibleId}`);
					return { bibleId, error: "Placeholder ID, skipping fetch." };
				}

				const url = `https://api.scripture.api.bible/v1/bibles/${bibleId}`;

				try {
					const request = await fetch(url, {
						method: "GET",
						headers: {
							"api-key": BibleAPIKey,
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
							error: `Failed to fetch: ${request.status} - ${
								errorData.message || "Unknown error"
							}`
						};
					}

					const response = await request.json();
					return {
						bibleId: bibleId,
						data: response.data // The actual Bible data is usually under a 'data' key
					};
				} catch (err: any) {
					console.error(`Failed to fetch Bible ID ${bibleId}:`, err);
					return {
						bibleId: bibleId,
						error: `Failed to fetch: ${err.message || "Network error"}`
					};
				}
			});

			try {
				const allBibleResponses = await Promise.all(fetchPromises);

				const successfulBibleBooks = allBibleResponses.filter(
					(res) => res && !res.error
				);

				// Optional: Log errors for individual failed fetches
				allBibleResponses.forEach((res) => {
					if (res.error) {
						console.warn(`Error for Bible ID ${res.bibleId}: ${res.error}`);
					}
				});

				setBibles(successfulBibleBooks);
			} catch (err: any) {
				console.error("Error during Promise.all for Bibles:", err);
				setError(`An unexpected error occurred: ${err.message}`);
			} finally {
				setLoading(false);
			}
		};

		fetchBibles();
	}, []); // Empty dependency array means this effect runs once on mount

	return { bibles, loading, error };
};