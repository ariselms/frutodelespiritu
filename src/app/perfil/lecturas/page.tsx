"use client";

import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/authContext";
import {
	Button,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	Spinner // Added Spinner
} from "flowbite-react";
import Link from "next/link";
import { ArticleType } from "@/models/articlesTypes";
import { toast } from "react-toastify";

// --- New TanStack Imports ---
import {
	useReactTable,
	getCoreRowModel,
	getSortedRowModel,
	flexRender,
	getPaginationRowModel,
	ColumnDef
} from "@tanstack/react-table";
import type { SortingState } from "@tanstack/react-table";
// Assuming you have a generic pagination component
// If not, you can copy MemorizationListPaginationComponent and rename it
import MemorizationListPaginationComponent from "@/components/learning-lists/TanStackPaginationComponent";
// --- End New Imports ---

export default function UserLecturesPage() {
	const { user } = useAuthContext();
	const [userLectures, setUserLectures] = useState<ArticleType[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	// --- Updated State (from source component) ---
	const [deletingItem, setDeletingItem] = useState<ArticleType | null>(null);
	const [sorting, setSorting] = useState<SortingState>([]);
	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 10
	});
	// --- End Updated State ---

	const fetchUserLectures = async () => {
		setLoading(true);
		try {
			if (!user) return; // Guard clause
			const requestUserLectures = await fetch(
				`/api/user/lectures/saved?userId=${user.id}`
			);
			const responseUserLectures = await requestUserLectures.json();

			if (!responseUserLectures.success) {
				throw new Error("Failed to fetch user lectures");
			}
			setUserLectures(responseUserLectures.data);
		} catch (error) {
			console.error("Error fetching user lectures:", error);
			toast.error("No se pudieron cargar las lecturas.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (user) {
			fetchUserLectures();
		}
	}, [user]);

	// --- Updated Delete Handler (with Optimistic Update) ---
	const handleSavedLectureRemoved = async (lectureId: number) => {
		try {
			const request = await fetch(
				`/api/user/lectures/saved?userId=${user.id}&lectureId=${lectureId}`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json"
					}
				}
			);

			const response = await request.json();

			if (response.success) {
				toast.success(response.message);

				// Optimistic update: remove item from state directly
				setUserLectures((prevLectures) =>
					prevLectures.filter((lecture) => lecture.id !== lectureId)
				);
			} else {
				toast.error(response.message);
			}
		} catch (error) {
			console.error("Error removing saved lecture:", error);
			toast.error("Error al remover la lectura.");
		}
	};

	// --- New TanStack Column Definitions ---
	const columns: ColumnDef<ArticleType>[] = [
		{
			header: "Título",
			accessorKey: "title",
			cell: ({ row, getValue }) => (
				<Link
					className="text-blue-600 dark:text-white underline hover:text-blue-800 dark:hover:text-gray-300"
					href={`/lecturas/${row.original.slug}`}>
					{getValue<string>()}
				</Link>
			)
		},
		{
			header: "Acciones",
			id: "actions",
			cell: ({ row }) => (
				<div className="flex justify-center">
					<Button
						onClick={() => {
							setDeletingItem(row.original); // Set the item to delete
						}}
						color="red"
						size="xs" // Smaller button for table
						className="cursor-pointer rounded-2xl">
						Remover
					</Button>
				</div>
			)
		}
	];
	// --- End Column Definitions ---

	// --- New Table Instance ---
	const table = useReactTable({
		data: userLectures,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onSortingChange: setSorting,
		getPaginationRowModel: getPaginationRowModel(),
		onPaginationChange: setPagination,
		state: {
			sorting,
			pagination
		}
	});
	// --- End Table Instance ---

	if (loading) {
		return (
			<main className="dark:bg-gray-800 py-16">
				<div className="text-center text-black dark:text-white flex justify-center items-center">
					<Spinner size="xl" />
					<span className="ml-2">Cargando...</span>
				</div>
			</main>
		);
	}

	return (
		<main className="dark:bg-gray-800">
			<article className="container mx-auto px-2 text-black dark:text-white py-8">
				{/* --- New Table Render --- */}
				<div className="overflow-x-auto">
					{userLectures.length > 0 ? (
						<>
							<table className="min-w-full border border-blue-200 dark:border-gray-600 border-collapse">
								<thead>
									{table.getHeaderGroups().map((headerGroup) => (
										<tr key={headerGroup.id}>
											{headerGroup.headers.map((header) => (
												<th
													key={header.id}
													onClick={header.column.getToggleSortingHandler()}
													className="border border-blue-200 dark:border-gray-600 px-4 py-2 text-left bg-blue-100 dark:bg-gray-900 dark:hover:bg-gray-800 cursor-pointer transition-colors">
													{flexRender(
														header.column.columnDef.header,
														header.getContext()
													)}
													{header.column.getCanSort() && (
														<span>
															{{ asc: "  🔼", desc: "  🔽" }[
																header.column.getIsSorted() as "asc" | "desc"
															] ?? null}
														</span>
													)}
												</th>
											))}
										</tr>
									))}
								</thead>
								<tbody>
									{table.getRowModel().rows.map((row) => (
										<tr
											key={row.id}
											className="hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors">
											{row.getVisibleCells().map((cell) => (
												<td
													key={cell.id}
													className="border border-blue-200 dark:border-gray-600 px-4 py-2">
													{flexRender(
														cell.column.columnDef.cell,
														cell.getContext()
													)}
												</td>
											))}
										</tr>
									))}
								</tbody>
							</table>
							{table.getPageCount() > 1 && (
								<MemorizationListPaginationComponent table={table} />
							)}
						</>
					) : (
						<p className="max-w-[80ch]">No tienes lecturas guardadas.</p>
					)}
				</div>
				{/* --- End Table Render --- */}
			</article>

			{/* Modal for deleting a lecture */}
			<Modal
				className="backdrop-blur-md bg-blue-50/10 dark:bg-gray-950/50"
				show={deletingItem !== null}
				onClose={() => setDeletingItem(null)}
				popup>
				<ModalHeader className="bg-blue-100 dark:bg-gray-800 text-blue-950 dark:text-gray-50 border-b border-blue-200 dark:border-gray-600 p-5">
					Confirma remover lectura
				</ModalHeader>
				<ModalBody className="p-6">
					<p className="text-black dark:text-gray-50 text-xl font-bold leading mb-3">
						¿Estas seguro de remover la siguientelectura?
					</p>
					{/* === THIS IS THE MISSING PIECE === */}
					{/* It uses .title, which is correct for ArticleType */}
					<p className="text-black dark:text-gray-50 mb-6 text-lg underline underline-offset-4">
						{deletingItem?.title}
					</p>
					{/* ================================== */}
					<p className="text-gray-600 dark:text-gray-400">
						Esta acción removerá la lectura de tu lista de favoritas. Luego
						de oprimir confirmar no se puede deshacer.
					</p>
				</ModalBody>

				<ModalFooter className="border-t-blue-200 dark:border-gray-600 flex items-center justify-end">
					<button
						className="p-2 text-sm font-medium text-center text-blue-50 rounded-2xl cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-800 transition-all duration-300 ease-in border border-blue-100 dark:border-gray-600"
						onClick={() => {
							if (deletingItem) {
								handleSavedLectureRemoved(deletingItem.id);
								setDeletingItem(null); // Close modal on confirm
							}
						}}>
						Confirmar
					</button>
				</ModalFooter>
			</Modal>
		</main>
	);
}