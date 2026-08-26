import type { MetadataRoute } from "next";

const SITE_URL =
	process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfoliobyompatel.netlify.app";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: SITE_URL,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 1,
		},
	];
}
