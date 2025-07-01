"use client";

import Link from "next/link";
import { isActive } from "@/helpers";
import { useParams } from "next/navigation";

export default function BibleHeader() {
	const params = useParams();
	const { id } = params;


	return (
		<header className="bg-orange-200 dark:bg-gray-800 border-b-2 dark:border-b-3 border-orange-500 dark:border-gray-900">
			<div className="max-w-5xl mx-auto flex items-center justify-center gap-4 pt-8 text-orange-50 dark:text-gray-300">
				<Link
					className={`${
						isActive("/biblia") &&
						"bg-orange-500 dark:bg-gray-900 px-4 py-2 rounded-t-xl dark:text-gray-50"
					} px-4 py-2 bg-gray-500 rounded-t-xl text-white dark:text-gray-50`}
					href="/biblia">
					Versiones de la Biblia
				</Link>
        {id && (
          <Link
            className={`${
              isActive(`/biblia/libros/${id}`) &&
              "bg-orange-500 dark:bg-gray-900 px-4 py-2 rounded-t-xl dark:text-gray-50"
            } px-4 py-2 bg-gray-500 rounded-t-xl text-white dark:text-gray-50`}
            href={`/biblia/libros/${id}`}>
            Libros
          </Link>
        )}
				<Link
					className={`${
						isActive("/biblia/buscar") &&
						"bg-orange-500 dark:bg-gray-900 px-4 py-2 rounded-t-xl dark:text-gray-50"
					} px-4 py-2 bg-gray-500 rounded-t-xl text-white dark:text-gray-50`}
					href="/biblia/buscar">
					Buscar por palabras claves
				</Link>
				<Link
					className={`${
						isActive("/biblia/buscar/pasaje") &&
						"bg-orange-500 dark:bg-gray-900 px-4 py-2 rounded-t-xl dark:text-gray-50"
					} px-4 py-2 bg-gray-500 rounded-t-xl text-white dark:text-gray-50`}
					href="/biblia/buscar/pasaje">
					Buscar por pasajes
				</Link>
				{/* TODO: if the user is signed in, show notes */}
			</div>
		</header>
	);
}
