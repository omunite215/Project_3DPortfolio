"use client";

import { Html, useProgress } from "@react-three/drei";

/** In-canvas loading indicator, with a determinate ring and asset counter. */
const CanvasLoader = () => {
	const { progress, loaded, total } = useProgress();

	const pct = Number.isFinite(progress) ? progress : 0;
	const circumference = 2 * Math.PI * 26;
	const dash = (pct / 100) * circumference;

	return (
		<Html
			as="div"
			center
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
				pointerEvents: "none",
			}}
		>
			<div
				className="flex flex-col items-center gap-3"
				role="status"
				aria-live="polite"
				aria-label={`Loading 3D scene, ${pct.toFixed(0)} percent`}
			>
				<div className="relative w-[60px] h-[60px]">
					<svg
						width="60"
						height="60"
						viewBox="0 0 60 60"
						aria-hidden="true"
						focusable="false"
						style={{ transform: "rotate(-90deg)" }}
					>
						<circle
							cx="30"
							cy="30"
							r="26"
							fill="none"
							stroke="rgba(145,94,255,0.22)"
							strokeWidth="3"
						/>
						<circle
							cx="30"
							cy="30"
							r="26"
							fill="none"
							stroke="#915EFF"
							strokeWidth="3"
							strokeLinecap="round"
							strokeDasharray={`${dash} ${circumference}`}
							style={{ transition: "stroke-dasharray 180ms linear" }}
						/>
					</svg>
					<span
						style={{
							position: "absolute",
							inset: 0,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							fontSize: 13,
							fontWeight: 700,
							color: "#F1F1F1",
							fontVariantNumeric: "tabular-nums",
						}}
					>
						{pct.toFixed(0)}%
					</span>
				</div>

				{total > 0 && (
					<span style={{ fontSize: 11, color: "#aaa6c3", letterSpacing: 0.3 }}>
						{loaded} / {total} assets
					</span>
				)}
			</div>
		</Html>
	);
};

export default CanvasLoader;
