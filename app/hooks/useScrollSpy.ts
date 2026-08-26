"use client";

import { useEffect, useState } from "react";

/**
 * Which of `ids` is currently most visible. Returns "" until something is in
 * range, so the initial render matches the server.
 */
export function useScrollSpy(
	ids: string[],
	options: { rootMargin?: string } = {},
): string {
	const { rootMargin = "-45% 0px -50% 0px" } = options;
	const [activeId, setActiveId] = useState("");

	// Stable primitive: avoids re-running on a new array identity.
	const key = ids.join(",");

	useEffect(() => {
		const targets = key
			.split(",")
			.filter(Boolean)
			.map((id) => document.getElementById(id))
			.filter((el): el is HTMLElement => el !== null);

		if (targets.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				let best: IntersectionObserverEntry | null = null;
				for (const entry of entries) {
					if (!entry.isIntersecting) continue;
					if (!best || entry.intersectionRatio > best.intersectionRatio) {
						best = entry;
					}
				}
				if (best) setActiveId(best.target.id);
			},
			{ rootMargin, threshold: [0, 0.25, 0.5, 1] },
		);

		for (const el of targets) observer.observe(el);
		return () => observer.disconnect();
	}, [key, rootMargin]);

	return activeId;
}
