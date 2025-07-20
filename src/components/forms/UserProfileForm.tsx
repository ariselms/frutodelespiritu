
"use client";

import { Button, Label, Modal, ModalBody, ModalHeader, TextInput, FileInput, HelperText, Textarea } from "flowbite-react";
import { useState, useEffect } from "react";
import { UserType } from "@/models/userTypes";
import { useAuthContext } from "@/context/authContext";

export function UserProfileForm() {
    const { user } = useAuthContext();

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
        address_country: "",
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
            });
        }
    }, [user]); // Depend on the 'user' object

    function onCloseModal() {
        setOpenModal(false);
    }

    function handleUserProfileChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setUserProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    }

    function handleUserProfileUpdate(event: React.FormEvent) {
        event.preventDefault();
        console.log("User profile updated:", userProfile);
        // Here you would typically send the updated user profile to your backend API
        // For example:
        // await updateUserProfile(userProfile);
        setOpenModal(false);
    }

    return (
        <>
            <Button className="cursor-pointer" onClick={() => setOpenModal(true)}>Update profile</Button>

            <Modal 
                show={openModal} 
                size="3xl" 
                onClose={onCloseModal} 
                popup
                dismissible>
                <ModalHeader />
                <ModalBody>
                    <form onSubmit={handleUserProfileUpdate} className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Your Profile Information</h3>
                        {/* name */}
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name">Nombre Completo</Label>
                            </div>
                            <TextInput
                                id="name"
                                name="name"
                                placeholder="Juanito Perez"
                                value={userProfile?.name || ""}
                                onChange={handleUserProfileChange}
                                required
                                type="text"
                            />
                        </div>
                        <p className="mb-1 text-gray-900 dark:text-white">Dirección  Residencial</p>
                        <div className="border border-gray-600 rounded-md p-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="address_street">Calle</Label>
                                </div>
                                <TextInput
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
                                <TextInput
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
                                <TextInput
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
                                <TextInput
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
                                <TextInput
                                    id="address_country"
                                    name="address_country"
                                    placeholder="Pais"
                                    value="United States"
                                    onChange={handleUserProfileChange}
                                    required
                                    type="text"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="role">Permisos</Label>
                            </div>
                            <TextInput
                                id="role"
                                name="role"
                                value={userProfile?.role || ""}
                                onChange={handleUserProfileChange}
                                disabled
                                type="email" />
                        </div>
                        <div>
                            <div className="mb-2 block" id="fileUpload">
                                <Label className="mb-2 block" htmlFor="file">
                                    Sube una imagen de perfil
                                </Label>
                                <FileInput 
                                    id="file"  
                                    name="image_url"
                                    accept="image/*"
                                    required
                                    onChange={handleUserProfileChange}
                                    value={userProfile?.image_url || ""}    
                                />
                                <HelperText className="mt-1">Selecciona una imagen de perfil. No puede ser mayor a 5MB.</HelperText>
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="bio">Bio</Label>
                            </div>
                            <Textarea
                                id="bio"
                                name="bio"
                                placeholder="Escribe una corta bio sobre ti..."
                                value={userProfile?.bio || ""}
                                onChange={handleUserProfileChange}
                                required
                                rows={4} />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="contact_email">Correo Electrónico</Label>
                            </div>
                            <TextInput
                                id="contact_email"
                                name="contact_email"
                                placeholder="email@example.com"
                                value={userProfile?.contact_email || ""}
                                onChange={handleUserProfileChange}
                                required
                                type="email" />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="contact_phone">Número de Teléfono</Label>
                            </div>
                            <TextInput
                                id="contact_phone"
                                name="contact_phone"
                                placeholder="+1234567890"
                                value={userProfile?.contact_phone || ""}
                                onChange={handleUserProfileChange}
                                required
                                type="text" />
                        </div>
                        <div className="w-full">
                            <Button 
                                className="cursor-pointer" 
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
