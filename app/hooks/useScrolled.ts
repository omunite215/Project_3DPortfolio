"use client";

import { useEffect, useState } from "react";

/** True once scrolled past `threshold`. Coalesced into a frame, passive. */
export function useScrolled(threshold = 100): boolean {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		let frame = 0;

		const onScroll = () => {
			if (frame) return;
			frame = requestAnimationFrame(() => {
				setScrolled(window.scrollY > threshold);
				frame = 0;
			});
		};

		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });

		return () => {
			window.removeEventListener("scroll", onScroll);
			if (frame) cancelAnimationFrame(frame);
		};
	}, [threshold]);

	return scrolled;
}
