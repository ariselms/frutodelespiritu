import ProfileSection from "@/components/admin/ProfileSection";

export default function UserBiblePage(){
  return (
		<main className="dark:bg-gray-800">
			<article className="container mx-auto px-4 xl:px-0">
        <ProfileSection
          sectionName="Biblia"
          sectionDescription="Administra tu informacion personal, configura tu cuenta y accede a las herramientas de administracion"
        />
			</article>
		</main>
	);
}