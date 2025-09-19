import ProfileSection from "@/components/admin/ProfileSection";
export default async function UserLecturesLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
    <>
    <div className="bg-white dark:bg-gray-950 text-black dark:text-white border-b border-orange-100 dark:border-gray-700">
      <ProfileSection
        sectionName="Lecturas"
        sectionDescription="Administra tus lecturas guardadas, así como tus recortes y notas relacionadas a las lecturas. Esta función estará disponible muy pronto en su totalidad."
      />
    </div>
    {children}
    </>
  );
}
