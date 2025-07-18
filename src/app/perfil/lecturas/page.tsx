import ProfileSection from "@/components/admin/ProfileSection";

export default function UserLecturesPage(){
  return (
    <main className="dark:bg-gray-800">
      <article className="container mx-auto px-4 xl:px-0">
        <ProfileSection
          sectionName="Lecturas"
          sectionDescription="Lista de tus lecturas favoritas"
        />
      </article>
    </main>
  );
}