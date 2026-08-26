import {
	type DeviceSnapshot,
	SSR_SNAPSHOT,
	readDevice,
} from "@/app/lib/device";

/**
 * Device snapshot as an external store for `useSyncExternalStore`.
 *
 * The snapshot object is only replaced when a field actually changes, which is
 * what keeps `getSnapshot` referentially stable enough for React.
 */

const MEDIA_QUERIES = [
	"(prefers-reduced-motion: reduce)",
	"(max-width: 500px)",
	"(max-width: 1024px)",
	"(pointer: coarse)",
] as const;

let snapshot: DeviceSnapshot = SSR_SNAPSHOT;
let watching = false;

const listeners = new Set<() => void>();
const mediaLists: MediaQueryList[] = [];

function sameSnapshot(a: DeviceSnapshot, b: DeviceSnapshot): boolean {
	return (
		a.tier === b.tier &&
		a.isMobile === b.isMobile &&
		a.isTouch === b.isTouch &&
		a.reducedMotion === b.reducedMotion &&
		a.saveData === b.saveData &&
		a.webgl === b.webgl &&
		a.dpr[0] === b.dpr[0] &&
		a.dpr[1] === b.dpr[1]
	);
}

function refresh() {
	const next = readDevice();
	if (sameSnapshot(next, snapshot)) return;
	snapshot = next;
	for (const listener of listeners) listener();
}

function startWatching() {
	if (watching || typeof window === "undefined") return;
	watching = true;

	for (const query of MEDIA_QUERIES) {
		const mql = window.matchMedia(query);
		mql.addEventListener("change", refresh);
		mediaLists.push(mql);
	}

	refresh();
}

function stopWatching() {
	for (const mql of mediaLists) mql.removeEventListener("change", refresh);
	mediaLists.length = 0;
	watching = false;
}

export function subscribe(onChange: () => void): () => void {
	listeners.add(onChange);
	startWatching();

	return () => {
		listeners.delete(onChange);
		if (listeners.size === 0) stopWatching();
	};
}

export function getSnapshot(): DeviceSnapshot {
	return snapshot;
}

export function getServerSnapshot(): DeviceSnapshot {
	return SSR_SNAPSHOT;
}

