"use client";

import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/authContext";
import {
	Button,
	List,
	ListItem,
	Modal,
	ModalBody,
	ModalHeader
} from "flowbite-react";
import Link from "next/link";
import { ArticleType } from "@/models/articlesTypes";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { toast } from "react-toastify";

export default function UserLecturesPage() {
  const { user } = useAuthContext();

  const [userLectures, setUserLectures] = useState<ArticleType[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const [openModal, setOpenModal] = useState<boolean>(false);

  const [idForDelete, setIdForDelete] = useState<number | null>(null);


  const fetchUserLectures = async () => {

    setLoading(true);

    try {

      const request = await fetch(`/api/user/lectures/saved?userId=${user.id}`);

      if (!request.ok) {
        throw new Error("Failed to fetch user lectures");
      }

      const response = await request.json();

      setUserLectures(response.data);

    } catch (error) {

      console.error("Error fetching user lectures:", error);

    } finally {

      setLoading(false);

    }
  }

  useEffect(() => {

    if (!user) {
      return;
    }

    fetchUserLectures();

  }, [user]);

  const handleSavedLectureRemoved = async (lectureId: string) => {

    console.log("Removing lecture with ID:", lectureId);

    try {

      const request = await fetch(`/api/user/lectures/saved?userId=${user.id}&lectureId=${lectureId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
      });

      if (!request.ok) {
        throw new Error("Failed to remove saved lecture");
      }

      const response = await request.json();

      if (response.success) {

        toast.success(response.message);

        fetchUserLectures();

      } else {

        toast.error(response.message);

      }


    } catch (error) {

      console.error("Error removing saved lecture:", error);

    }
  }

  return (
		<main className="dark:bg-gray-800">
			<article className="container mx-auto px-2 text-black dark:text-white py-16">
				<p className="mb-8 text-lg max-w-[80ch]">
					Mis lecturas guardads y mis recortes de lecturas con notas aparecerán
					aqui. Por el momento los recortes de lecturas no están implementados.
					Espera una actualización pronto.
				</p>

				{loading && (
					<div className="text-center text-black dark:text-white">
						Cargando...
					</div>
				)}

				{userLectures.length > 0 ? (
					<List className="max-w-5xl divide-y divide-orange-200 dark:divide-gray-700 w-full">
						{userLectures.map((lecture: ArticleType) => (
							<ListItem
								className="w-full flex items-center justify-between list-none py-2"
								key={lecture.id}>
								<Link
									className="text-orange-600 dark:text-white underline"
									href={`/lecturas/${lecture.slug}`}>
									{lecture.title}
								</Link>
								<Button
									onClick={() => {
										setOpenModal(true);
										setIdForDelete(lecture.id);
									}}
									color="red"
									className="cursor-pointer rounded-2xl">
									Remover
								</Button>
							</ListItem>
						))}
					</List>
				) : null}
			</article>

			<Modal
				show={openModal}
				size="md"
				onClose={() => setOpenModal(false)}
				popup>
				<ModalHeader />
				<ModalBody>
					<div className="text-center">
						<HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
						<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
							Seguro que deseas remover esta lectura?
						</h3>
						<div className="flex justify-center gap-4">
							<Button
								color="red"
								onClick={() => {
									setOpenModal(false);
									handleSavedLectureRemoved(String(idForDelete));
								}}>
								Si, estoy segur@
							</Button>
							<Button color="alternative" onClick={() => setOpenModal(false)}>
								No, cancela
							</Button>
						</div>
					</div>
				</ModalBody>
			</Modal>
		</main>
	);
}