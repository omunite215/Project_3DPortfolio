"use client";

import Image from "next/image";
import { useState } from "react";
import {
	LowBandwidthIllustration,
	NoWebGLIllustration,
	SceneErrorIllustration,
} from "./Illustrations";

export type FallbackReason =
	/** Device/tier is below the bar for live WebGL. */
	| "tier"
	/** Browser or GPU cannot give us a context at all. */
	| "no-webgl"
	/** Data-saver or a slow connection. */
	| "save-data"
	/** The scene threw. */
	| "error";

const COPY: Record<FallbackReason, { title: string; body: string }> = {
	tier: {
		title: "Static preview",
		body: "Showing a pre-rendered frame to keep this page light on your device.",
	},
	"no-webgl": {
		title: "3D unavailable",
		body: "This browser can't create a WebGL context, so here's a rendered still.",
	},
	"save-data": {
		title: "Data saver on",
		body: "Skipping the interactive model to save your data.",
	},
	error: {
		title: "Scene didn't load",
		body: "Something went wrong rendering this model.",
	},
};

function ReasonIllustration({ reason }: { reason: FallbackReason }) {
	if (reason === "error") return <SceneErrorIllustration size={104} />;
	if (reason === "save-data") return <LowBandwidthIllustration size={104} />;
	if (reason === "no-webgl") return <NoWebGLIllustration size={104} />;
	return <NoWebGLIllustration size={104} />;
}

type Props = {
	reason: FallbackReason;
	/** Pre-rendered still of the same scene. */
	poster?: string;
	posterAlt?: string;
	/** Offered when live 3D is possible but was gated. */
	onEnable3D?: () => void;
	/** Offered after an error. */
	onRetry?: () => void;
	/** Hide the text overlay and show the poster alone. */
	quiet?: boolean;
	priority?: boolean;
	sizes?: string;
};

/**
 * Stands in for a 3D canvas. Prefers a pre-rendered still of the same scene, and
 * only falls back to a line illustration if there is no poster or it fails.
 */
export function Scene3DFallback({
	reason,
	poster,
	posterAlt = "Pre-rendered view of the 3D scene",
	onEnable3D,
	onRetry,
	quiet = false,
	priority = false,
	sizes = "100vw",
}: Props) {
	const [posterBroken, setPosterBroken] = useState(false);
	const copy = COPY[reason];
	const showPoster = Boolean(poster) && !posterBroken;

	return (
		<div className="relative w-full h-full flex items-center justify-center overflow-hidden">
			{showPoster && poster && (
				<Image
					src={poster}
					alt={posterAlt}
					fill
					sizes={sizes}
					priority={priority}
					className="object-contain select-none"
					onError={() => setPosterBroken(true)}
				/>
			)}

			{!showPoster && (
				<div className="flex flex-col items-center gap-3 px-6 text-center">
					<ReasonIllustration reason={reason} />
					<p className="text-white font-semibold text-[15px]">{copy.title}</p>
					<p className="text-secondary text-[13px] max-w-[260px] leading-relaxed">
						{copy.body}
					</p>
				</div>
			)}

			{/* With a poster, the copy would cover the artwork. */}
			{showPoster && !quiet && (onEnable3D || onRetry) && (
				<div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10">
					{onEnable3D && (
						<button
							type="button"
							onClick={onEnable3D}
							className="rounded-full bg-black/55 backdrop-blur-sm border border-[#915EFF]/40 px-4 py-2 text-[12px] font-medium text-white hover:bg-[#915EFF]/25 transition-colors"
						>
							Load interactive 3D
						</button>
					)}
					{onRetry && !onEnable3D && (
						<button
							type="button"
							onClick={onRetry}
							className="rounded-full bg-black/55 backdrop-blur-sm border border-[#915EFF]/40 px-4 py-2 text-[12px] font-medium text-white hover:bg-[#915EFF]/25 transition-colors"
						>
							Try again
						</button>
					)}
				</div>
			)}

			{!showPoster && (onEnable3D || onRetry) && (
				<div className="absolute bottom-4 left-1/2 -translate-x-1/2">
					<button
						type="button"
						onClick={onEnable3D ?? onRetry}
						className="rounded-full border border-[#915EFF]/50 px-4 py-2 text-[12px] font-medium text-white hover:bg-[#915EFF]/20 transition-colors"
					>
						{onEnable3D ? "Load interactive 3D" : "Try again"}
					</button>
				</div>
			)}
		</div>
	);
}
