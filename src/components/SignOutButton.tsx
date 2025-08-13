"use client";

import { useAuthContext } from "@/context/authContext";

export const SignOutButton = () => {

  const {signOutUser} = useAuthContext();

  return (
		<button
			className="text-red-600 dark:text-red-500 dark:hover:text-red-500 bg-red-50  rounded-2xl px-2 border border-red-600 dark:border-red-500 cursor-pointer"
			onClick={signOutUser}>
			Cerrar sesión
		</button>
	);
}