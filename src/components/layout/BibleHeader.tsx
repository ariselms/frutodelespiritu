"use client";

import Link from "next/link";
import { isActive } from "@/helpers";

export default function BibleHeader(){
  return (
		<header className="bg-orange-200 dark:bg-gray-800 border-b-2 dark:border-b-3 border-orange-400 dark:border-gray-900">
			<div className="max-w-2xl mx-auto flex items-center justify-center gap-4 pt-8 text-orange-50 dark:text-gray-300">
				<Link
					className={`${
						isActive("/biblia") &&
						"bg-orange-400 dark:bg-gray-900 px-4 py-2 rounded-t-xl dark:text-gray-50"
					} px-4 py-2 bg-gray-500 rounded-t-xl text-white dark:text-gray-50`}
					href="/biblia">
					Versiones de la Biblia
				</Link>
				<Link
					className={`${
						isActive("/biblia/buscar") &&
						"bg-orange-400 dark:bg-gray-900 px-4 py-2 rounded-t-xl dark:text-gray-50"
					} px-4 py-2 bg-gray-500 rounded-t-xl text-white dark:text-gray-50`}
					href="/biblia/buscar">
					Buscar en la Bilbia
				</Link>
				{/* TODO: if the user is signed in, show notes */}
			</div>
		</header>
	);
}