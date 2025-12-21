"use client";

import {
	FooterCopyright,
	FooterLink,
	FooterLinkGroup,
	FooterIcon,
	FooterTitle
} from "flowbite-react";

import { useNavigationData } from "@/hooks/index";
import Link from "next/link";
import Image from "next/image";

export default function MainFooter() {

	const navigation = useNavigationData();

	return (
		<footer className="w-full bg-slate-950 dark:bg-gray-950 text-slate-50 dark:text-gray-50 py-10">
			<div className="max-w-7xl mx-auto w-full px-12 md:px-10">
				<div className="flex flex-col items-start gap-8">
					<div className="w-full lg:w-4/12 text-slate-50 dark:text-gray-50">
						<Link className="flex items-center" href="/">
							<Image
								alt="Fruto del Espíritu Logo"
								width={100}
								height={100}
								src="/images/logo.png"
								className="h-10 w-auto mr-2"
							/>
							<span className="text-2xl">Fruto del Espíritu</span>
						</Link>
					</div>
					<div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:mt-4 sm:gap-6">
						<div className="w-full">
							<FooterTitle
								className="text-slate-50 dark:text-gray-50"
								title="Sobre Nosotros"
							/>
							<FooterLinkGroup col>
								{navigation.company.map((nav) => (
									<div key={nav.href}>
										<FooterLink
											className="text-slate-50 dark:text-gray-50"
											href={nav.href}>
											{nav.name}
										</FooterLink>
									</div>
								))}
							</FooterLinkGroup>
						</div>
						<div className="w-full">
							<FooterTitle
								className="text-slate-50 dark:text-gray-50"
								title="Legal"
							/>
							<FooterLinkGroup col>
								{navigation.legal.map((nav) => (
									<div key={nav.href}>
										<FooterLink
											className="text-slate-50 dark:text-gray-50"
											href={nav.href}>
											{nav.name}
										</FooterLink>
									</div>
								))}
							</FooterLinkGroup>
						</div>
						<div className="w-full">
							<FooterTitle
								className="text-slate-50 dark:text-gray-50"
								title="Ayuda"
							/>
							<FooterLinkGroup col>
								{navigation.support.map((nav) => (
									<div key={nav.href}>
										<FooterLink
											className="text-slate-50 dark:text-gray-50"
											href={nav.href}>
											{nav.name}
										</FooterLink>
									</div>
								))}
							</FooterLinkGroup>
						</div>
					</div>
				</div>
				<hr className="my-8 text-slate-900 dark:text-gray-900" />
				<div className="w-full sm:flex sm:items-center sm:justify-between">
					<FooterCopyright
						className="text-slate-50 dark:text-gray-50"
						href="/"
						by="Fruto del Espíritu™"
						year={new Date().getFullYear()}
					/>
					{/* <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
						{navigation.social.map((social, i) => (
							<FooterIcon
								key={i}
								className="text-slate-50 dark:text-gray-50"
								href={social.href}
								icon={social.icon}
							/>
						))}
					</div> */}
				</div>
			</div>
		</footer>
	);
}
