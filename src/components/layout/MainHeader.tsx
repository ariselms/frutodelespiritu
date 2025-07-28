"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import Link from "next/link";
import { DarkThemeToggle } from "flowbite-react";
import { usePathname } from "next/navigation";
import { MainNavigation } from "@/static";
import { NavigationItemType } from "@/models/navigationTypes";
import Image from "next/image";
import { OrangeLinkTheme } from "../theme";
import { isActive } from "@/helpers";
import { useAuthContext } from "@/context/authContext";
import { useEffect } from "react";

export default function MainHeader() {
  const pathname = usePathname();

  const {user, persistUser} = useAuthContext();

  useEffect(() => {

    persistUser();

  }, [pathname]);

  return (
		<Navbar
			theme={OrangeLinkTheme}
			fluid
			className="bg-orange-50 py-4 border-b border-orange-300 dark:bg-gray-900 dark:border-gray-700">
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
						"text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-500"
					} text-gray-700 dark:text-gray-300  self-center whitespace-nowrap text-xl font-semibold `}>
					Fruto del Espíritu
				</span>
			</NavbarBrand>
			<NavbarToggle />
			<NavbarCollapse className="items-center">
				<div className="flex-col md:flex md:flex-row md:items-center gap-4">
					{MainNavigation.map((nav: NavigationItemType) => (
						<NavbarLink
							key={nav.name}
							as={Link}
							href={nav.href}
							active={isActive(pathname, nav.href)}
							className="dark:text-gray-300  dark:hover:text-white rounded-2xl px-3 py-2 text-sm font-medium">
							{nav.name}
						</NavbarLink>
					))}
					{user ? (
            <NavbarLink
              as={Link}
              href="/perfil"
              active={isActive(pathname, "/perfil")}
              className="dark:text-gray-300  dark:hover:text-white rounded-2xl px-3 py-2 text-sm font-medium">
              Admin
            </NavbarLink>
					) : (
						<NavbarLink
							as={Link}
							href="/log"
							active={isActive(pathname, "/log")}
							className="dark:text-gray-300  dark:hover:text-white rounded-2xl px-3 py-2 text-sm font-medium">
							Iniciar Sesión
						</NavbarLink>
					)}
					<DarkThemeToggle />
				</div>
			</NavbarCollapse>
		</Navbar>
	);
}
