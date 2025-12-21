import Link from "next/link";
import { serverBaseUrl } from "@/static";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "flowbite-react";
import { LordIconHover } from "@/components/animations/lordicon";
import FINGERPRINT_SECURITY_LOTTIE from "@/lotties/fingerprint-security-hover-pinch.json";

export default function ModalToPromptUserToLogin({
	isModalToPromptUserToLoginOpen,
	setIsModalToPromptUserToLoginOpen,
	pathname
}: {
	isModalToPromptUserToLoginOpen: boolean;
	setIsModalToPromptUserToLoginOpen: React.Dispatch<
		React.SetStateAction<boolean>
	>;
	pathname: string;
}) {
	return (
		<Modal
			className="backdrop-blur-md bg-slate-50/10 dark:bg-gray-950/50"
			dismissible
			show={isModalToPromptUserToLoginOpen}
			onClose={() => setIsModalToPromptUserToLoginOpen(false)}>
			<ModalHeader className="bg-slate-100 dark:bg-gray-800 text-slate-950 dark:text-gray-50 border-b border-slate-200 dark:border-gray-600 p-5">
				¿Cómo guardar versículos en listas de aprendizaje o tomar notas?
			</ModalHeader>
			<ModalBody>
				<div className="space-y-6">
					<p className="text-base leading-relaxed text-gray-900 dark:text-gray-200">
						Cuando oprimes en un versículo, notarás que puedes hacer una
						selección de los versículos que desees. Una vez seleccionados,
						podrás añadirlos a tus listas de aprendizaje para memorizarlos o
						para tomar notas sobre ellos.
					</p>
					<p className="text-base leading-relaxed text-gray-900 dark:text-gray-200">
						Si eso es lo que quieres, debes iniciar sesión, todo lo que
						necesitas es tu correo electrónico. Si no, puedes simplemente cerrar
						esta ventana.
					</p>
				</div>
			</ModalBody>
			<ModalFooter className="border-t-slate-200 dark:border-gray-600 flex items-center justify-end">
				<Link
					className="p-2 text-sm font-medium text-center text-slate-50 rounded-2xl cursor-pointer bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:ring-slate-300 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-800 transition-all duration-300 ease-in border border-slate-100 dark:border-gray-600 flex items-center gap-2"
					href={`/log?${new URLSearchParams({
						redirectUrl: serverBaseUrl + pathname
					}).toString()}`}>
					<LordIconHover
						size={32}
						ICON_SRC={FINGERPRINT_SECURITY_LOTTIE}
						state="hover-pinch"
						text="Iniciar sesión"
					/>
				</Link>
			</ModalFooter>
		</Modal>
	);
}
