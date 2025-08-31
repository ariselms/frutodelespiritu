"use server";

import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import Link from "next/link";

export async function AlertBanner({type = "info", message}: {type?: string, message: string}) {
	return (
		<section style={{ zIndex: 999 }} className="mx-auto w-full p-4 dark:bg-gray-900 block z-90 relative">
			<Alert color={type} className="bg-orange-700 dark:bg-gray-800 text-orange-50 dark:text-gray-50 max-w-screen-xl mx-auto flex items-center">
				<div className="flex items-center justify-center gap-x-3">
					<HiInformationCircle className="h-5 w-5" />
					<span className="font-medium">{message}</span>
          <Link href="/biblia" className="underline cursor-pointer hover:underline-none">Ver Biblias Disponibles &rarr;</Link>
				</div>
			</Alert>
		</section>
	);
}
