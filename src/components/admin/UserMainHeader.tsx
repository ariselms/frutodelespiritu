"use client";
import Link from "next/link";
import { UserProfileNavigation } from "@/static";
import { isActive } from "@/helpers";
import { usePathname } from "next/navigation";
import { useAuthContext } from "@/context/authContext";
import Image from "next/image";

export function UserMainHeader() {

  const pathname = usePathname();

  const {signOutUser} = useAuthContext();

  const UserNavigationNoAuth = UserProfileNavigation.filter(
		(item) => !item.requiresAdmin
	);
	const UserNavigationWithAuth = UserProfileNavigation.filter(
		(item) => item.requiresAdmin
	);

  return (
		<header>
			<nav className="px-4 lg:px-6 py-2.5 bg-orange-50 dark:bg-gray-900 border-b border-orange-300 dark:border-gray-700 ">
				<div className="flex flex-wrap justify-between items-center mx-auto container">
					<Link href="/perfil" className="flex items-center">
						<Image
              width={100}
              height={100}
							src="/images/animated/static-user.png"
							className="mr-2 h-12 w-12"
							alt="Flowbite Logo"
						/>
						<span
							className={`${
								isActive(pathname, "/perfil")
									? "text-orange-500"
									: "text-gray-700 dark:text-gray-300 hover:text-orange-700 dark:hover:text-white"
							} self-center text-xl font-semibold whitespace-nowrap`}>
							Perfil
						</span>
					</Link>
					<div className="flex items-center lg:order-2">
						<button
							onClick={signOutUser}
							className="bg-red-600 border border-red-950 dark:border-red-50 text-white ml-1 lg:ml-3 focus:ring-4 focus:ring-gray-300 font-medium rounded-2xl text-sm px-2 py-0 700 focus:outline-none dark:focus:ring-gray-800 cursor-pointer flex items-center">
							<Image
								alt="Sign Out"
								width={100}
								height={100}
								src="/images/animated/static-logout.png"
								className="w-8 h-8 ml-2"
							/>
							Cerrar Sesión
						</button>
						<button
							data-collapse-toggle="mobile-menu-2"
							type="button"
							className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-2xl lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
							aria-controls="mobile-menu-2"
							aria-expanded="false">
							<span className="sr-only">Open main menu</span>
							<svg
								className="w-6 h-6"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg">
								<path
									fillRule="evenodd"
									d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
									clipRule="evenodd"></path>
							</svg>
							<svg
								className="hidden w-6 h-6"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg">
								<path
									fillRule="evenodd"
									d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
									clipRule="evenodd"></path>
							</svg>
						</button>
					</div>
					<div
						className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
						id="mobile-menu-2">
						<ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
							{UserNavigationNoAuth.map((nav) => (
								<li key={nav.name}>
									<Link
										href={nav.href}
										className={`${
											isActive(pathname, nav.href) &&
											"text-orange-500 dark:text-orange-500"
										} block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-orange-700 lg:p-0 dark:text-gray-300 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700`}
										aria-current="page">
										{nav.name}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			</nav>
		</header>
	);
}