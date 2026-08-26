"use client";

import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import CanvasLoader from "@/app/components/Loader";
import { SceneShell, type SceneProps } from "@/app/components/canvas/SceneShell";
import { useDevice } from "@/app/providers/DeviceProvider";

const MODEL = "/planet/scene.gltf";

const Earth = () => {
	const earth = useGLTF(MODEL);

	return (
		<primitive object={earth.scene} scale={2.5} position-y={0} rotation-y={0} />
	);
};

const EarthScene = ({ eventSource }: SceneProps) => {
	const { dpr, reducedMotion } = useDevice();

	return (
		<Canvas
			shadows
			eventSource={eventSource}
			// `autoRotate` needs a continuous loop; "demand" would never rotate.
			frameloop={reducedMotion ? "demand" : "always"}
			dpr={dpr}
			gl={{ powerPreference: "high-performance", antialias: true }}
			camera={{
				fov: 45,
				near: 0.1,
				far: 200,
				position: [-4, 3, 6],
			}}
		>
			<Suspense fallback={<CanvasLoader />}>
				<OrbitControls
					autoRotate={!reducedMotion}
					enableZoom={false}
					maxPolarAngle={Math.PI / 2}
					minPolarAngle={Math.PI / 2}
				/>
				<Earth />
				<Preload all />
			</Suspense>
		</Canvas>
	);
};

/** ~2.9 MB of glTF plus 1 MP textures. */
const EarthCanvas = () => (
	<SceneShell
		cost="heavy"
		label="globe model"
		poster="/posters/earth.webp"
		posterAlt="3D render of a stylised globe"
		sizes="(max-width: 1280px) 100vw, 45vw"
	>
		{(eventSource) => <EarthScene eventSource={eventSource} />}
	</SceneShell>
);

export default EarthCanvas;
