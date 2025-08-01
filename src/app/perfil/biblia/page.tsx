import ProfileSection from "@/components/admin/ProfileSection";

export default function UserBiblePage(){
  return (
		<main className="dark:bg-gray-800">
			<article>
				<div className="bg-white dark:bg-gray-950 text-black dark:text-white border-b border-orange-300 dark:border-gray-700">
					<ProfileSection
						sectionName="Biblia"
						sectionDescription="Administra tus notas y documentos relacionados con la Biblia. Esta función estará disponible pronto."
					/>
				</div>
			</article>
		</main>
	);
}