export default function MemorizationListPaginationComponent({
  table
}: any) {
  return (
		<div className="flex items-center gap-2 mt-4">
			{/* Go to the first page */}
			<button
				onClick={() => table.setPageIndex(0)}
				disabled={!table.getCanPreviousPage()}>
				{"<<"}
			</button>

			{/* Go to the previous page */}
			<button
				onClick={() => table.previousPage()}
				disabled={!table.getCanPreviousPage()}>
				{"<"}
			</button>

			{/* Display current page and total pages */}
			<span className="flex items-center gap-1">
				<div>Página</div>
				<strong>
					{table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
				</strong>
			</span>

			{/* Go to the next page */}
			<button
				onClick={() => table.nextPage()}
				disabled={!table.getCanNextPage()}>
				{">"}
			</button>

			{/* Go to the last page */}
			<button
				onClick={() => table.setPageIndex(table.getPageCount() - 1)}
				disabled={!table.getCanNextPage()}>
				{">>"}
			</button>
		</div>
	);
}