import { MainNavigation } from "@/static";
import { NavigationItemType } from "@/models/navigationTypes";
import {
	Footer,
	FooterBrand,
	FooterCopyright,
	FooterDivider,
	FooterLink,
	FooterLinkGroup
} from "flowbite-react";

export default function MainFooter() {
	return (
		<Footer container className="rounded-none bg-amber-50 dark:bg-black border-t border-amber-100 dark:border-gray-700">
			<div className="w-full text-center">
				<div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
					<FooterBrand
						href="/"
						src="/images/logo.png"
						alt="Fruto del Espíritu Logo"
						name="Fruto del Espíritu"
					/>
					<FooterLinkGroup>
            {MainNavigation.map((nav: NavigationItemType) => (
              <FooterLink key={nav.name} href={nav.href}>
                {nav.name}
              </FooterLink>
            ))}
					</FooterLinkGroup>
				</div>
				<FooterDivider />
				<FooterCopyright href="/" by="Fruto del Espíritu" year={new Date().getFullYear()} />
			</div>
		</Footer>
	);
}
