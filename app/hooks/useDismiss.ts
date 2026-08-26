"use client";

import { type RefObject, useEffect } from "react";

/**
 * Fires `onDismiss` on Escape or an outside pointer press. Listeners are only
 * attached while `active`.
 */
export function useDismiss(
	active: boolean,
	containerRef: RefObject<HTMLElement | null>,
	onDismiss: () => void,
) {
	useEffect(() => {
		if (!active) return;

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") onDismiss();
		};

		const onPointerDown = (event: PointerEvent) => {
			if (!containerRef.current?.contains(event.target as Node)) onDismiss();
		};

		document.addEventListener("keydown", onKeyDown);
		document.addEventListener("pointerdown", onPointerDown);

		return () => {
			document.removeEventListener("keydown", onKeyDown);
			document.removeEventListener("pointerdown", onPointerDown);
		};
	}, [active, containerRef, onDismiss]);
}
