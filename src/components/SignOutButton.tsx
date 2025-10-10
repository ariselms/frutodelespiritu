"use client";

import { useAuthContext } from "@/context/authContext";

export const SignOutButton = () => {

  const {signOutUser} = useAuthContext();

  return (
		<button
			className="py-2 pl-3 pr-4 md:p-0 text-red-600 dark:text-red-500 dark:hover:text-red-500 rounded-2xl px-2 cursor-pointer text-start underline underline-offset-4 "
			onClick={signOutUser}>
			Cerrar sesión
		</button>
	);
}