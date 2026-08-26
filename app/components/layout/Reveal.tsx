"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import type { Variants } from "motion/react";
import { staggerContainer } from "@/app/utils/motion";

/** Scroll-triggered reveal. Defaults to the shared stagger container. */

type Props = {
	children: ReactNode;
	variants?: Variants;
	/** Fraction visible before animating. */
	amount?: number;
	once?: boolean;
	className?: string;
	as?: "div" | "section" | "li";
};

export function Reveal({
	children,
	variants = staggerContainer(),
	amount = 0.25,
	once = true,
	className = "",
	as = "div",
}: Props) {
	const MotionTag =
		as === "section" ? motion.section : as === "li" ? motion.li : motion.div;

	return (
		<MotionTag
			variants={variants}
			initial="hidden"
			whileInView="show"
			viewport={{ once, amount }}
			className={className}
		>
			{children}
		</MotionTag>
	);
}

export default Reveal;
