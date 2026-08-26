import type { ReactNode } from "react";

/**
 * Horizontal measure for the whole site. The width ladder lives here only:
 *
 *   < 80rem   fluid, gutter only
 *   xl        84rem  (1344px)
 *   2xl       96rem  (1536px)
 */

export type ContainerWidth =
	/** Follows the ladder above. Default for page sections. */
	| "content"
	/** Pinned at 80rem for measured prose. */
	| "prose"
	/** No cap. */
	| "full";

const WIDTH: Record<ContainerWidth, string> = {
	content: "w-full max-w-(--container-content) xl:max-w-(--container-content-xl) 2xl:max-w-(--container-content-2xl)",
	prose: "w-full max-w-(--container-content)",
	full: "w-full",
};

// A fully polymorphic `as` collapses `children` to `never` under TS's JSX
// inference, so the tags are enumerated.
type ContainerTag = "div" | "section" | "nav" | "header" | "footer" | "main" | "aside";

type Props = {
	children: ReactNode;
	as?: ContainerTag;
	width?: ContainerWidth;
	/** Off when a parent already pads. */
	gutter?: boolean;
	className?: string;
};

export function Container({
	children,
	as: Tag = "div",
	width = "content",
	gutter = true,
	className = "",
}: Props) {
	const classes = [WIDTH[width], "mx-auto", gutter ? "paddingX" : "", className]
		.filter(Boolean)
		.join(" ");

	return <Tag className={classes}>{children}</Tag>;
}

export default Container;
