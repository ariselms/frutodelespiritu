import ProfileSection from "@/components/admin/ProfileSection";

export default function UserOrdersPage(){
  return (
		<main className="dark:bg-gray-800">
			<article>
				<div className="bg-white dark:bg-gray-950 text-black dark:text-white border-b border-orange-300 dark:border-gray-700">
					<ProfileSection
						sectionName="Órdenes"
						sectionDescription="Administra tus órdenes y revisa tu historial de compras. Esta función estará disponible en el 2026."
					/>
				</div>
			</article>
		</main>
	);
}