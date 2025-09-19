// TODO: Break everything in to smaller components
// TODO: Complete endpoints and error handling when performing CRUD operations
import {
	useReactTable,
	getCoreRowModel,
	getSortedRowModel,
	flexRender,
	getPaginationRowModel,
	ColumnDef
} from "@tanstack/react-table";
import { useAuthContext } from "@/context/authContext";
import type { SortingState } from "@tanstack/react-table";
import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import MemorizationListPaginationComponent from "./pagination";
import { toast } from "react-toastify";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "flowbite-react";

// Define the type for your data
interface MemorizationList {
	id: string; // or number, depending on your database schema
	name: string;
	description: string;
}

export default function MemorizationListComponent() {
	const { user } = useAuthContext();
	const [memorizationLists, setMemorizationLists] = useState<MemorizationList[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [newListItem, setNewListItem] = useState<{
    by_user_id: string;
    bible_id: string;
    book_id: string;
    chapter_id: string;
    verse_from: string;
    verse_to: string;
    passage_text: string;
    name: string;
    description: string;
  }>({
    by_user_id: user?.id,
    bible_id: "",
    book_id: "",
    chapter_id: "",
    verse_from: "",
    verse_to: "",
    passage_text: "",
    name: "",
    description: ""
  });
  const [openDeletionModal, setOpenDeletionModal] = useState(false);
  const [listItemForDeletionId, setListItemForDeletionId] = useState<string | null>(null);

	// CRUD Functions
	const handleCreate = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			if (!newListItem) return;

			// Replace with your actual POST endpoint
			const requestNewMemorizationListItem = await fetch(
				`/api/user/${user?.id}/memorization?userId=${user?.id}`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ memorizationData: newListItem, selectedMemorizationList: "" })
				}
			);

			const responseNewMemorizationListItem = await requestNewMemorizationListItem.json();

			if (responseNewMemorizationListItem.success) {
				const newItem = responseNewMemorizationListItem.data;

        console.log(newItem);

				setNewListItem({
					by_user_id: user?.id,
					bible_id: "",
					book_id: "",
					chapter_id: "",
					verse_from: "",
					verse_to: "",
					passage_text: "",
					name: "",
					description: ""
				}); // Reset the input field

        fetchMemorizationLists();

        toast.success("Lista creada!");
			}
		} catch (error) {
			console.error("Error creating new item:", error);
		}
	};

	const handleDelete = async (id: string) => {

		const requestUserListDeletion = await fetch(
			`/api/user/${user?.id}/memorization/${id}`,
			{
				method: "DELETE"
			}
		);

    const responseUserListDeletion = await requestUserListDeletion.json();

		if (responseUserListDeletion.success) {

			fetchMemorizationLists();

      setOpenDeletionModal(false);

      toast.success("Lista eliminada!");
		}

	};

	const handleUpdate = async (updatedItem: MemorizationList) => {

		const response = await fetch(`/api/memorization/${updatedItem.id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(updatedItem)
		});

		if (response.ok) {
			setMemorizationLists((prevLists) =>
				prevLists.map((list) =>
					list.id === updatedItem.id ? updatedItem : list
				)
			);
		}

	};

	const onChangeNewListItem = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewListItem({
			...newListItem,
			[e.target.name]: e.target.value
		});
	};

  // fetch user memorization lists
	const fetchMemorizationLists = async () => {
		setIsLoading(true);

		try {
			if (user?.id) {
				const requestUserMemorizationLists = await fetch(
					`/api/user/${user?.id}/memorization?userId=${user?.id}`
				);

				const responseUserMemorizationLists =
					await requestUserMemorizationLists.json();

				if (responseUserMemorizationLists.success) {
					setMemorizationLists(responseUserMemorizationLists.data);
				} else {
					console.error(responseUserMemorizationLists.message);
				}
			}
		} catch (error) {
			console.error("Error fetching memorization lists:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const columns: ColumnDef<MemorizationList>[] = [
		{
			header: "ID",
			accessorKey: "id"
		},
		{
			header: "Nombre",
			accessorKey: "name",
			cell: ({ row, getValue }) => (
				<input
					className="block w-full px-2 py-1.5 text-sm text-gray-900 border border-orange-100 rounded-2xl bg-orange-50 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 focus-visible:outline-orange-500 dark:focus-visible:outline-gray-500"
					defaultValue={getValue<string>()}
					onBlur={(e) =>
						handleUpdate({ ...row.original, name: e.target.value })
					}
				/>
			)
		},
		{
			header: "Descripción",
			accessorKey: "description",
			cell: ({ row, getValue }) => (
				<input
					className="block w-full px-2 py-1.5 text-sm text-gray-900 border border-orange-100 rounded-2xl bg-orange-50 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 focus-visible:outline-orange-500 dark:focus-visible:outline-gray-500"
					defaultValue={getValue<string>()}
					onBlur={(e) =>
						handleUpdate({ ...row.original, description: e.target.value })
					}
				/>
			)
		},
		{
			header: "Acciones",
			id: "actions",
			cell: ({ row }) => (
				<div className="flex-col items-center justify-between md:flex md:flex-row">
					<button
						onClick={() => {
							setOpenDeletionModal(true);
							setListItemForDeletionId(row.original.id);
						}}
						className="text-orange-700 dark:text-orange-500 hover:underline cursor-pointer text-center w-full my-1 md:my-0">
						Eliminar
					</button>
					<button className="text-orange-700 dark:text-orange-500 hover:underline cursor-pointer text-center w-full my-1 md:my-0">
						Ver Lista
					</button>
				</div>
			)
		}
	];

	useEffect(() => {
		fetchMemorizationLists();
	}, [user?.id]);

	const memorizationListTable = useReactTable({
		data: memorizationLists,
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

	if (isLoading) {
		return (
			<div className="flex justify-center items-center">
				<Spinner size="xl" color="warning" />
				<span className="ml-2">Cargando listas de memorización...</span>
			</div>
		);
	}

	return (
		<>
			<div className="bg-orange-50/50 dark:bg-gray-700 p-2 border border-orange-200 dark:border-gray-600">
				<h2 className="text-2xl font-bold mb-4">Tus Listas de Memorización</h2>

				{/* Form for creating a new list */}
				<form
					onSubmit={handleCreate}
					className="mb-4 flex items-center flex-wrap">
					<input
						type="text"
						name="name"
						value={newListItem.name}
						onChange={onChangeNewListItem}
						placeholder="Nombre de la nueva lista"
						className="block w-full px-2 py-2 text-sm text-gray-900 border border-orange-100 rounded-2xl bg-orange-50 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 focus-visible:outline-orange-500 dark:focus-visible:outline-gray-500 mr-2 mb-1 md:w-3/6 xl:w-2/6 md:mb-0"
						required
					/>
					{newListItem.name.length > 3 && (
						<input
							type="text"
							name="description"
							value={newListItem.description}
							onChange={onChangeNewListItem}
							placeholder="Breve descripcion de la nueva lista"
							className="block w-full px-2 py-2 text-sm text-gray-900 border border-orange-100 rounded-2xl bg-orange-50 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 focus-visible:outline-orange-500 dark:focus-visible:outline-gray-500 mr-2 mb-1 md:w-3/6 xl:w-2/6 md:mb-0"
							required
						/>
					)}
					<button
						onClick={handleCreate}
						className="p-2 ms:0 md:ms-2 mt-1 md:mt-0 text-sm font-medium text-center text-white dark:text-gray-950 rounded-2xl cursor-pointer bg-orange-700 hover:bg-orange-600 focus:ring-4 focus:ring-orange-300 dark:bg-gray-50 dark:hover:bg-gray-300 dark:focus:ring-gray-800 transition-all duration-300 ease-in">
						Crear Nueva Lista
					</button>
				</form>

				<div className="overflow-x-auto">
					{memorizationLists.length > 0 ? (
						<>
							<table className="min-w-full border border-orange-200 dark:border-gray-600">
								<thead>
									{memorizationListTable
										.getHeaderGroups()
										.map((headerGroup) => (
											<tr key={headerGroup.id}>
												{headerGroup.headers.map((header) => (
													<th
														key={header.id}
														onClick={header.column.getToggleSortingHandler()}
														className="border border-orange-200 dark:border-gray-600 px-4 py-2 text-left bg-orange-100 dark:bg-gray-800 cursor-pointer">
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
									{memorizationListTable.getRowModel().rows.map((row) => (
											<tr
												key={row.id}
												className="hover:bg-orange-50 dark:hover:bg-gray-600 transition-all">
												{row.getVisibleCells().map((cell) => (
													<td
														key={cell.id}
														className="border border-orange-200 dark:border-gray-600 px-4 py-2">
														{flexRender(
															cell.column.columnDef.cell,
															cell.getContext()
														)}
													</td>
												))}
                        <Modal
                          className="bg-orange-50/10 dark:bg-gray-700/20"
                          show={openDeletionModal}
                          onClose={() => setOpenDeletionModal(false)}>
                          <div className="bg-orange-50/50 dark:bg-gray-700/50 border-orange-200 shadow-xl shadow-orange-100/20s dark:shadow-gray-800 dark:border-gray-600 rounded-2xl">
                            <ModalHeader className="border-b-orange-200 dark:border-gray-600">
                              Eliminar Lista de Memorización
                            </ModalHeader>
                            <ModalBody>
                              <p className="text-black dark:text-gray-100">
                                ¿Estas seguro de que quieres eliminar la lista de
                                memorización?
                              </p>
                            </ModalBody>
                            <ModalFooter className="border-t-orange-200 dark:border-gray-600">
                              <button
                                className="p-2 text-sm font-medium text-center text-white dark:text-gray-950 rounded-2xl cursor-pointer bg-orange-700 hover:bg-orange-600 focus:ring-4 focus:ring-orange-300 dark:bg-gray-50 dark:hover:bg-gray-300 dark:focus:ring-gray-800 transition-all duration-300 ease-in"
                                onClick={() => handleDelete(row.original.id)}>
                                Confirmar
                              </button>
                            </ModalFooter>
                          </div>
                        </Modal>
											</tr>
									))}
								</tbody>
							</table>
							{memorizationListTable.getPageCount() > 1 && (
								<MemorizationListPaginationComponent
									table={memorizationListTable}
								/>
							)}
						</>
					) : (
						<p className="max-w-[80ch]">No hay listas de memorización disponibles. Crea una en el campo de arriba. Tus listas aparecerán aquí y como iconos de un cerebro cuando leas la biblia a través de tus memorias guardadas.</p>
					)}
				</div>
			</div>
		</>
	);
}
