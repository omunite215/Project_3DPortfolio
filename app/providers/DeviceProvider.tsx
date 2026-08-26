"use client";

import {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
	useSyncExternalStore,
} from "react";
import { SSR_SNAPSHOT, type DeviceSnapshot } from "@/app/lib/device";
import {
	getServerSnapshot,
	getSnapshot,
	subscribe,
} from "@/app/lib/deviceStore";

type DeviceContextValue = DeviceSnapshot & {
	/** False until the client has measured the real environment. */
	ready: boolean;
	/** Set when a visitor explicitly opts into heavy 3D on a constrained device. */
	force3D: boolean;
	enable3D: () => void;
};

const DeviceContext = createContext<DeviceContextValue>({
	...SSR_SNAPSHOT,
	ready: false,
	force3D: false,
	enable3D: () => {},
});

export function DeviceProvider({ children }: { children: React.ReactNode }) {
	const snapshot = useSyncExternalStore(
		subscribe,
		getSnapshot,
		getServerSnapshot,
	);
	const [force3D, setForce3D] = useState(false);

	const enable3D = useCallback(() => setForce3D(true), []);

	// Identity check against the SSR placeholder, so no separate mount flag.
	const ready = snapshot !== SSR_SNAPSHOT;

	const value = useMemo<DeviceContextValue>(
		() => ({ ...snapshot, ready, force3D, enable3D }),
		[snapshot, ready, force3D, enable3D],
	);

	return (
		<DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>
	);
}

export function useDevice() {
	return useContext(DeviceContext);
}
