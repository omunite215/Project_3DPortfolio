"use client";

import { type RefObject, useEffect, useRef, useState } from "react";

type Options = {
	/** How far outside the viewport to start mounting. */
	rootMargin?: string;
	/** Keep mounted once seen. Cheaper for DOM, costlier for GPU memory. */
	once?: boolean;
	/**
	 * Grace period before unmounting on leave. Entering is immediate. Stops a
	 * fast scroll from creating and destroying a WebGL context in a few frames.
	 */
	leaveDelay?: number;
};

/**
 * Mount-gating for expensive subtrees, so WebGL contexts stay scoped to the
 * section that owns them. All the canvases at once would hit the ~16 the browser
 * allows before it starts dropping the oldest.
 */
export function useInViewMount<T extends HTMLElement = HTMLDivElement>({
	rootMargin = "200px",
	once = false,
	leaveDelay = 600,
}: Options = {}): [RefObject<T | null>, boolean] {
	const ref = useRef<T>(null);
	const [inView, setInView] = useState(false);
	const leaveTimer = useRef<number | null>(null);

	useEffect(() => {
		const node = ref.current;
		if (!node) return;

		const clearLeaveTimer = () => {
			if (leaveTimer.current !== null) {
				window.clearTimeout(leaveTimer.current);
				leaveTimer.current = null;
			}
		};

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						clearLeaveTimer();
						setInView(true);
						if (once) observer.disconnect();
					} else if (!once) {
						clearLeaveTimer();
						leaveTimer.current = window.setTimeout(() => {
							leaveTimer.current = null;
							setInView(false);
						}, leaveDelay);
					}
				}
			},
			{ rootMargin },
		);

		observer.observe(node);
		return () => {
			clearLeaveTimer();
			observer.disconnect();
		};
	}, [rootMargin, once, leaveDelay]);

	return [ref, inView];
}
