import ProfileSection from "@/components/admin/ProfileSection";

export default function AdminPage(){
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

