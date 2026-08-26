"use client";

import { PointMaterial, Points, Preload } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import * as random from "maath/random";
import { Suspense, useRef, useState } from "react";
import type { Points as ThreePoints } from "three";
import { useInViewMount } from "@/app/hooks/useInViewMount";
import type { SceneEventSource } from "@/app/components/canvas/SceneShell";
import { useDevice } from "@/app/providers/DeviceProvider";
import { resolveSceneMode } from "@/app/lib/scenePolicy";
import { ErrorBoundary } from "@/app/components/state/ErrorBoundary";

const Stars = () => {
	const ref = useRef<ThreePoints>(null);
	const [sphere] = useState(
		() => random.inSphere(new Float32Array(6000), { radius: 1.2 }) as Float32Array,
	);

	useFrame((_state, delta) => {
		if (!ref.current) return;
		ref.current.rotation.x -= delta / 10;
		ref.current.rotation.y -= delta / 15;
	});

	return (
		<group rotation={[0, 0, Math.PI / 4]}>
			<Points ref={ref} positions={sphere} stride={3} frustumCulled>
				<PointMaterial
					transparent
					color="#f272c8"
					size={0.003}
					sizeAttenuation={true}
					depthWrite={false}
				/>
			</Points>
		</group>
	);
};

/** Static stand-in for the point cloud: no context, no rAF loop. */
type Star = { id: number; cx: number; cy: number; r: number; o: number };

/** Fixed seed: server and client agree, and it does not reshuffle on re-render. */
const STATIC_STARS: Star[] = (() => {
	let seed = 20250826;
	const rand = () => {
		seed = (seed * 1664525 + 1013904223) % 4294967296;
		return seed / 4294967296;
	};

	return Array.from({ length: 150 }, (_, i) => ({
		id: i,
		cx: rand() * 100,
		cy: rand() * 100,
		r: 0.06 + rand() * 0.12,
		o: 0.25 + rand() * 0.6,
	}));
})();

function StaticStarfield() {
	const stars = STATIC_STARS;

	return (
		<svg
			className="w-full h-full"
			viewBox="0 0 100 100"
			preserveAspectRatio="xMidYMid slice"
			aria-hidden="true"
			focusable="false"
		>
			{stars.map((s) => (
				<circle
					key={s.id}
					cx={s.cx}
					cy={s.cy}
					r={s.r}
					fill="#f272c8"
					opacity={s.o}
				/>
			))}
		</svg>
	);
}

const StarsCanvas = () => {
	const [ref, inView] = useInViewMount<HTMLDivElement>({ rootMargin: "150px" });
	const device = useDevice();
	const { dpr } = device;

	// "continuous", not "heavy": procedural and free to fetch, but it holds an
	// uncapped rAF loop, which is its own reason to gate it.
	const mode = resolveSceneMode({
		snapshot: device,
		ready: device.ready,
		force3D: device.force3D,
		cost: "continuous",
	});

	const live = mode === "live" && inView;

	return (
		<div ref={ref} className="w-full h-auto absolute inset-0 z-[-1]">
			{live ? (
				<ErrorBoundary label="starfield" fallback={() => <StaticStarfield />}>
					{/* eventSource pinned to the wrapper above; see SceneShell. */}
					<Canvas
						camera={{ position: [0, 0, 1] }}
						dpr={dpr}
						eventSource={ref as SceneEventSource}
					>
						<Suspense fallback={null}>
							<Stars />
							<Preload all />
						</Suspense>
					</Canvas>
				</ErrorBoundary>
			) : (
				<StaticStarfield />
			)}
		</div>
	);
};

export default StarsCanvas;
