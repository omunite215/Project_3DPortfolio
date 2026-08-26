/**
 * Inline SVG illustrations for empty, error and fallback states.
 *
 * Inline rather than files in /public so they add zero network requests and
 * inherit the palette directly. All of them are decorative: the surrounding
 * component always carries the real text, so each root is aria-hidden.
 */

const VIOLET = "#915EFF";
const VIOLET_DIM = "#5b3aa6";
const MUTED = "#aaa6c3";
const SURFACE = "#151030";

type IllustrationProps = {
	className?: string;
	size?: number;
};

function Frame({
	children,
	className,
	size = 120,
	viewBox = "0 0 120 120",
}: IllustrationProps & { children: React.ReactNode; viewBox?: string }) {
	return (
		<svg
			width={size}
			height={size}
			viewBox={viewBox}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
			focusable="false"
			className={className}
		>
			{children}
		</svg>
	);
}

/** A wireframe cube that never rendered - used when WebGL is missing. */
export function NoWebGLIllustration(props: IllustrationProps) {
	return (
		<Frame {...props}>
			<circle cx="60" cy="60" r="44" fill={SURFACE} />
			<circle
				cx="60"
				cy="60"
				r="44"
				stroke={VIOLET_DIM}
				strokeWidth="1.5"
				strokeDasharray="4 5"
				opacity="0.7"
			/>
			<path
				d="M60 32 L84 45 V72 L60 85 L36 72 V45 Z"
				stroke={VIOLET}
				strokeWidth="2"
				strokeLinejoin="round"
				opacity="0.85"
			/>
			<path
				d="M36 45 L60 58 L84 45 M60 58 V85"
				stroke={MUTED}
				strokeWidth="1.5"
				strokeLinejoin="round"
				opacity="0.55"
			/>
			<path
				d="M30 90 L90 30"
				stroke={VIOLET}
				strokeWidth="3"
				strokeLinecap="round"
			/>
		</Frame>
	);
}

/** A cube coming apart - used when a scene throws at runtime. */
export function SceneErrorIllustration(props: IllustrationProps) {
	return (
		<Frame {...props}>
			<circle cx="60" cy="60" r="44" fill={SURFACE} />
			<path
				d="M58 30 L80 42 L58 54 L36 42 Z"
				stroke={VIOLET}
				strokeWidth="2"
				strokeLinejoin="round"
			/>
			<path
				d="M34 52 L54 63 V86 L34 75 Z"
				stroke={MUTED}
				strokeWidth="1.8"
				strokeLinejoin="round"
				opacity="0.7"
			/>
			<path
				d="M86 50 L66 62 V85 L86 73 Z"
				stroke={MUTED}
				strokeWidth="1.8"
				strokeLinejoin="round"
				opacity="0.7"
			/>
			<circle cx="94" cy="34" r="3" fill={VIOLET} opacity="0.9" />
			<circle cx="26" cy="40" r="2" fill={VIOLET} opacity="0.6" />
			<circle cx="88" cy="92" r="2.5" fill={VIOLET} opacity="0.5" />
		</Frame>
	);
}

/** Signal bars with a slash - data-saver / offline. */
export function LowBandwidthIllustration(props: IllustrationProps) {
	return (
		<Frame {...props}>
			<circle cx="60" cy="60" r="44" fill={SURFACE} />
			<rect x="36" y="70" width="8" height="14" rx="2" fill={MUTED} opacity="0.5" />
			<rect x="50" y="61" width="8" height="23" rx="2" fill={MUTED} opacity="0.4" />
			<rect x="64" y="52" width="8" height="32" rx="2" fill={VIOLET} opacity="0.35" />
			<rect x="78" y="43" width="8" height="41" rx="2" fill={VIOLET} opacity="0.25" />
			<path
				d="M32 88 L90 34"
				stroke={VIOLET}
				strokeWidth="3"
				strokeLinecap="round"
			/>
		</Frame>
	);
}

/** Paper plane - contact form success. */
export function MessageSentIllustration(props: IllustrationProps) {
	return (
		<Frame {...props} size={props.size ?? 96}>
			<circle cx="60" cy="60" r="44" fill={SURFACE} />
			<path
				d="M30 60 L92 34 L74 90 L58 70 Z"
				stroke={VIOLET}
				strokeWidth="2.2"
				strokeLinejoin="round"
				fill={VIOLET}
				fillOpacity="0.12"
			/>
			<path
				d="M58 70 L92 34"
				stroke={MUTED}
				strokeWidth="1.6"
				strokeLinecap="round"
				opacity="0.8"
			/>
			<path
				d="M58 70 L54 84"
				stroke={VIOLET}
				strokeWidth="2"
				strokeLinecap="round"
			/>
		</Frame>
	);
}

/** Envelope with an alert dot - contact form failure. */
export function MessageFailedIllustration(props: IllustrationProps) {
	return (
		<Frame {...props} size={props.size ?? 96}>
			<circle cx="60" cy="60" r="44" fill={SURFACE} />
			<rect
				x="30"
				y="42"
				width="60"
				height="40"
				rx="5"
				stroke={MUTED}
				strokeWidth="2"
				opacity="0.75"
			/>
			<path
				d="M30 47 L60 66 L90 47"
				stroke={MUTED}
				strokeWidth="2"
				strokeLinejoin="round"
				opacity="0.75"
			/>
			<circle cx="88" cy="40" r="12" fill={SURFACE} />
			<circle cx="88" cy="40" r="10" stroke={VIOLET} strokeWidth="2" />
			<path
				d="M88 35 V41"
				stroke={VIOLET}
				strokeWidth="2.4"
				strokeLinecap="round"
			/>
			<circle cx="88" cy="45" r="1.4" fill={VIOLET} />
		</Frame>
	);
}

/** Drifting cube - 404. */
export function NotFoundIllustration(props: IllustrationProps) {
	return (
		<Frame {...props} size={props.size ?? 180}>
			<circle cx="60" cy="60" r="46" fill={SURFACE} opacity="0.6" />
			<circle
				cx="60"
				cy="60"
				r="46"
				stroke={VIOLET_DIM}
				strokeWidth="1"
				strokeDasharray="3 6"
			/>
			<path
				d="M60 26 L88 42 V74 L60 90 L32 74 V42 Z"
				stroke={VIOLET}
				strokeWidth="2"
				strokeLinejoin="round"
				fill={VIOLET}
				fillOpacity="0.06"
			/>
			<path
				d="M32 42 L60 58 L88 42 M60 58 V90"
				stroke={MUTED}
				strokeWidth="1.4"
				opacity="0.5"
			/>
			<circle cx="18" cy="28" r="1.6" fill={MUTED} opacity="0.7" />
			<circle cx="104" cy="36" r="2" fill={MUTED} opacity="0.5" />
			<circle cx="96" cy="98" r="1.5" fill={VIOLET} opacity="0.7" />
			<circle cx="22" cy="96" r="2.2" fill={VIOLET} opacity="0.4" />
		</Frame>
	);
}

/** Generic "this section broke" glyph for the route-level error boundary. */
export function AppErrorIllustration(props: IllustrationProps) {
	return (
		<Frame {...props} size={props.size ?? 160}>
			<circle cx="60" cy="60" r="46" fill={SURFACE} opacity="0.7" />
			<path
				d="M60 32 L88 82 H32 Z"
				stroke={VIOLET}
				strokeWidth="2.4"
				strokeLinejoin="round"
				fill={VIOLET}
				fillOpacity="0.08"
			/>
			<path
				d="M60 50 V64"
				stroke={VIOLET}
				strokeWidth="3"
				strokeLinecap="round"
			/>
			<circle cx="60" cy="72" r="2.2" fill={VIOLET} />
		</Frame>
	);
}
