export default async function BibleBooksPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
	return (
		<main>
			<section className="w-full bg-orange-400 dark:bg-gray-900 text-white">
				<div className="max-w-7xl mx-auto py-16">
					<h1>Libro: {id}</h1>
				</div>
			</section>
		</main>
	);
}