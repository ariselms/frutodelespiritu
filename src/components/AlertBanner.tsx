"use server";

import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import Link from "next/link";
import { ScrollTriggerFadeInUp } from "@/components/animations/gsap";

export async function AlertBanner({type = "info", message}: {type?: string, message: string}) {
	return (
		<ScrollTriggerFadeInUp>
			<section
				style={{ zIndex: 999 }}
				className="mx-auto p-4 dark:bg-gray-900 block z-90 relative">
				<div className="max-w-7xl mx-auto">
					<Alert
						color={type}
						className="fade-in-move-up bg-orange-700 dark:bg-blue-900/40 text-orange-50 dark:text-gray-50 mx-auto">
						<div className="flex items-start md:items-center flex-wrap gap-x-3 mb-2">
							<HiInformationCircle className="h-8 w-8 mb-1 md:mb-0 flex-1" />
							<p className="inline-block font-medium mb-3 md:mb-0 flex-8 md:flex-20 max-w-[80ch]">
								{message}
							</p>
						</div>
						<Link
							href="/biblia"
							className="underline cursor-pointer hover:underline-none flex justify-center md:justify-start">
							Ver Biblias Disponibles &rarr;
						</Link>
					</Alert>
				</div>
			</section>
		</ScrollTriggerFadeInUp>
	);
}
