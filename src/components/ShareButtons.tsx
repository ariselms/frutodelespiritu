"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
	FacebookShareButton,
	TwitterShareButton,
	LinkedinShareButton,
	FacebookIcon,
	TwitterIcon,
	LinkedinIcon,
	EmailShareButton,
	EmailIcon
} from "react-share";

export function ShareButtons(){
	const pathname = usePathname();
	const [url, setUrl] = useState("");

	useEffect(() => {
		if (typeof window !== "undefined") {
			setUrl(window.location.href);
		}
	}, [typeof window !== "undefined" && window.location.href]);

	if (!pathname.includes("admin")) {
		return (
			<div className="my-8 bg-blue-50 dark:bg-gray-800 border-1 border-blue-200 dark:border-gray-600 rounded-lg pt-2 pb-4 lg:pt-6 lg:pb-7 m-4 lg:mx-0">

        <p className="text-gray-900 dark:text-white font-bold text-lg text-center mb-2">Comparte este contenido</p>

				<div className="flex items-center justify-center">
					<FacebookShareButton url={url} className="mr-1">
						<FacebookIcon className="h-10" />
					</FacebookShareButton>
					<TwitterShareButton url={url} className="mr-1">
						<TwitterIcon className="h-10" />
					</TwitterShareButton>
					<LinkedinShareButton url={url} className="mr-1">
						<LinkedinIcon className="h-10" />
					</LinkedinShareButton>
					<EmailShareButton url={url} className="mr-1">
						<EmailIcon className="h-10" />
					</EmailShareButton>
				</div>
			</div>
		);
	}
};
