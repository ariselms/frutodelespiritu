"use client"
import ProfileSection from "@/components/admin/ProfileSection";
import { useAuthContext } from "@/context/authContext";
import {useRouter} from "next/navigation";
export default function AdminPage(){
  const { user } = useAuthContext();
  const router = useRouter();

  if(user?.role !== "admin"){
    router.push("/perfil");
  }

  return (
		<main className="dark:bg-gray-800">
			<article className="container mx-auto px-2 text-black dark:text-white py-16">
				El panel de administración aparecerá aquí para super usuarios.
			</article>
		</main>
	);
}

