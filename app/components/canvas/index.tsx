"use client";

import dynamic from "next/dynamic";
import { CanvasSkeleton } from "@/app/components/state/Skeletons";

/**
 * Every 3D surface is code-split behind `ssr: false`. three.js, r3f and drei
 * dominate the bundle and cannot run on the server anyway, so keeping them out
 * of the initial chunk lets the text paint first.
 */

export const ComputersCanvas = dynamic(
	() => import("@/app/components/canvas/Computers"),
	{
		ssr: false,
		loading: () => <CanvasSkeleton label="workstation model" />,
	},
);

export const BallCanvas = dynamic(() => import("@/app/components/canvas/Ball"), {
	ssr: false,
	loading: () => <CanvasSkeleton label="badge" />,
});

export const EarthCanvas = dynamic(
	() => import("@/app/components/canvas/Earth"),
	{
		ssr: false,
		loading: () => <CanvasSkeleton label="globe" />,
	},
);

export const StarsCanvas = dynamic(
	() => import("@/app/components/canvas/Stars"),
	{ ssr: false },
);
