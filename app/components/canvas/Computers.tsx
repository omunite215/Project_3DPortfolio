"use client";

import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import CanvasLoader from "@/app/components/Loader";
import { SceneShell, type SceneProps } from "@/app/components/canvas/SceneShell";
import { useDevice } from "@/app/providers/DeviceProvider";

const MODEL = "/desktop_pc/scene.gltf";

const Computers = ({ isMobile }: { isMobile: boolean }) => {
	const computer = useGLTF(MODEL);

	return (
		<mesh>
			<hemisphereLight intensity={0.15} groundColor="black" />
			<pointLight intensity={1} />
			<spotLight
				position={[-20, 50, 10]}
				angle={0.12}
				penumbra={1}
				intensity={1}
				castShadow
				shadow-mapSize={1024}
			/>
			<primitive
				object={computer.scene}
				scale={isMobile ? 0.7 : 0.75}
				position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
				rotation={[-0.01, -0.2, -0.1]}
			/>
		</mesh>
	);
};

const ComputersScene = ({ eventSource }: SceneProps) => {
	const { isMobile, dpr } = useDevice();

	return (
		<Canvas
			frameloop="demand"
			shadows
			dpr={dpr}
			eventSource={eventSource}
			camera={{ position: [20, 3, 5], fov: 25 }}
			// No `preserveDrawingBuffer`: it keeps a second copy of every frame and
			// is only needed to read pixels back, which this scene never does.
			gl={{ powerPreference: "high-performance", antialias: true }}
		>
			<Suspense fallback={<CanvasLoader />}>
				<OrbitControls
					enableZoom={false}
					maxPolarAngle={Math.PI / 2}
					minPolarAngle={Math.PI / 2}
				/>
				<Computers isMobile={isMobile} />
				<Preload all />
			</Suspense>
		</Canvas>
	);
};

/**
 * The heaviest thing on the page, so it only auto-loads on the full tier.
 * Everyone else gets a still at the same camera framing, plus an opt-in.
 */
const ComputersCanvas = () => (
	<SceneShell
		cost="heavy"
		label="workstation model"
		poster="/posters/hero.webp"
		posterAlt="3D render of a desktop workstation running a code editor"
		priority
		sizes="(max-width: 768px) 100vw, 70vw"
	>
		{(eventSource) => <ComputersScene eventSource={eventSource} />}
	</SceneShell>
);

export default ComputersCanvas;
