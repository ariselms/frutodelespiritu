"use client";
import Link from "next/link";
import { UserProfileNavigation } from "@/static";
import { isActive } from "@/helpers";
import { usePathname } from "next/navigation";
import { useAuthContext } from "@/context/authContext";
import Image from "next/image";
import {
	Navbar,
	NavbarBrand,
	NavbarCollapse,
	NavbarLink,
	NavbarToggle
} from "flowbite-react";
import { SignOutButton } from "@/components/SignOutButton";
import { BlueNavTheme } from "@/components/theme";

export function UserMainHeader() {

	const pathname = usePathname();

	const { user } = useAuthContext();

	const UserNavigationNoAuth = UserProfileNavigation.filter(
		(item) => !item.requiresAdmin
	);
	const UserNavigationWithAuth = UserProfileNavigation.filter(
		(item) => item.requiresAdmin
	);

	return (
		<header>
			<Navbar theme={BlueNavTheme}>
				<NavbarBrand as={Link} href="/perfil">
					<Image
						width={100}
						height={100}
						src={user?.image_url || "/images/animated/static-user.png"}
						onError={(e) => {
							(e.target as HTMLImageElement).src =
								"/images/animated/static-user.png";
						}}
						className="mr-3 h-10 w-10 sm:h-9 rounded-lg"
						alt="Flowbite React Logo"
					/>
					<span
						className={`${
							isActive(pathname, "/perfil") &&
							"text-blue-700 hover:text-blue-800 dark:text-white dark:hover:text-white dark:underline underline-offset-4"
						} hover:text-blue-800 text-gray-700 dark:text-gray-300 dark:hover:text-white  self-center whitespace-nowrap text-xl font-semibold `}>
						{user?.name || "Perfil"}
					</span>
				</NavbarBrand>
				<NavbarToggle />
				<NavbarCollapse>
					{UserNavigationNoAuth.map((item) => (
						<NavbarLink
							key={item.name}
							active={isActive(pathname, item.href)}
							as={Link}
							href={item.href}>
							{item.name}
						</NavbarLink>
					))}
					{user?.role === "admin" &&
						UserNavigationWithAuth.map((item) => (
							<NavbarLink
								key={item.name}
								active={isActive(pathname, item.href)}
								as={Link}
								href={item.href}>
								{item.name}
							</NavbarLink>
						))}
					<SignOutButton />
				</NavbarCollapse>
			</Navbar>
		</header>
	);
}
