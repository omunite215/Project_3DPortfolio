"use client";

import { Decal, Float, OrbitControls, Preload, useTexture } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import CanvasLoader from "@/app/components/Loader";
import { SceneShell, type SceneProps } from "@/app/components/canvas/SceneShell";
import { useDevice } from "@/app/providers/DeviceProvider";

const Ball = ({ imgUrl }: { imgUrl: string }) => {
	const [decal] = useTexture([imgUrl]);

	return (
		<Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
			<ambientLight intensity={0.25} />
			<directionalLight position={[0, 0, 0.05]} />
			<mesh castShadow receiveShadow scale={2.75}>
				<icosahedronGeometry args={[1, 1]} />
				<meshStandardMaterial
					color="#fff8eb"
					polygonOffset
					polygonOffsetFactor={-5}
					flatShading
				/>
				<Decal
					position={[0, 0, 1]}
					rotation={[2 * Math.PI, 0, 6.25]}
					scale={1}
					map={decal}
				/>
			</mesh>
		</Float>
	);
};

const BallScene = ({ icon, eventSource }: SceneProps & { icon: string }) => {
	const { dpr } = useDevice();

	return (
		<Canvas
			// "demand": thirteen always-on loops pin the GPU for an effect that only
			// shows on drag. Pointer interaction still invalidates and redraws.
			frameloop="demand"
			dpr={dpr}
			eventSource={eventSource}
			gl={{ antialias: true }}
		>
			<Suspense fallback={<CanvasLoader />}>
				<OrbitControls enableZoom={false} />
				<Ball imgUrl={icon} />
				<Preload all />
			</Suspense>
		</Canvas>
	);
};

/** "/tech/react.webp" -> "/posters/tech/react.webp" */
function posterFor(icon: string) {
	const file = icon.split("/").pop() ?? "";
	const base = file.replace(/\.(webp|svg|png|jpe?g)$/i, "");
	return `/posters/tech/${base}.webp`;
}

/**
 * One ball per technology. Thirteen render side by side and each needs its own
 * WebGL context, so they are gated to the full tier; everyone else gets stills.
 */
const BallCanvas = ({ icon, name }: { icon: string; name?: string }) => (
	<SceneShell
		cost="heavy"
		quiet
		label="technology badge"
		poster={posterFor(icon)}
		posterAlt={name ? `${name} logo` : "Technology logo"}
		sizes="112px"
	>
		{(eventSource) => <BallScene icon={icon} eventSource={eventSource} />}
	</SceneShell>
);

export default BallCanvas;
