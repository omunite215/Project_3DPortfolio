"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import type { NavLink } from "@/app/domain/types";
import { useDismiss } from "@/app/hooks/useDismiss";
import ResumeButton from "@/app/components/ResumeButton";
import { NavItems } from "./NavItems";

/** Small-viewport nav sheet and its toggle. Dismissal via `useDismiss`. */
export function MobileMenu({
	links,
	activeId,
	onNavigate,
}: {
	links: NavLink[];
	activeId: string;
	onNavigate?: (link: NavLink) => void;
}) {
	const [open, setOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const close = useCallback(() => setOpen(false), []);
	useDismiss(open, containerRef, close);

	return (
		<div
			className="sm:hidden flex flex-1 justify-end items-center"
			ref={containerRef}
		>
			<button
				type="button"
				onClick={() => setOpen((value) => !value)}
				aria-expanded={open}
				aria-controls="mobile-menu"
				aria-label={open ? "Close menu" : "Open menu"}
				className="w-[28px] h-[28px] flex items-center justify-center"
			>
				<Image
					src={open ? "/close.svg" : "/menu.svg"}
					width={28}
					height={28}
					alt=""
					aria-hidden="true"
					className="w-[28px] h-[28px] object-contain"
				/>
			</button>

			<div
				id="mobile-menu"
				hidden={!open}
				className={`${
					open ? "flex" : "hidden"
				} p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
			>
				<NavItems
					links={links}
					activeId={activeId}
					onNavigate={(link) => {
						close();
						onNavigate?.(link);
					}}
					className="list-none flex justify-end items-start flex-1 flex-col gap-4"
					itemClassName="font-medium cursor-pointer text-[16px]"
					footer={
						<div className="mt-2">
							<ResumeButton />
						</div>
					}
				/>
			</div>
		</div>
	);
}

export default MobileMenu;
