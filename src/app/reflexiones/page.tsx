import JumbotronSection from "@/components/JumbotronSection";
// We will create this new component for the pagination buttons
import { PaginationControls } from "@/components/blog/PaginationControls";
import { BlogList } from "@/components/blog/item";
import { FetchEndpoints, serverBaseUrl } from "@/static";

interface BlogPost {
	id: number;
	title: string;
	// ... other properties
}

// Your API response should include pagination metadata
interface PaginatedResponse {
	data: {
		articles: BlogPost[];
		totalItems: number;
		totalPages: number;
		currentPage: number;
	};
}

// Update the function to accept page and limit
async function getBlogData(
	page: number,
	limit: number
): Promise<PaginatedResponse> {
	// Construct the URL with query parameters for your backend API
	const url = new URL(serverBaseUrl + FetchEndpoints.Articles.GetAll);
	url.searchParams.set("page", String(page));
	url.searchParams.set("limit", String(limit));

  try {
		const response = await fetch(url.toString(), {
			next: { revalidate: 30 } // Cache data for 30 seconds
		});

    console.log("--- URL - Response ---");
    console.log(url.toString());
    console.log(response);

		const result = await response.json();

		if (result.success) {
			// Assuming your API returns data in this shape
			return {
				data: result.data
			};
		} else {
			throw new Error(result.message || "API returned an error");
		}
	} catch (error) {
		console.error("Error fetching blog data:", error);
		return {
			data: {
				articles: [],
				totalItems: 0,
				totalPages: 1,
				currentPage: 1
			}
		};
	}
}

// Server Components receive `searchParams` as a prop
export default async function ReflexionesPage({
	searchParams
}: {
	searchParams: any;
}) {
	// Read page and limit from the URL, providing default values
  let {page, limit} = await searchParams;
  page = Number(page) || 1; // Default to page 1
  limit = Number(limit) || 10; // Default to 10 items per page

	// Fetch the specific page of data
	const { data: blogData } = await getBlogData(page, limit);

	return (
		<main>
			<JumbotronSection
				section="Reflexiones Biblicas"
				imageSrc="/images/cross-with-flowers.svg"
			/>
			{process.env.NEXT_PUBLIC_VERCEL_ENV}
      {serverBaseUrl}

			{/* The BlogList itself can remain a simple presentational component */}
			<BlogList data={blogData} />

			{/* Add the client component for pagination controls */}
			<PaginationControls
				currentPage={blogData.currentPage}
				totalPages={blogData.totalPages}
				totalItems={blogData.totalItems}
				limit={limit}
			/>
		</main>
	);
}
