"use client";

import {
	Navbar,
	NavbarBrand,
	NavbarCollapse,
	NavbarLink,
	NavbarToggle
} from "flowbite-react";
import Link from "next/link";
import Image from "next/image";
import { DarkThemeToggle } from "flowbite-react";
import { usePathname } from "next/navigation";
import { MainNavigation } from "@/static";
import { NavigationItemType } from "@/models/navigationTypes";
import { OrangeLinkTheme } from "../theme";
import { isActive } from "@/helpers";
import { useAuthContext } from "@/context/authContext";
import { useEffect } from "react";

export default function MainHeader() {
	const pathname = usePathname();

	const { user, persistUser } = useAuthContext();

	useEffect(() => {
		persistUser();
	}, [pathname]);

	return (
		<Navbar
			theme={OrangeLinkTheme}
			fluid
			className="relative bg-sky-50 dark:bg-gray-950 border-none py-4 z-20">
			<NavbarBrand as={Link} href="/">
				<Image
					width={100}
					height={100}
					src="/images/logo.png"
					className="h-10 w-auto mr-2"
					alt="Fruto del Espíritu Logo"
				/>
				<span
					className={`${
						isActive(pathname, "/") &&
						"text-sky-700 hover:text-sky-800 dark:text-white dark:underline dark:hover:text-gray-200"
					} text-gray-700 hover:text-sky-700 dark:text-gray-300 hover:dark:text-white dark:hover:underline  self-center whitespace-nowrap text-xl font-semibold flex items-center transition-all`}>
					<span>Fruto del Espíritu </span>
					<span className="text-xs inline-block bg-sky-700 dark:bg-gray-50 px-3 py-1 ms-2 text-white dark:text-gray-800 rounded-2xl">
						Beta
					</span>
				</span>
			</NavbarBrand>
			<NavbarToggle />
			<NavbarCollapse>
				<div className="flex-col md:flex md:flex-row md:items-center gap-4">
					{MainNavigation.map((nav: NavigationItemType) => (
						<NavbarLink
							key={nav.name}
							as={Link}
							href={nav.href}
							active={isActive(pathname, nav.href)}
							className="rounded-2xl px-3 py-2 text-sm font-medium text-center">
							{nav.name}
						</NavbarLink>
					))}
					{user ? (
						<NavbarLink
							as={Link}
							href="/perfil"
							active={isActive(pathname, "/perfil")}
							className="rounded-2xl px-3 py-2 text-sm font-medium text-center">
							Admin
						</NavbarLink>
					) : (
						<NavbarLink
							as={Link}
							href="/log"
							active={isActive(pathname, "/log")}
							className="rounded-2xl px-3 py-2 text-sm font-medium text-center">
							Iniciar Sesión
						</NavbarLink>
					)}
					<div className="text-center">
						<DarkThemeToggle className="text-sky-700 cursor-pointer hover:bg-transparent focus:ring-1 focus:ring-sky-700" />
					</div>
				</div>
			</NavbarCollapse>
		</Navbar>
	);
}
