"use client";

import { useCallback, useMemo } from "react";
import { navLinks } from "@/app/constants";
import { useScrollSpy } from "@/app/hooks/useScrollSpy";
import { useScrolled } from "@/app/hooks/useScrolled";
import { Container } from "./layout/Container";
import { Brand } from "./navigation/Brand";
import { MobileMenu } from "./navigation/MobileMenu";
import { NavItems } from "./navigation/NavItems";
import ResumeButton from "./ResumeButton";

/** Site navigation. Behaviour lives in the hooks; markup in navigation/. */
const Navbar = () => {
	const scrolled = useScrolled(100);
	const ids = useMemo(() => navLinks.map((link) => link.id), []);

	// Sole source of truth for the highlight. Clicking a link scrolls to the
	// section, so the observer picks it up a frame later.
	const activeId = useScrollSpy(ids);

	const onNavigateHome = useCallback(() => window.scrollTo({ top: 0 }), []);

	return (
		<nav
			className={`w-full flex items-center py-5 fixed top-0 z-20 ${
				scrolled ? "bg-primary" : "bg-transparent"
			}`}
			aria-label="Main navigation"
		>
			<Container className="flex justify-between items-center">
				<Brand onNavigateHome={onNavigateHome} />

				<NavItems
					links={navLinks}
					activeId={activeId}
					className="list-none hidden sm:flex flex-row gap-10"
					itemClassName="hover:text-white text-[18px] font-medium cursor-pointer"
				/>

				<div className="mt-2 lg:block hidden">
					<ResumeButton />
				</div>

				<MobileMenu links={navLinks} activeId={activeId} />
			</Container>
		</nav>
	);
};

export default Navbar;
