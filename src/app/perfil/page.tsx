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
			<article className="container mx-auto px-4 xl:px-0">
        <ProfileSection
          sectionName={user?.name}
          sectionEmail={user?.contact_email}
          sectionDescription="Administra tu informacion personal, configura tu cuenta y accede a las herramientas de administracion."
        />
				<section className="pb-16">
					<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
						{user?.role === "admin" &&
							UserNavigationWithAuth.map((item: NavigationItemTypeWithAuth) => (
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
										className="flex items-center justify-center p-4 text-sm font-medium text-orange-700 dark:text-gray-50 rounded-2xl cursor-pointer bg-orange-200 border border-orange-300 hover:bg-orange-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:border-gray-600 focus:ring-4 focus:ring-orange-300  dark:focus:ring-orange-800 transition-all mt-auto">
										Maneja
										<svg
											className="-mr-1 ml-2 h-4 w-4"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg">
											<path
												fillRule="evenodd"
												d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
												clipRule="evenodd"
											/>
										</svg>
									</Link>
								</div>
							))}
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
									className="flex items-center justify-center mt-6 p-4 text-sm font-medium text-orange-700 dark:text-gray-50 rounded-2xl cursor-pointer bg-orange-200 border border-orange-300 hover:bg-orange-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:border-gray-600 focus:ring-4 focus:ring-orange-300  dark:focus:ring-orange-800 transition-all">
									Maneja
									<svg
										className="-mr-1 ml-2 h-4 w-4"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg">
										<path
											fillRule="evenodd"
											d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
											clipRule="evenodd"
										/>
									</svg>
								</Link>
							</div>
						))}
					</div>
				</section>
			</article>
		</main>
	);
}
