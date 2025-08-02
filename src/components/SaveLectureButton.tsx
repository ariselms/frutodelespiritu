"use client";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/authContext";
import { toast } from "react-toastify";
import { useRouter, usePathname } from "next/navigation";
import { serverBaseUrl } from "@/static";

export function SaveLecturebutton({ lectureId }: { lectureId: string }) {

	const { user } = useAuthContext();

	const router = useRouter();

  const pathname = usePathname();

	const [lectureIsSaved, setLectureIsSaved] = useState<boolean>(false);

	useEffect(() => {
		// check if the lecture is saved
		const checkIfLectureIsSaved = async () => {

      if (user) {

				const request = await fetch(
					`/api/user/lectures?lectureId=${lectureId}&userId=${user.id}`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json"
						}
					}
				);

				const response = await request.json();

				if (response.success && response.data) {


          setLectureIsSaved(true);

        } else {

          setLectureIsSaved(false);

        }
			}
		};

		checkIfLectureIsSaved();

	}, [user]);

	const handleSaveLecture = async () => {

		try {

			if (user) {

				const request = await fetch(`/api/user/lectures`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						userId: user.id,
						lectureId: lectureId
					})
				});

				const response = await request.json();

				if (response.success) {

					toast.success(response.message);

					setLectureIsSaved(true);

				} else {

          toast.warning(response.message);

        }
			} else {

				toast.warning(
					"Necesitas ingresar para guardar lecturas."
				);

				router.push("/log?redirectUrl=" + serverBaseUrl + pathname);

			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="mx-4 lg:mx-0">
			<button
        type="button"
				onClick={handleSaveLecture}
				className="rounde-2xl px-5 py-3 text-sm font-medium text-orange-700 dark:text-gray-100 rounded-2xl cursor-pointer bg-orange-100 dark:bg-gray-800 border border-orange-300 dark:border-gray-600 focus:ring-4 focus:ring-orange-300 dark:focus:ring-gray-800 m-auto lg:mx-0 flex items-center justify-center w-full">
				<svg
					className="text-orange-700 lg:text-white dark:text-gray-100 m-1"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					fill="currentColor"
					viewBox="0 0 24 24">
					<path
						fillRule="evenodd"
						d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7.414A2 2 0 0 0 20.414 6L18 3.586A2 2 0 0 0 16.586 3H5Zm3 11a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6H8v-6Zm1-7V5h6v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1Z"
						clipRule="evenodd"
					/>
					<path fillRule="evenodd" d="M14 17h-4v-2h4v2Z" clipRule="evenodd" />
				</svg>
				<span className="ml-1">
					{lectureIsSaved ? "Lectura Guardada" : "Guardar Lectura"}
				</span>
			</button>
			<small className="block text-gray-600 dark:text-gray-400 text-center">
				Guarda tus lecturas para re-leerlas luego
			</small>
		</div>
	);
}
