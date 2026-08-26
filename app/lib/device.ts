/**
 * Render-tier detection. Pure functions; React plumbing lives in
 * providers/DeviceProvider.
 */

export type RenderTier = "full" | "lite" | "static";

export type DeviceSnapshot = {
	tier: RenderTier;
	/** 500px breakpoint, used for the hero model's scale and position. */
	isMobile: boolean;
	isTouch: boolean;
	reducedMotion: boolean;
	saveData: boolean;
	webgl: boolean;
	/** Recommended react-three-fiber `dpr` clamp. */
	dpr: [number, number];
};

/** Server / first-paint default. */
export const SSR_SNAPSHOT: DeviceSnapshot = {
	tier: "static",
	isMobile: false,
	isTouch: false,
	reducedMotion: false,
	saveData: false,
	webgl: false,
	dpr: [1, 1],
};

type NetworkInformation = {
	saveData?: boolean;
	effectiveType?: string;
};

type ExtendedNavigator = Navigator & {
	connection?: NetworkInformation;
	mozConnection?: NetworkInformation;
	webkitConnection?: NetworkInformation;
	deviceMemory?: number;
};

// Memoised: probing costs a real GL context, and browsers cap us at ~16.
let webglSupport: boolean | null = null;

export function detectWebGL(): boolean {
	if (webglSupport !== null) return webglSupport;
	if (typeof document === "undefined") return false;

	try {
		const canvas = document.createElement("canvas");
		const gl =
			canvas.getContext("webgl2") ??
			canvas.getContext("webgl") ??
			canvas.getContext("experimental-webgl");

		webglSupport = Boolean(gl);

		// Release the probe context immediately.
		if (gl && "getExtension" in gl) {
			(gl as WebGLRenderingContext)
				.getExtension("WEBGL_lose_context")
				?.loseContext();
		}
	} catch {
		webglSupport = false;
	}

	return webglSupport;
}

function readConnection(): NetworkInformation | undefined {
	if (typeof navigator === "undefined") return undefined;
	const nav = navigator as ExtendedNavigator;
	return nav.connection ?? nav.mozConnection ?? nav.webkitConnection;
}

/** Reads the live environment and derives a render tier. Client-only. */
export function readDevice(): DeviceSnapshot {
	if (typeof window === "undefined") return SSR_SNAPSHOT;

	const nav = navigator as ExtendedNavigator;
	const conn = readConnection();

	const reducedMotion = window.matchMedia(
		"(prefers-reduced-motion: reduce)",
	).matches;
	const isMobile = window.matchMedia("(max-width: 500px)").matches;
	const isTouch = window.matchMedia("(pointer: coarse)").matches;
	const isSmallish = window.matchMedia("(max-width: 1024px)").matches;

	const saveData = conn?.saveData === true;
	const slowNetwork = ["slow-2g", "2g", "3g"].includes(
		conn?.effectiveType ?? "",
	);

	const memory = nav.deviceMemory;
	const cores = nav.hardwareConcurrency;
	const lowMemory = typeof memory === "number" && memory <= 4;
	const lowCores = typeof cores === "number" && cores <= 4;

	const webgl = detectWebGL();

	let tier: RenderTier;

	if (!webgl || reducedMotion || saveData || slowNetwork || lowMemory) {
		tier = "static";
	} else if (isTouch || isSmallish || lowCores) {
		tier = "lite";
	} else {
		tier = "full";
	}

	return {
		tier,
		isMobile,
		isTouch,
		reducedMotion,
		saveData,
		webgl,
		// A 3x-DPR screen otherwise renders ~9x the fragments.
		dpr: tier === "full" ? [1, 2] : [1, 1.5],
	};
}

