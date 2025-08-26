import ProfileSection from "@/components/admin/ProfileSection";
export default async function UserMemorizacionLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
    <>
    <div className="bg-white dark:bg-gray-950 text-black dark:text-white border-b border-orange-300 dark:border-gray-700">
      <ProfileSection
        sectionName="Versículos para memorizar"
        sectionDescription="Administra los versículos y pasajes biblicos que has seleccionado para memorizar."
      />
    </div>
    {children}
    </>
  );
}
