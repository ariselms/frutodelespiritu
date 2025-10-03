"use server";

import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import Link from "next/link";
import { FadeInMoveUp } from "@/components/animations/gsap";

export async function AlertBanner({type = "info", message}: {type?: string, message: string}) {
	return (
		<section
			style={{ zIndex: 999 }}
			className="mx-auto p-4 dark:bg-gray-800 block z-90 relative">
			<div className="max-w-7xl mx-auto">
        <FadeInMoveUp>
				<Alert
					color={type}
					className=" bg-sky-50 dark:bg-gray-900 mx-auto">
					<div className="flex items-start md:items-center flex-wrap gap-x-3 mb-2">
						<HiInformationCircle className="text-black dark:text-white h-8 w-8 mb-1 md:mb-0 flex-1" />
						<p className="text-black dark:text-white inline-block font-medium mb-3 md:mb-0 flex-8 md:flex-20 max-w-[80ch]">{message}</p>
					</div>
          <Link
            href="/biblia"
            className="text-sky-700 dark:text-white underline flex justify-center md:justify-start">
            Ver Biblias Disponibles &rarr;
          </Link>
				</Alert>
        </FadeInMoveUp>
			</div>
		</section>
	);
}
