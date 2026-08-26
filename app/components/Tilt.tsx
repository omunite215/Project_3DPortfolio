"use client";

import { useCallback, useEffect, useRef } from "react";
import { useDevice } from "@/app/providers/DeviceProvider";

export type TiltOptions = {
	/** Maximum tilt in degrees. */
	max?: number;
	perspective?: number;
	/** Hover scale. 1 means no scaling. */
	scale?: number;
	/** Enter/leave transition duration in ms. */
	speed?: number;
	reverse?: boolean;
	easing?: string;
};

type Props = {
	children: React.ReactNode;
	className?: string;
	options?: TiltOptions;
	/** Override the device-context default. */
	enabled?: boolean;
};

const DEFAULTS = {
	max: 35,
	perspective: 1000,
	scale: 1,
	speed: 300,
	reverse: false,
	easing: "cubic-bezier(.03,.98,.52,.99)",
} satisfies Required<TiltOptions>;

/**
 * Pointer-tracking 3D tilt, replacing `react-tilt` (unmaintained, peer-locked to
 * React 18). Same transform maths, but writes straight to `style` in a rAF
 * instead of through setState, and skips coarse pointers and reduced-motion.
 */
export function Tilt({ children, className, options, enabled: enabledProp }: Props) {
	const ref = useRef<HTMLDivElement>(null);
	const frame = useRef<number | null>(null);
	const { isTouch, reducedMotion, ready } = useDevice();

	const settings = { ...DEFAULTS, ...options };
	const { max, perspective, scale, speed, reverse, easing } = settings;

	const enabled = enabledProp ?? (ready && !isTouch && !reducedMotion);

	const write = useCallback((transform: string) => {
		const node = ref.current;
		if (!node) return;
		if (frame.current !== null) cancelAnimationFrame(frame.current);
		frame.current = requestAnimationFrame(() => {
			node.style.transform = transform;
			frame.current = null;
		});
	}, []);

	const onPointerMove = useCallback(
		(event: React.PointerEvent<HTMLDivElement>) => {
			if (!enabled) return;
			const node = ref.current;
			if (!node) return;

			const rect = node.getBoundingClientRect();
			const px = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
			const py = Math.min(Math.max((event.clientY - rect.top) / rect.height, 0), 1);

			const dir = reverse ? -1 : 1;
			const tiltX = dir * (max / 2 - px * max);
			const tiltY = dir * (py * max - max / 2);

			write(
				`perspective(${perspective}px) rotateX(${tiltY.toFixed(2)}deg) rotateY(${tiltX.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`,
			);
		},
		[enabled, max, perspective, reverse, scale, write],
	);

	const onPointerEnter = useCallback(() => {
		if (!enabled) return;
		const node = ref.current;
		if (!node) return;
		node.style.transition = `transform ${speed}ms ${easing}`;
		window.setTimeout(() => {
			if (ref.current) ref.current.style.transition = "";
		}, speed);
	}, [enabled, speed, easing]);

	const onPointerLeave = useCallback(() => {
		if (!enabled) return;
		const node = ref.current;
		if (!node) return;
		node.style.transition = `transform ${speed}ms ${easing}`;
		write(
			`perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
		);
	}, [enabled, speed, easing, perspective, write]);

	useEffect(() => {
		return () => {
			if (frame.current !== null) cancelAnimationFrame(frame.current);
		};
	}, []);

	// Clear any residual transform if the device re-tiers mid-session.
	useEffect(() => {
		if (!enabled && ref.current) {
			ref.current.style.transform = "";
			ref.current.style.transition = "";
		}
	}, [enabled]);

	return (
		<div
			ref={ref}
			className={className}
			style={{ willChange: enabled ? "transform" : undefined }}
			onPointerMove={enabled ? onPointerMove : undefined}
			onPointerEnter={enabled ? onPointerEnter : undefined}
			onPointerLeave={enabled ? onPointerLeave : undefined}
		>
			{children}
		</div>
	);
}

export default Tilt;
