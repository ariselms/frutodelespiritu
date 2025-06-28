import type { Metadata } from "next";
import BibleHeader from "@/components/layout/BibleHeader";


export const metadata: Metadata = {
	title: "Fruto del Espíritu",
	description: "Una comunidad cristiana para compartir y crecer en la fe."
};

export default function BibleRootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div>
        <BibleHeader />
				{children}
		</div>
	);
}
