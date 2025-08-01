"use client";

import { useAuthContext } from "@/context/authContext";
import { UserProfileNavigation } from "@/static";
import { NavigationItemTypeWithAuth } from "@/models/navigationTypes";
import Link from "next/link";
import ProfileSection from "@/components/admin/ProfileSection";


export default function AdminPage() {
	const { user } = useAuthContext();

	const UserNavigationNoAuth = UserProfileNavigation.filter(
		(item: NavigationItemTypeWithAuth) => !item.requiresAdmin
	);
	const UserNavigationWithAuth = UserProfileNavigation.filter(
		(item: NavigationItemTypeWithAuth) => item.requiresAdmin
	);

	return (
		<main className="dark:bg-gray-800">
			<article>
				<div className="bg-white dark:bg-gray-950 text-black dark:text-white border-b border-orange-300 dark:border-gray-700">
					<ProfileSection
						imageUrl={user?.image_url}
						sectionName={user?.name}
						sectionEmail={user?.contact_email}
						sectionDescription="Administra tu informacion personal, configura tu cuenta y accede a las herramientas de administracion."
						isProfile={true}
					/>
				</div>
				<div className="container mx-auto px-4 xl:px-0">
					<section className="py-16">
						<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
							{user?.role === "admin" &&
								UserNavigationWithAuth.map(
									(item: NavigationItemTypeWithAuth) => (
										<div
											key={item.name}
											className="flex flex-col justify-around rounded-2xl p-4 bg-orange-50 dark:bg-gray-700 border border-orange-300 dark:border-gray-600">
											<h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
												{item.name}
											</h5>
											<p className="font-normal text-gray-700 dark:text-gray-200 mb-4">
												{item.description}
											</p>
											<Link
												href={item.href}
												className="flex items-center justify-center p-4 text-sm font-medium text-orange-700 dark:text-gray-50 rounded-2xl cursor-pointer bg-orange-200 border border-orange-300 hover:bg-orange-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:border-gray-600 focus:ring-4 focus:ring-orange-300  dark:focus:ring-gray-800 transition-all mt-auto">
												Administra
											</Link>
										</div>
									)
								)}
							{UserNavigationNoAuth.map((item: NavigationItemTypeWithAuth) => (
								<div
									key={item.name}
									className="flex flex-col justify-around rounded-2xl p-4 bg-orange-50 dark:bg-gray-700 border border-orange-300 dark:border-gray-600">
									<h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
										{item.name}
									</h5>
									<p className="font-normal text-gray-700 dark:text-gray-200 mb-4">
										{item.description}
									</p>
									<Link
										href={item.href}
										className="flex items-center justify-center mt-6 p-4 text-sm font-medium text-orange-700 dark:text-gray-50 rounded-2xl cursor-pointer bg-orange-200 border border-orange-300 hover:bg-orange-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:border-gray-600 focus:ring-4 focus:ring-orange-300  dark:focus:ring-gray-800 transition-all">
										Administra
									</Link>
								</div>
							))}
						</div>
					</section>
				</div>
			</article>
		</main>
	);
}
