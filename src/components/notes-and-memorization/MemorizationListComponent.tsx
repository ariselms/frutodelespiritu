// TODO: Break everything in to smaller components
// TODO: Complete endpoints and error handling when performing CRUD operations
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/authContext";
import {
	useReactTable,
	getCoreRowModel,
	getSortedRowModel,
	flexRender,
	getPaginationRowModel,
	ColumnDef,
	SortingState
} from "@tanstack/react-table";
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Spinner
} from "flowbite-react";
import MemorizationListPaginationComponent from "@/components/notes-and-memorization/TanStackPaginationComponent";
import { toast } from "react-toastify";
import Link from "next/link";
import { DeleteUserListOrNoteType, NoteOrMemoryListType } from "@/models/memorizationAndNotesTypes";
import { LordIconHover } from "@/components/animations/lordicon";
import LOTTIE_TRASH_MORPH_TRASH_IN from "@/lotties/trash-bin-morph-trash-in.json";
import LOTTIE_EYE_WATCHING_HOVER_BLINK from "@/lotties/glasses-eye-blink-hover-searching.json";

export default function MemorizationListComponent() {
	const { user } = useAuthContext();

	// loading state
	const [isLoading, setIsLoading] = useState(false);

	// pagination
	const [sorting, setSorting] = useState<SortingState>([]);
	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 10
	});

	// user memorization lists
	const [userMemorizationLists, setUserMemorizationLists] = useState<NoteOrMemoryListType[]>([]);

  // new user list
	const [newUserList, setNewUserList] = useState<NoteOrMemoryListType>({
		id: null,
		by_user_id: user?.id,
		name: "",
		description: ""
	});

  // deleting list info
	const [deletingListIdAndName, setDeletingListAndNameId] = useState<DeleteUserListOrNoteType | null>(null);

	// CRUD Functions
	const handleCreate = async (e: React.FormEvent) => {

		e.preventDefault();

		try {

			if (!newUserList) return;

			if (
        newUserList.name === "" ||
        newUserList.description === ""
      ) {

				toast.warning("Todos los campos son requeridos");

				return;
			}

			const memorizationData: any = {
				bible_name: "", // full bible version name
				bible_id: "", // bible id (abbreviation)
				by_user_id: user?.id,
				bible_book: "", // bible book name
				book_id: "", // book id (abbreviation)
				chapter_id: "",
				verse_from: "",
				verse_to: "",
				passage_text: "",
				name: newUserList.name,
				description: newUserList.description
			};

			// Replace with your actual POST endpoint
			const requestNewMemorizationListItem = await fetch(
				`/api/user/${user?.id}/memorization?userId=${user?.id}`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						memorizationData: memorizationData,
						selectedMemorizationList: ""
					})
				}
			);

			const responseNewMemorizationListItem =
				await requestNewMemorizationListItem.json();

			if (responseNewMemorizationListItem.success) {
				setNewUserList({
					id: null,
					by_user_id: user?.id,
					name: "",
					description: ""
				}); // Reset the input field

        // Update the userMemorizationLists state
				setUserMemorizationLists((prevLists) => [
					...prevLists,
					responseNewMemorizationListItem.data
				]);

				toast.success("Lista creada!");
			}
		} catch (error) {
			console.error("Error creating new item:", error);
		}
	};

	const handleDelete = async (listId: string) => {
		try {
			const requestUserListDeletion = await fetch(
				`/api/user/${user?.id}/memorization/${listId}`,
				{ method: "DELETE" }
			);

			const responseUserListDeletion = await requestUserListDeletion.json();

			if (responseUserListDeletion.success) {
				setUserMemorizationLists((prevLists) =>
					prevLists.filter((list) => list.id !== listId)
				);

				toast.success("Lista eliminada!");
			}
		} catch (error) {
			console.error("Error deleting item:", error);
		}
	};

	const handleUpdate = async (
		originalItem: NoteOrMemoryListType,
		updatedItem: NoteOrMemoryListType
	) => {
		try {
			if (
				originalItem.name === updatedItem.name &&
				originalItem.description === updatedItem.description
			)
				return;

			const requestUpdateMemoryListItem = await fetch(
				`/api/user/${user?.id}/memorization/${updatedItem.id}`,
				{
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(updatedItem)
				}
			);

			const responseMemoryListItem = await requestUpdateMemoryListItem.json();

			if (responseMemoryListItem.success) {
				toast.success("Lista actualizada!");
				setUserMemorizationLists((prevLists) =>
					prevLists.map((list) =>
						list.id === updatedItem.id ? updatedItem : list
					)
				);
			} else {
				// Handle API errors
				toast.error("Error al actualizar la lista.");
				console.error(responseMemoryListItem.message);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const onChangeNewListItem = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewUserList({
			...newUserList,
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
					setUserMemorizationLists(responseUserMemorizationLists.data);
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

	const columns: ColumnDef<NoteOrMemoryListType>[] = [
		{
			header: "Nombre",
			accessorKey: "name",
			cell: ({ row, getValue }) => (
				<input
					className="block w-full min-w-[175px] px-2 py-1.5 text-sm text-gray-900 border border-sky-200 rounded-2xl bg-sky-50 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 focus-visible:outline-sky-500 dark:focus-visible:outline-gray-500"
					defaultValue={getValue<string>()}
					onBlur={(e) =>
						handleUpdate(
							{ ...row.original },
							{ ...row.original, name: e.target.value }
						)
					}
				/>
			)
		},
		{
			header: "Descripción",
			accessorKey: "description",
			cell: ({ row, getValue }) => (
				<input
					className="block w-full min-w-[300px] px-2 py-1.5 text-sm text-gray-900 border border-sky-200 rounded-2xl bg-sky-50 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 focus-visible:outline-sky-500 dark:focus-visible:outline-gray-500"
					defaultValue={getValue<string>()}
					onBlur={(e) =>
						handleUpdate(
							{ ...row.original },
							{ ...row.original, description: e.target.value }
						)
					}
				/>
			)
		},
		{
			header: "Acciones",
			id: "actions",
			cell: ({ row }) => (
				<div className="flex-col items-center justify-center md:flex md:flex-row gap-2">
					<Link
						href={`/perfil/biblia/memorias/${row.original.id}`}
						className="cursor-pointer text-center w-full mb-3 md:mb-0 transition-colors inline-block flex-1">
						<div
							className="items-center justify-start px-2 py-1 rounded-2xl border border-sky-200 dark:border-gray-600 text-sky-700 dark:text-gray-100 bg-sky-100 dark:bg-gray-800 font-bold cursor-pointer"
							// FIX 3: Pass the entire listItem to state
						>
							<LordIconHover
								size={24}
								ICON_SRC={LOTTIE_EYE_WATCHING_HOVER_BLINK}
								state="hover-searching"
								text="Abrir"
							/>
						</div>
					</Link>
					<button
						className="flex-1"
						onClick={() => {
							setDeletingListAndNameId({
								id: row.original.id as string,
								name: row.original.name as string
							});
						}}>
						<div
							className="items-center justify-start px-2 py-1 rounded-2xl text-red-500 bg-red-50 border border-red-200 dark:border-gray-600 dark:bg-gray-800 font-bold cursor-pointer"
							// FIX 3: Pass the entire listItem to state
						>
							<LordIconHover
								size={24}
								ICON_SRC={LOTTIE_TRASH_MORPH_TRASH_IN}
								state="morph-trash-out"
								text="Eliminar"
							/>
						</div>
					</button>
				</div>
			)
		}
	];

	useEffect(() => {
		fetchMemorizationLists();
	}, [user?.id]);

	const memorizationListTable = useReactTable({
		data: userMemorizationLists,
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
			<div className="flex justify-center items-center py-8">
				<Spinner size="xl" />
				<span className="ml-2">Cargando listas de memorización...</span>
			</div>
		);
	}

	return (
		<div className="bg-sky-50 dark:bg-gray-900/50 px-2 py-8 w-full border-x border-b border-sky-200 dark:border-gray-600">
			<h2 className="text-xl font-bold mb-4">Tus Listas de Memorización</h2>

			{/* Form for creating a new list */}
			<form
				onSubmit={handleCreate}
				className="mb-8 flex items-center flex-wrap">
				<input
					type="text"
					name="name"
					value={newUserList.name}
					onChange={onChangeNewListItem}
					placeholder="Nombre de la nueva lista"
					className="block w-full px-2 py-2 text-sm text-gray-900 border border-sky-200 rounded-2xl bg-sky-50 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 focus-visible:outline-sky-500 dark:focus-visible:outline-gray-500 mr-2 mb-1 md:w-3/6 xl:w-2/6 md:mb-0"
					required
				/>
				{newUserList.name.length > 3 && (
					<input
						type="text"
						name="description"
						value={newUserList.description}
						onChange={onChangeNewListItem}
						placeholder="Breve descripcion de la nueva lista"
						className="block w-full px-2 py-2 text-sm text-gray-900 border border-sky-200 rounded-2xl bg-sky-50 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 focus-visible:outline-sky-500 dark:focus-visible:outline-gray-500 mr-2 my-1 md:w-3/6 xl:w-2/6 md:mb-0 xl:my-0"
						required
					/>
				)}
				<button
					onClick={handleCreate}
					className="p-2 ms:0 md:ms-2 mt-1 md:mt-0 text-sm font-medium text-center text-white rounded-2xl cursor-pointer bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:ring-sky-300 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-800 transition-all duration-300 ease-in border border-sky-100 dark:border-gray-600">
					Crear Nueva Lista
				</button>
			</form>

			<div className="overflow-x-auto">
				{userMemorizationLists.length > 0 ? (
					<>
						<p className="text-sm text-gray-500 dark:text-gray-300 mb-4 flex items-center">
							<svg
								className="w-10 h-10 sm:w-6 sm:h-6 text-gray-500 dark:text-gray-300 mr-1"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								fill="currentColor"
								viewBox="0 0 24 24">
								<path
									fillRule="evenodd"
									d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z"
									clipRule="evenodd"
								/>
							</svg>
							Para actualizar la información, solo cambia el valor de la celda y
							luego salga del campo.
						</p>
						<table className="min-w-full border border-sky-200 dark:border-gray-600">
							<thead>
								{memorizationListTable.getHeaderGroups().map((headerGroup) => (
									<tr key={headerGroup.id}>
										{headerGroup.headers.map((header) => (
											<th
												key={header.id}
												onClick={header.column.getToggleSortingHandler()}
												className="border border-sky-200 dark:border-gray-600 px-4 py-2 text-left bg-sky-100 dark:bg-gray-900 dark:hover:bg-gray-800 cursor-pointer transition-colors">
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
										className="hover:bg-sky-50 dark:hover:bg-gray-800 transition-colors">
										{row.getVisibleCells().map((cell) => (
											<td
												key={cell.id}
												className="border border-sky-200 dark:border-gray-600 px-4 py-2">
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
						{memorizationListTable.getPageCount() > 1 && (
							<MemorizationListPaginationComponent
								table={memorizationListTable}
							/>
						)}
					</>
				) : (
					<p className="max-w-[80ch]">
						No hay listas de memorización disponibles. Crea una en el campo de
						arriba. Tus listas aparecerán aquí y como iconos de un cerebro
						cuando leas la biblia a través de tus memorias guardadas.
					</p>
				)}
				{/* Modal for deleting a list */}
				<Modal
					className="backdrop-blur-md bg-sky-50/10 dark:bg-gray-950/50"
					show={deletingListIdAndName !== null}
					onClose={() => setDeletingListAndNameId(null)}>
					<ModalHeader className="bg-sky-100 dark:bg-gray-800 text-sky-950 dark:text-gray-50 border-b border-sky-200 dark:border-gray-600">
						Confirma eliminar lista de memorización
					</ModalHeader>

					<ModalBody>
						<p className="text-black dark:text-gray-50 text-lg mb-3">
							¿Estas seguro de eliminar la lista de memorización?
						</p>
						<p className="text-black dark:text-gray-50 mb-6 text-lg underline underline-offset-4">
							{deletingListIdAndName?.name}
						</p>
						<p className="text-gray-600 dark:text-gray-400">
							Esta acción eliminará la lista de memorización y el contenido.
							Luego de oprimir confirmar no se puede deshacer.
						</p>
					</ModalBody>

					<ModalFooter className="border-t-sky-200 dark:border-gray-600 flex items-center justify-end">
						<button
							className="p-2 text-sm font-medium text-center text-sky-50 rounded-2xl cursor-pointer bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:ring-sky-300 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-800 transition-all duration-300 ease-in border border-sky-100 dark:border-gray-600"
							onClick={() => {
								if (deletingListIdAndName) {
									handleDelete(deletingListIdAndName.id);
									// Close the modal after starting the delete
									setDeletingListAndNameId(null);
								}
							}}>
							Confirmar
						</button>
					</ModalFooter>
				</Modal>
			</div>
		</div>
	);
}
