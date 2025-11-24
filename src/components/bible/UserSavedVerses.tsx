"use client";
import { useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import BiblePassageText from "@/components/bible/BiblePassageText";

export default function UserSavedVerses({ verses }: { verses: any }) {

	const [isUserSavedVerseModalOpen, setIsUserSelectedModalOpen] =
		useState(false);

  console.log(verses)

	return (
		<>
			<svg
				onClick={() => setIsUserSelectedModalOpen(true)}
				className="w-6 h-6 text-sky-700 dark:text-gray-300"
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

			<Modal
				className="backdrop-blur-md bg-sky-50/10 dark:bg-gray-950/50"
				dismissible
				show={isUserSavedVerseModalOpen}
				onClose={() => setIsUserSelectedModalOpen(false)}>
				<ModalHeader
					className="bg-sky-100 dark:bg-gray-
        text-sky-950 dark:text-gray-50 border-b border-sky-200 dark:border-gray-600 p-5">
					Versículos Guardados
				</ModalHeader>
				<ModalBody>
					<BiblePassageText chapterContent={verses} />
					{verses.title && verses.content && (
						<div className="mt-8">
							<small>
								<strong>Mi Nota</strong>
							</small>
              <hr />
							{verses.title && (
								<h2 className="font-bold text-2xl my-2">{verses.title}</h2>
							)}
							{verses.content && <p>{verses.content}</p>}
						</div>
					)}
				</ModalBody>
				{/* <ModalFooter className="border-t-sky-200 dark:border-gray-600 flex items-center justify-end">
					<button>Editar Nota</button>
					<button>Eliminar Versículo(s)</button>
				</ModalFooter> */}
			</Modal>
		</>
	);
}
