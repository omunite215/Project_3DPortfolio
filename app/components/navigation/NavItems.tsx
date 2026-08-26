"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import type { NavLink } from "@/app/domain/types";

/**
 * Nav link list, shared by the desktop bar and the mobile sheet so the active
 * state and `aria-current` wiring cannot drift between them.
 */

type Props = {
	links: NavLink[];
	activeId: string;
	onNavigate?: (link: NavLink) => void;
	className?: string;
	itemClassName?: string;
	activeClassName?: string;
	inactiveClassName?: string;
	/** Extra trailing item; the mobile sheet puts the resume button here. */
	footer?: ReactNode;
};

export function NavItems({
	links,
	activeId,
	onNavigate,
	className = "",
	itemClassName = "",
	activeClassName = "text-white",
	inactiveClassName = "text-secondary",
	footer,
}: Props) {
	return (
		<ul className={className}>
			{links.map((link) => {
				const active = activeId === link.id;
				return (
					<li
						key={link.id}
						className={`${active ? activeClassName : inactiveClassName} ${itemClassName}`}
					>
						<Link
							href={`#${link.id}`}
							onClick={() => onNavigate?.(link)}
							aria-current={active ? "location" : undefined}
						>
							{link.title}
						</Link>
					</li>
				);
			})}
			{footer && <li>{footer}</li>}
		</ul>
	);
}

export default NavItems;
