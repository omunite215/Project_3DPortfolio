"use client";

import type { ReactNode } from "react";
import { Container, type ContainerWidth } from "./Container";
import { Reveal } from "./Reveal";

/** A page section: anchor target, reveal animation and measured container. */

type Props = {
	children: ReactNode;
	/** Rendered on an offset span so the fixed navbar does not cover it. */
	id?: string;
	width?: ContainerWidth;
	/** Off for sections that animate themselves. */
	animate?: boolean;
	className?: string;
};

export function Section({
	children,
	id,
	width = "content",
	animate = true,
	className = "",
}: Props) {
	const body = (
		<>
			{id && (
				<span className="hash-span" id={id}>
					&nbsp;
				</span>
			)}
			{children}
		</>
	);

	if (!animate) {
		return (
			<Container as="section" width={width} className={`relative z-0 py-10 sm:py-16 ${className}`}>
				{body}
			</Container>
		);
	}

	return (
		<Reveal as="section" className={`relative z-0 ${className}`}>
			<Container width={width} gutter={false} className="padding">
				{body}
			</Container>
		</Reveal>
	);
}

export default Section;
