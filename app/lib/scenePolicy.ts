import type { DeviceSnapshot } from "@/app/lib/device";

/**
 * Decides what a 3D slot renders. Scenes declare what they cost; this picks the
 * mode for the current device.
 */

export type SceneCost =
	/** Small, procedural or already-cached; renders on any capable device. */
	| "light"
	/** Multi-megabyte glTF. Full tier only, or explicit opt-in. */
	| "heavy"
	/** Cheap to fetch but holds an uncapped rAF loop; costs battery, not bytes. */
	| "continuous";

export type SceneMode =
	/** Mount live WebGL. */
	| "live"
	/** Show the pre-rendered still. */
	| "poster"
	/** Device not yet measured. */
	| "pending";

export type PolicyInput = {
	snapshot: DeviceSnapshot;
	/** False until the client has measured the environment. */
	ready: boolean;
	/** Visitor explicitly asked for live 3D on a constrained device. */
	force3D: boolean;
	cost: SceneCost;
};

export function resolveSceneMode({
	snapshot,
	ready,
	force3D,
	cost,
}: PolicyInput): SceneMode {
	if (!ready) return "pending";

	if (!snapshot.webgl) return "poster";

	// Opt-in beats the tier, but never reduced-motion.
	if (force3D && !snapshot.reducedMotion) return "live";

	if (snapshot.tier === "static") return "poster";

	switch (cost) {
		case "light":
			return "live";
		case "heavy":
		case "continuous":
			return snapshot.tier === "full" ? "live" : "poster";
	}
}

/** The device could run it; we just chose not to. Worth offering an opt-in. */
export function canOfferOptIn(snapshot: DeviceSnapshot, mode: SceneMode) {
	return mode === "poster" && snapshot.webgl && !snapshot.reducedMotion;
}

/** Reason a slot fell back, used to pick fallback copy. */
export function fallbackReason(snapshot: DeviceSnapshot) {
	if (!snapshot.webgl) return "no-webgl" as const;
	if (snapshot.saveData) return "save-data" as const;
	return "tier" as const;
}
