"use client";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/authContext";
import { toast } from "react-toastify";
import { useRouter, usePathname } from "next/navigation";
import { serverBaseUrl, FetchEndpoints } from "@/static";
import LOTTIE_FLOPPY_HOVER from "@/lotties/floppy-hover.json";
import { LordIconHover } from "@/components/animations/lordicon";

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

				const request = await fetch(FetchEndpoints.Articles.PostLectureSaveByUser, {
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
				className="rounde-2xl px-5 py-3 text-sm font-medium text-sky-50 dark:text-gray-100 rounded-2xl cursor-pointer bg-sky-700 hover:bg-sky-800 dark:bg-gray-900 dark:hover:bg-gray-800 border border-sky-100 dark:border-gray-600 focus:ring-4 focus:ring-sky-300 dark:focus:ring-gray-800 m-auto lg:mx-0 flex items-center justify-center w-full">
				<LordIconHover
					size={32}
					ICON_SRC={LOTTIE_FLOPPY_HOVER}
					state="hover-put-in-out"
					text={lectureIsSaved ? "Lectura Guardada" : "Guardar Lectura"}
				/>
			</button>
			<small className="block text-gray-600 dark:text-gray-400 text-center">
				Guarda tus lecturas para re-leerlas luego
			</small>
		</div>
	);
}
