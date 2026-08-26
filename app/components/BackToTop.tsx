"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useDevice } from "@/app/providers/DeviceProvider";

/**
 * Appears once the visitor is a viewport or so down the page.
 *
 * The site is a single tall scroll and the only way back up was to drag all the
 * way or hit the wordmark in the navbar, which is not obvious as a control.
 */
export function BackToTop() {
	const [visible, setVisible] = useState(false);
	const { reducedMotion } = useDevice();

	useEffect(() => {
		let frame = 0;
		const onScroll = () => {
			if (frame) return;
			frame = requestAnimationFrame(() => {
				setVisible(window.scrollY > window.innerHeight * 1.2);
				frame = 0;
			});
		};

		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => {
			window.removeEventListener("scroll", onScroll);
			if (frame) cancelAnimationFrame(frame);
		};
	}, []);

	return (
		<AnimatePresence>
			{visible && (
				<motion.button
					type="button"
					onClick={() =>
						window.scrollTo({
							top: 0,
							behavior: reducedMotion ? "auto" : "smooth",
						})
					}
					aria-label="Back to top"
					initial={{ opacity: 0, scale: 0.8, y: 12 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					exit={{ opacity: 0, scale: 0.8, y: 12 }}
					transition={{ duration: reducedMotion ? 0 : 0.2 }}
					className="fixed bottom-6 right-6 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-[#915EFF]/40 bg-black-100/80 text-white backdrop-blur-sm transition-colors hover:bg-[#915EFF]/30"
				>
					<svg
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2.2"
						strokeLinecap="round"
						strokeLinejoin="round"
						aria-hidden="true"
						focusable="false"
					>
						<path d="M12 19V5M5 12l7-7 7 7" />
					</svg>
				</motion.button>
			)}
		</AnimatePresence>
	);
}

export default BackToTop;
