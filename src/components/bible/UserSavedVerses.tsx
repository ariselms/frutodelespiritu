"use client";

import { useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import BiblePassageText from "@/components/bible/BiblePassageText";
import Link from "next/link";
import styles from "@/components/admin/react-admin-styles.module.css";

export default function UserSavedVerses({
	verses,
	listsData
}: {
	verses: any;
	listsData: { listId: number | null; listName: string };
}) {

	const [isUserSavedVerseModalOpen, setIsUserSelectedModalOpen] =
		useState(false);

	return (
		<>
			<span className="relative">
				<svg
					onClick={() => setIsUserSelectedModalOpen(true)}
					className="w-[26px] h-[30px] text-blue-50 dark:text-gray-300 me-[.3rem] dark:hover:text-gray-200 cursor-pointer transition-all border border-blue-200 dark:border-gray-600 rounded-sm bg-blue-700 hover:bg-blue-800 dark:bg-gray-900 dark:hover:bg-gray-800"
					data-icon-type="saved-verse"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					fill="currentColor"
					viewBox="0 0 24 24">
					<path
						fillRule="evenodd"
						d="M6 2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 1 0 0-2h-2v-2h2a1 1 0 0 0 1-1V4a2 2 0 0 0-2-2h-8v16h5v2H7a1 1 0 1 1 0-2h1V2H6Z"
						clipRule="evenodd"
					/>
				</svg>
			</span>

			<Modal
				className="backdrop-blur-md bg-blue-50/10 dark:bg-gray-950/50 relative"
				dismissible
				show={isUserSavedVerseModalOpen}
				onClose={() => setIsUserSelectedModalOpen(false)}>
				<ModalHeader className="bg-blue-100 dark:bg-gray-800 text-blue-950 dark:text-gray-50 border-b border-blue-200 dark:border-gray-600 p-5">
					Versículos Guardados
				</ModalHeader>
				<ModalBody>
					<BiblePassageText chapterContent={verses} />
					{verses.title && verses.content ? (
						<div className="mt-8 mb-3">
							<small className="text-sm text-black dark:text-gray-300">
								<strong>Nota en lista de aprendizaje: </strong>
								{listsData?.listName}
							</small>

							<hr className="text-black dark:text-gray-300" />

							<h2 className="font-bold text-2xl text-black dark:text-gray-100 my-2">
								{verses.title}
							</h2>
              <div className={styles.ReactAdminContainer}>
                <div  dangerouslySetInnerHTML={{ __html: verses.content }}></div>
              </div>
						</div>
					) : (
						<>
							<hr className="text-gray-300 dark:text-gray-600 my-4" />

							<p className="mt-4 text-black dark:text-gray-300 text-sm">
                Este versículo está guardado en la lista de aprendizaje:{" "}
                <strong>{listsData?.listName}</strong>
              </p>
              <p className="mt-2 text-black dark:text-gray-300 text-sm">
								No hay notas asociadas a este versículo. Oprime el botón{" "}
								<strong>Editar</strong> para administrar tu versículo, añadir
								notas y mucho más.
							</p>
						</>
					)}
				</ModalBody>
				<ModalFooter className="border-t-blue-200 dark:border-gray-600 flex items-center justify-between">
					<Link
						href={`/perfil/biblia/aprendizaje/${listsData?.listId}`}
						className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto p-4 text-center dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-800 cursor-pointer dark:border-gray-600 border border-blue-100 transition-all">
						Editar
					</Link>
				</ModalFooter>
			</Modal>

			{/* TODO: MODAL PROMPT TO DELETE ITEM */}
		</>
	);
}
