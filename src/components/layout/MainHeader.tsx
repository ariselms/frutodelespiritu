"use client";

import {
	Navbar,
	NavbarBrand,
	NavbarCollapse,
	NavbarLink,
	NavbarToggle
} from "flowbite-react";
import Link from "next/link";
import { DarkThemeToggle } from "flowbite-react";
import { usePathname } from "next/navigation";
import { MainNavigation } from "@/static";
import { NavigationItemType } from "@/models/navigation";

export default function MainHeader() {
  const pathname = usePathname();

  const isActive = (currentPath: string) => {
    return pathname === currentPath;
  }

	return (
		<Navbar fluid>
			<NavbarBrand as={Link} href="/">
				<img
					src="/images/logo.png"
					className="mr-3 h-6 sm:h-9"
					alt="Fruto del Espíritu Logo"
				/>
				<span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
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
								active={isActive(nav.href)}>
								{nav.name}
							</NavbarLink>
					))}
          <DarkThemeToggle />
				</div>
			</NavbarCollapse>
		</Navbar>
	);
}
