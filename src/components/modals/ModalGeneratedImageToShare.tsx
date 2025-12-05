import Image from "next/image";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "flowbite-react";
import { LordIconHover } from "@/components/animations/lordicon";
import LOTTIE_DOWNLOAD_2_HOVER_PONTING from "@/lotties/download-2-hover-pointing.json";

export default function ModalGeneratedImageToShare({
	showGeneratedImage,
	setShowGeneratedImage,
	generatedImageUrl
}: {
	showGeneratedImage: boolean;
	setShowGeneratedImage: React.Dispatch<React.SetStateAction<boolean>>;
	generatedImageUrl: string;
}) {
	// -- EVENT HANDLER -- //
	const handleDownloadImage = async (
		imageUrl: string,
		filename: string = "fruto-del-espiritu-bible-verse.png"
	) => {
		try {
			// 1. Fetch the image as a "blob" (binary large object)
			const response = await fetch(imageUrl);
			const blob = await response.blob();

			// 2. Create a temporary URL pointing to that blob
			const blobUrl = window.URL.createObjectURL(blob);

			// 3. Create a hidden link, set the download attribute, and click it
			const link = document.createElement("a");
			link.href = blobUrl;
			link.download = filename; // This forces the "Save As" behavior
			document.body.appendChild(link);
			link.click();

			// 4. Clean up
			document.body.removeChild(link);
			window.URL.revokeObjectURL(blobUrl);
		} catch (error) {
			console.error("Download failed:", error);
		}
	};
	return (
		<Modal
			className="backdrop-blur-md bg-blue-50/10 dark:bg-gray-950/50"
			show={showGeneratedImage}
			onClose={() => setShowGeneratedImage(false)}
			popup
			dismissible>
			<ModalHeader className="bg-blue-100 dark:bg-gray-800 text-blue-950 dark:text-gray-50 border-b border-blue-200 dark:border-gray-600 p-4"/>
			<ModalBody className="p-6 border-b border-blue-200 dark:border-gray-600 flex items-center justify-between">
				<Image
					alt="Pasaje bíblico en Fruto del Espíritu"
					src={generatedImageUrl}
					width={800}
					height={450}
				/>
			</ModalBody>
			<ModalFooter className="flex items-center justify-center">
				<button
					onClick={() => handleDownloadImage(generatedImageUrl)}
					type="button"
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-2xl text-sm w-full sm:w-auto p-4 text-center dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-800 cursor-pointer dark:border-gray-600 border border-blue-100 transition-all ">
					<LordIconHover
						size={22}
						ICON_SRC={LOTTIE_DOWNLOAD_2_HOVER_PONTING}
						state="hover-pointing"
						text="Descargar Imagen"
					/>
				</button>
			</ModalFooter>
		</Modal>
	);
}
