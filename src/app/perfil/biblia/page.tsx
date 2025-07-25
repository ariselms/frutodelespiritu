import ProfileSection from "@/components/admin/ProfileSection";

export default function UserBiblePage(){
  return (
		<main className="dark:bg-gray-800">
			<article>
				<div className="bg-white dark:bg-gray-950 text-black dark:text-white border-b border-orange-300 dark:border-gray-700">
					<ProfileSection
						sectionName="Biblia"
						sectionDescription="Administra tu informacion personal, configura tu cuenta y accede a las herramientas de administracion"
					/>
				</div>
			</article>
		</main>
	);
}