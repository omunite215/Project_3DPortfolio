import type { Variants } from "motion/react";

/**
 * Shared animation variants. `motion` v13 narrows `transition.type` to a literal
 * union, and some call sites pass "" to mean "no explicit type", so that is
 * normalised before it reaches the animation engine.
 */

export type Direction = "left" | "right" | "up" | "down" | "";
export type EaseType = "spring" | "tween" | "inertia" | "keyframes" | "";

/** "" means "let the engine choose". */
function normalizeType(type: EaseType) {
	return type === "" ? undefined : type;
}

export const textVariant = (delay?: number): Variants => ({
	hidden: {
		y: -50,
		opacity: 0,
	},
	show: {
		y: 0,
		opacity: 1,
		transition: {
			type: "spring",
			duration: 1.25,
			delay,
		},
	},
});

export const fadeIn = (
	direction: Direction,
	type: EaseType,
	delay: number,
	duration: number,
): Variants => ({
	hidden: {
		x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
		y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
		opacity: 0,
	},
	show: {
		x: 0,
		y: 0,
		opacity: 1,
		transition: {
			type: normalizeType(type),
			delay,
			duration,
			ease: "easeOut",
		},
	},
});

export const zoomIn = (delay: number, duration: number): Variants => ({
	hidden: {
		scale: 0,
		opacity: 0,
	},
	show: {
		scale: 1,
		opacity: 1,
		transition: {
			type: "tween",
			delay,
			duration,
			ease: "easeOut",
		},
	},
});

export const slideIn = (
	direction: Direction,
	type: EaseType,
	delay: number,
	duration: number,
): Variants => ({
	hidden: {
		x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
		y: direction === "up" ? "100%" : direction === "down" ? "100%" : 0,
	},
	show: {
		x: 0,
		y: 0,
		transition: {
			type: normalizeType(type),
			delay,
			duration,
			ease: "easeOut",
		},
	},
});

export const staggerContainer = (
	staggerChildren?: number,
	delayChildren?: number,
): Variants => ({
	hidden: {},
	show: {
		transition: {
			staggerChildren,
			delayChildren: delayChildren ?? 0,
		},
	},
});
