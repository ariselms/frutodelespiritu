import ProfileSection from "@/components/admin/ProfileSection";
export default async function UserBibleNotesLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <div className="bg-white dark:bg-gray-950 text-black dark:text-white border-b border-sky-100 dark:border-gray-700">
      <ProfileSection
        sectionName="Biblia"
        sectionDescription="Administra tus notas y documentos relacionados con la Biblia. Esta función estará disponible pronto."
      />
    </div>
    {children}
    </>
  );
}
