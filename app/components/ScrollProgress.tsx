"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useDevice } from "@/app/providers/DeviceProvider";

/**
 * Thin reading-progress bar pinned to the top of the viewport.
 *
 * The page is one long scroll with no chrome to indicate depth; this gives a
 * cheap sense of position. Driven by `useScroll`, so it runs on the compositor
 * rather than re-rendering React on every scroll event.
 */
export function ScrollProgress() {
	const { scrollYProgress } = useScroll();
	const { reducedMotion } = useDevice();

	const scaleX = useSpring(scrollYProgress, {
		stiffness: 160,
		damping: 30,
		restDelta: 0.001,
	});

	return (
		<motion.div
			aria-hidden="true"
			style={{ scaleX: reducedMotion ? scrollYProgress : scaleX }}
			className="fixed top-0 left-0 right-0 z-30 h-[3px] origin-left bg-gradient-to-r from-[#915EFF] via-[#bf61ff] to-[#00cea8]"
		/>
	);
}

export default ScrollProgress;
