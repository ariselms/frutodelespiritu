import ProfileSection from "@/components/admin/ProfileSection";
export default async function UserOrdersLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="bg-white dark:bg-gray-950 text-black dark:text-white border-b border-orange-100 dark:border-gray-700">
        <ProfileSection
          sectionName="Órdenes"
          sectionDescription="Administra tus órdenes y revisa tu historial de compras. Tengo proyectado completar esta función a comienzos del año próximo 2026."
        />
      </div>
      {children}
    </>
  );
}