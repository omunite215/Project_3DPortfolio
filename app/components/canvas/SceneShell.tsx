"use client";

import { type ReactNode, type RefObject, useState } from "react";
import { useInViewMount } from "@/app/hooks/useInViewMount";
import {
	type SceneCost,
	canOfferOptIn,
	fallbackReason,
	resolveSceneMode,
} from "@/app/lib/scenePolicy";
import { useDevice } from "@/app/providers/DeviceProvider";
import { Scene3DFallback } from "@/app/components/state/CanvasFallback";
import { ErrorBoundary } from "@/app/components/state/ErrorBoundary";
import { CanvasSkeleton } from "@/app/components/state/Skeletons";

// r3f 9 types `eventSource` as the pre-React-19 non-nullable
// RefObject<HTMLElement>; React 19's useRef gives RefObject<T | null>. Widened
// once here so the scenes stay cast-free.
export type SceneEventSource = RefObject<HTMLElement>;

/** Props every gated scene receives from the shell. */
export type SceneProps = {
	eventSource: SceneEventSource;
};

type Props = {
	/** What this scene costs; `scenePolicy` turns that into a mode. */
	cost: SceneCost;
	/** Pre-rendered still of this exact scene. */
	poster?: string;
	posterAlt?: string;
	className?: string;
	label: string;
	/** Hide the "Load interactive 3D" affordance, e.g. for tiled scenes. */
	quiet?: boolean;
	priority?: boolean;
	sizes?: string;
	/**
	 * Built lazily, so no three.js work happens until the gate opens. Gets the
	 * shell's wrapper for `<Canvas eventSource>`: r3f otherwise reads its own
	 * container ref in a layout effect with no null check, and a canvas unmounted
	 * mid-init throws "Cannot read properties of null (reading
	 * 'addEventListener')". This wrapper outlives every canvas it hosts.
	 */
	children: (eventSource: SceneEventSource) => ReactNode;
};

/**
 * Gate in front of every 3D canvas: device policy, viewport proximity, error
 * isolation, and a placeholder that reserves layout.
 */
export function SceneShell({
	cost,
	poster,
	posterAlt,
	className = "w-full h-full",
	label,
	quiet = false,
	priority = false,
	sizes = "100vw",
	children,
}: Props) {
	const [ref, inView] = useInViewMount<HTMLDivElement>({ rootMargin: "300px" });
	const device = useDevice();
	const [attempt, setAttempt] = useState(0);

	const mode = resolveSceneMode({
		snapshot: device,
		ready: device.ready,
		force3D: device.force3D,
		cost,
	});

	// Allowed but off-screen: hold the poster so the swap is a crossfade.
	const parked = mode === "live" && !inView;

	if (mode === "pending") {
		return (
			<div ref={ref} className={className}>
				<CanvasSkeleton label={`Checking device for ${label}`} />
			</div>
		);
	}

	if (parked) {
		return (
			<div ref={ref} className={className}>
				{poster ? (
					<Scene3DFallback
						reason="tier"
						poster={poster}
						posterAlt={posterAlt}
						quiet
						priority={priority}
						sizes={sizes}
					/>
				) : (
					<CanvasSkeleton label={`Loading ${label}`} />
				)}
			</div>
		);
	}

	if (mode === "live") {
		return (
			<div ref={ref} className={className}>
				<ErrorBoundary
					key={attempt}
					label={label}
					fallback={(reset) => (
						<Scene3DFallback
							reason="error"
							poster={poster}
							posterAlt={posterAlt}
							quiet={quiet}
							sizes={sizes}
							onRetry={() => {
								reset();
								setAttempt((n) => n + 1);
							}}
						/>
					)}
				>
					{children(ref as SceneEventSource)}
				</ErrorBoundary>
			</div>
		);
	}

	return (
		<div ref={ref} className={className}>
			<Scene3DFallback
				reason={fallbackReason(device)}
				poster={poster}
				posterAlt={posterAlt}
				quiet={quiet}
				priority={priority}
				sizes={sizes}
				onEnable3D={canOfferOptIn(device, mode) ? device.enable3D : undefined}
			/>
		</div>
	);
}
