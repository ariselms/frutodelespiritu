"use client";

import {
	Button,
	Label,
	Modal,
	ModalBody,
	ModalHeader,
	HelperText,
} from "flowbite-react";
import { useState, useEffect, useRef } from "react";
import { UserType } from "@/models/userTypes";
import { useAuthContext } from "@/context/authContext";
import { toast } from "react-toastify";
import { ModalUserProfileTheme } from "@/components/theme";
import type { PutBlobResult } from "@vercel/blob";

export function UserProfileForm() {

	const { user } = useAuthContext();

  const imageInputFileRef = useRef<HTMLInputElement>(null);

  const [imageFile, setImageFile] = useState<PutBlobResult | null>(null);

	const [openModal, setOpenModal] = useState(false);

	const [userProfile, setUserProfile] = useState<UserType>({
		name: "",
		image_url: "",
		bio: "",
		contact_email: "",
		contact_phone: "",
		role: "",
		address_street: "",
		address_city: "",
		address_state: "",
		address_zip: "",
		address_country: "United States"
	});

	// Use useEffect to update userProfile when 'user' changes
	useEffect(() => {
		if (user) {
			setUserProfile({
				name: user.name || "",
				image_url: user.image_url || "",
				bio: user.bio || "",
				contact_email: user.contact_email || "",
				contact_phone: user.contact_phone || "",
				role: user.role || "",
				address_street: user.address_street || "",
				address_city: user.address_city || "",
				address_state: user.address_state || "",
				address_zip: user.address_zip || "",
				address_country: user.address_country || "United States"
			});
		}
	}, [user]); // Depend on the 'user' object

	function onCloseModal() {
		setOpenModal(false);
	}

	function handleUserProfileChange(
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		const { name, value } = event.target;
		setUserProfile((prevProfile) => ({
			...prevProfile,
			[name]: value
		}));
	}

	async function handleUserProfileUpdate(event: React.FormEvent) {

    event.preventDefault();

		try {

      let new_image_url: string | null = null;

      if (imageInputFileRef.current?.files?.[0]) {

        const file = imageInputFileRef.current?.files?.[0];

        const fileRequest = await fetch(
          `/api/user/profile?filename=${file?.name}`,
          {
            method: "POST",
            body: file
          }
        );

        const fileResponse = await fileRequest.json();

        if(fileResponse.success){
          new_image_url = fileResponse.data.url;
        }
      }

      userProfile.image_url = new_image_url || userProfile.image_url;

      const request = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userProfile)
      });

			const response = await request.json();

			if (!response.success) {

				toast.error(response.message);

				throw new Error(response.message);

			}

			toast.success(response.message);

			setOpenModal(false);

		} catch (error) {

			console.error("Error updating user profile:", error);

		}
	}

	return (
		<>
			<Button
				className="flex items-center justify-center p-4 text-sm font-medium text-orange-700 dark:text-gray-50 rounded-2xl cursor-pointer bg-orange-200 border border-orange-300 hover:bg-orange-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:border-gray-600 focus:ring-4 focus:ring-orange-300  dark:focus:ring-orange-800 transition-all mt-auto"
				onClick={() => setOpenModal(true)}>
				Actualizar
				<svg
					className="-mr-1 ml-2 h-4 w-4"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg">
					<path
						fillRule="evenodd"
						d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
						clipRule="evenodd"
					/>
				</svg>
			</Button>

			<Modal
				theme={ModalUserProfileTheme}
				show={openModal}
				size="3xl"
				onClose={onCloseModal}
				popup
				dismissible>
				<ModalHeader />
				<ModalBody>
					<form onSubmit={handleUserProfileUpdate} className="space-y-6">
						<h3 className="text-xl font-medium text-gray-900 dark:text-white">
							Your Profile Information
						</h3>
						{/* name */}
						<div>
							<div className="mb-2 block">
								<Label htmlFor="name">Nombre Completo</Label>
							</div>
							<input
								className="block w-full px-2 py-4 text-sm text-gray-900 border border-orange-300 rounded-lg bg-orange-50 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 focus-visible:outline-orange-500 dark:focus-visible:outline-gray-500"
								id="name"
								name="name"
								placeholder="Juanito Perez"
								value={userProfile?.name || ""}
								onChange={handleUserProfileChange}
								required
								type="text"
							/>
						</div>
						<p className="mb-1 text-gray-900 dark:text-white">
							Dirección Residencial
						</p>
						<div className="border border-gray-300 dark:border-gray-600 rounded-md p-2 grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<div className="mb-2 block">
									<Label htmlFor="address_street">Calle</Label>
								</div>
								<input
									className="block w-full px-2 py-4 text-sm text-gray-900 border border-orange-300 rounded-lg bg-orange-50 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 focus-visible:outline-orange-500 dark:focus-visible:outline-gray-500"
									id="address_street"
									name="address_street"
									placeholder="123 Calle Principal"
									value={userProfile?.address_street || ""}
									onChange={handleUserProfileChange}
									required
									type="text"
								/>
							</div>
							<div>
								<div className="mb-2 block">
									<Label htmlFor="address_city">Ciudad</Label>
								</div>
								<input
									className="block w-full px-2 py-4 text-sm text-gray-900 border border-orange-300 rounded-lg bg-orange-50 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 focus-visible:outline-orange-500 dark:focus-visible:outline-gray-500"
									id="address_city"
									name="address_city"
									placeholder="Ciudad"
									value={userProfile?.address_city || ""}
									onChange={handleUserProfileChange}
									required
									type="text"
								/>
							</div>
							<div>
								<div className="mb-2 block">
									<Label htmlFor="address_state">Estado</Label>
								</div>
								<input
									className="block w-full px-2 py-4 text-sm text-gray-900 border border-orange-300 rounded-lg bg-orange-50 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 focus-visible:outline-orange-500 dark:focus-visible:outline-gray-500"
									id="address_state"
									name="address_state"
									placeholder="Estado"
									value={userProfile?.address_state || ""}
									onChange={handleUserProfileChange}
									required
									type="text"
								/>
							</div>
							<div>
								<div className="mb-2 block">
									<Label htmlFor="address_zip">Código Postal</Label>
								</div>
								<input
									className="block w-full px-2 py-4 text-sm text-gray-900 border border-orange-300 rounded-lg bg-orange-50 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 focus-visible:outline-orange-500 dark:focus-visible:outline-gray-500"
									id="address_zip"
									name="address_zip"
									placeholder="Código Postal"
									value={userProfile?.address_zip || ""}
									onChange={handleUserProfileChange}
									required
									type="text"
								/>
							</div>
							<div>
								<div className="mb-2 block">
									<Label htmlFor="address_country">Pais</Label>
								</div>
								<input
									className="block w-full px-2 py-4 text-sm text-gray-900 border border-orange-300 rounded-lg bg-orange-50 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 focus-visible:outline-orange-500 dark:focus-visible:outline-gray-500"
									id="address_country"
									name="address_country"
									placeholder="Pais"
									value="United States"
									onChange={handleUserProfileChange}
									required
									disabled
									type="text"
								/>
							</div>
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="role">Permisos</Label>
							</div>
							<input
								className="block w-full px-2 py-4 text-sm text-gray-900 border border-orange-300 rounded-lg bg-orange-50 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 focus-visible:outline-orange-500 dark:focus-visible:outline-gray-500"
								id="role"
								name="role"
								value={userProfile?.role || ""}
								onChange={handleUserProfileChange}
								disabled
								type="email"
							/>
						</div>
						<div>
							<div className="mb-2 block" id="fileUpload">
								<Label className="mb-2 block" htmlFor="image_url">
									Sube una imagen de perfil
								</Label>
								<input
									className="block w-full px-2 py-4 text-sm text-gray-900 border border-orange-300 rounded-lg bg-orange-50 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 focus-visible:outline-orange-500 dark:focus-visible:outline-gray-500"
									name="image_url"
									ref={imageInputFileRef}
									type="file"
									accept="image/jpeg, image/png, image/webp"
									id="image_url"
								/>
								<HelperText className="mt-1">
									Selecciona una imagen de perfil. No puede ser mayor a 5MB.
								</HelperText>
							</div>
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="bio">Bio</Label>
							</div>
							<textarea
								className="block w-full px-2 py-4 text-sm text-gray-900 border border-orange-300 rounded-lg bg-orange-50 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 focus-visible:outline-orange-500 dark:focus-visible:outline-gray-500"
								id="bio"
								name="bio"
								placeholder="Escribe una corta bio sobre ti..."
								value={userProfile?.bio || ""}
								onChange={handleUserProfileChange}
								required
								rows={4}
							/>
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="contact_email">Correo Electrónico</Label>
							</div>
							<input
								className="block w-full px-2 py-4 text-sm text-gray-900 border border-orange-300 rounded-lg bg-orange-50 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 focus-visible:outline-orange-500 dark:focus-visible:outline-gray-500"
								id="contact_email"
								name="contact_email"
								placeholder="email@example.com"
								value={userProfile?.contact_email || ""}
								onChange={handleUserProfileChange}
								required
								disabled
								type="email"
							/>
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="contact_phone">Número de Teléfono</Label>
							</div>
							<input
								className="block w-full px-2 py-4 text-sm text-gray-900 border border-orange-300 rounded-lg bg-orange-50 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 focus-visible:outline-orange-500 dark:focus-visible:outline-gray-500"
								id="contact_phone"
								name="contact_phone"
								placeholder="+1234567890"
								value={userProfile?.contact_phone || ""}
								onChange={handleUserProfileChange}
								required
								type="text"
							/>
						</div>
						<div className="w-full mt-8 mb-8">
							<Button
								className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm w-full sm:w-auto p-4 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800 cursor-pointer"
								type="submit">
								Actualizar Perfil
							</Button>
						</div>
					</form>
				</ModalBody>
			</Modal>
		</>
	);
}
