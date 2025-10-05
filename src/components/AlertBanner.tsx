"use server";

import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import Link from "next/link";

export async function AlertBanner({type = "info", message}: {type?: string, message: string}) {
	return (
		<section
			style={{ zIndex: 999 }}
			className="absolute top-0 left-0 right-0 mx-auto p-4 block z-90">
			<div className="max-w-7xl mx-auto">
				<Alert
					color={type}
					className="backdrop-blur-lg bg-sky-200/50 dark:bg-gray-900 mx-auto border border-sky-50/50 dark:border-none">
					<div className="flex items-start md:items-center flex-wrap gap-x-3 mb-2">
						<HiInformationCircle className="text-black dark:text-white h-8 w-8 mb-1 md:mb-0 flex-1" />
						<p className="text-black dark:text-white inline-block font-medium mb-3 md:mb-0 flex-8 md:flex-20 max-w-[80ch]">
							{message}
						</p>
					</div>
					<Link
						href="/biblia"
						className="text-sky-700 dark:text-white underline flex justify-center md:justify-start uppercase font-bold">
						Ver Biblias Disponibles &rarr;
					</Link>
				</Alert>
			</div>
		</section>
	);
}
