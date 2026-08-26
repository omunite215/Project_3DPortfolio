import type { Platform } from "@/app/domain/types";

/**
 * Platform badge lookup. `Record<Platform, string>` keeps it exhaustive, so a
 * missing platform is a compile error rather than a wrong icon.
 */
export const PLATFORM_ICON: Record<Platform, string> = {
	Netlify: "/tech/netlify.webp",
	Vercel: "/tech/vercel.svg",
	Wordpress: "/tech/wordpress.webp",
	Figma: "/tech/figma.webp",
	Web: "/web.webp",
};

export function platformIcon(platform: Platform): string {
	return PLATFORM_ICON[platform];
}
