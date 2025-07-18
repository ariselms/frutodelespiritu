import ProfileSection from "@/components/admin/ProfileSection";

export default function UserOrdersPage(){
  return (
    <main className="dark:bg-gray-800">
      <article className="container mx-auto px-4 xl:px-0">
        <ProfileSection
          sectionName="Órdenes"
          sectionDescription="Maneja tus órdenes y revisa tu historial de compras."
        />
      </article>
    </main>
  );
}