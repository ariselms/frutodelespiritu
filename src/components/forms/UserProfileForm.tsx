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
import { ModalUserProfileTheme, BottomDrawerTheme } from "@/components/theme";
import { FetchEndpoints } from "@/static";

export function UserProfileForm() {

	const { user } = useAuthContext();

  const imageInputFileRef = useRef<HTMLInputElement>(null);

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

        // check file size must be less or equal to 4.5MB
        if (file && file?.size > 4500000) {
          toast.error("La imagen de perfil debe ser menor o igual a 4.5MB");
          return;
        }

        // check if file is an image
        if (file && !file?.type.startsWith("image/")) {
          toast.error("El archivo debe ser una imagen");
          return;
        }

        const fileRequest = await fetch(
          FetchEndpoints.Users.PostWithFilename(file.name),
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

      const request = await fetch(FetchEndpoints.Users.Update, {
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
				className="flex items-center justify-center py-4 text-sm text-white dark:text-gray-50 rounded-2xl cursor-pointer bg-blue-700 hover:bg-blue-800 border border-blue-100 dark:bg-gray-900 dark:hover:bg-gray-800 dark:border-gray-600 focus:ring-4 focus:ring-blue-300 dark:focus:ring-gray-800 transition-all mt-6 flex-1 font-bold uppercase"
				onClick={() => setOpenModal(true)}>
				<svg
					className="fill-white dark:fill-gray-200 w-6 h-6 text-gray-800 dark:text-white mr-2"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					fill="currentColor"
					viewBox="0 0 24 24">
					<path
						fillRule="evenodd"
						d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
						clipRule="evenodd"
					/>
				</svg>
				Actualizar
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
					<form onSubmit={handleUserProfileUpdate} className="space-y-6 ">
						<h3 className="text-xl font-medium text-gray-900 dark:text-white">
							Tu información de perfil
						</h3>
						{/* name */}
						<div>
							<div className="mb-2 block">
								<Label htmlFor="name">Nombre Completo</Label>
							</div>
							<input
								className="block bg-blue-50 dark:bg-gray-700 w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-2xl  focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 relative"
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
						<div className="border border-gray-300 dark:border-gray-600 rounded-2xl px-4 pt-4 pb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<div className="mb-2 block">
									<Label htmlFor="address_street">Calle</Label>
								</div>
								<input
									className="block bg-blue-50 dark:bg-gray-700 w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-2xl  focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 relative"
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
									className="block bg-blue-50 dark:bg-gray-700 w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-2xl  focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 relative"
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
									className="block bg-blue-50 dark:bg-gray-700 w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-2xl  focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 relative"
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
									className="block bg-blue-50 dark:bg-gray-700 w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-2xl  focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 relative"
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
									className="block bg-blue-50 dark:bg-gray-700 w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-2xl  focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 relative"
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
								className="block bg-blue-50 dark:bg-gray-700 w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-2xl  focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 relative"
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
									className="block bg-blue-50 dark:bg-gray-700 w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-2xl  focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 relative"
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
								className="block bg-blue-50 dark:bg-gray-700 w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-2xl  focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 relative"
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
								className="block bg-blue-50 dark:bg-gray-700 w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-2xl  focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 relative"
								id="contact_email"
								name="contact_email"
								placeholder="email@example.com"
								value={userProfile?.contact_email || ""}
								onChange={handleUserProfileChange}
								required
								disabled
								type="email"
							/>
							<HelperText className="mt-1">
								Este es tu Id personal y no lo puedes editar.
							</HelperText>
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="contact_phone">Número de Teléfono</Label>
							</div>
							<input
								className="block bg-blue-50 dark:bg-gray-700 w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-2xl  focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 relative"
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
							<button
								className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-2xl text-sm w-full sm:w-auto p-4 text-center dark:bg-gray-900 dark:hover:bg-gray-800 dark:border dark:border-gray-600 dark:focus:ring-800 cursor-pointer transition-all mt-4"
								type="submit">
								Actualizar Perfil
							</button>
						</div>
					</form>
				</ModalBody>
			</Modal>
		</>
	);
}
