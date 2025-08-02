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
			<article className="container mx-auto px-4 xl:px-0">
        <ProfileSection
          sectionName="Admin"
          sectionDescription="Administra categorías, publicaciones, usuarios y más."
        />
			</article>
		</main>
	);
}

