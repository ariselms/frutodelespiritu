import ProfileSection from "@/components/admin/ProfileSection";

export default function UserLecturesPage(){
  return (
		<main className="dark:bg-gray-800">
			<article>
				<div className="bg-white dark:bg-gray-950 text-black dark:text-white border-b border-orange-300 dark:border-gray-700">
					<ProfileSection
						sectionName="Lecturas"
						sectionDescription="Lista de tus lecturas favoritas"
					/>
				</div>
			</article>
		</main>
	);
}