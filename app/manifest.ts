import type { MetadataRoute } from "next";

/** Installable web-app manifest, so the portfolio can be pinned on mobile. */
export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "Om Patel | Software Engineer",
		short_name: "Om Patel",
		description:
			"Portfolio of Om Patel - software engineer and full-stack developer.",
		start_url: "/",
		display: "standalone",
		background_color: "#050816",
		theme_color: "#050816",
		orientation: "portrait-primary",
		icons: [
			{
				src: "/mylogo.png",
				sizes: "512x512",
				type: "image/png",
				purpose: "any",
			},
		],
	};
}
