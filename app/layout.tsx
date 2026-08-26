import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { DeviceProvider } from "@/app/providers/DeviceProvider";
import "@/app/styles/globals.css";

const fontSans = Poppins({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	// Not `--font-sans`: that is Tailwind v4's own key and would self-reference.
	variable: "--font-poppins",
	display: "swap",
	preload: true,
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfoliobyompatel.netlify.app";
const TITLE = "Om Patel | Software Engineer & Full-Stack Developer";
const DESCRIPTION =
	"Portfolio of Om Patel - a software engineer building full-stack web applications with React, Next.js, Node.js and Python, with a focus on UI/UX and 3D web experiences.";

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: {
		default: TITLE,
		template: "%s | Om Patel",
	},
	description: DESCRIPTION,
	applicationName: "Om Patel Portfolio",
	authors: [{ name: "Om Patel", url: "https://github.com/omunite215" }],
	creator: "Om Patel",
	keywords: [
		"Om Patel",
		"software engineer",
		"full-stack developer",
		"Next.js",
		"React",
		"Three.js",
		"UI/UX design",
		"portfolio",
	],
	alternates: { canonical: "/" },
	openGraph: {
		type: "website",
		url: SITE_URL,
		siteName: "Om Patel Portfolio",
		title: TITLE,
		description: DESCRIPTION,
		locale: "en_US",
		images: [
			{
				url: "/og.png",
				width: 1200,
				height: 630,
				alt: "Om Patel - Software Engineer",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: TITLE,
		description: DESCRIPTION,
		images: ["/og.png"],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: { index: true, follow: true, "max-image-preview": "large" },
	},
	icons: {
		icon: "/favicon.ico",
		apple: "/mylogo.png",
	},
};

export const viewport: Viewport = {
	themeColor: "#050816",
	colorScheme: "dark",
	width: "device-width",
	initialScale: 1,
};

/** Person schema so search results can render a rich card. */
const personJsonLd = {
	"@context": "https://schema.org",
	"@type": "Person",
	name: "Om Patel",
	url: SITE_URL,
	jobTitle: "Software Engineer",
	email: "mailto:omunite21@gmail.com",
	image: `${SITE_URL}/mylogo.png`,
	sameAs: [
		"https://github.com/omunite215",
		"https://www.linkedin.com/in/om-patel-ai",
		"https://www.instagram.com/_21omp/",
		"https://www.behance.net/omthecreator",
		"https://dribbble.com/om2121",
	],
	knowsAbout: [
		"React",
		"Next.js",
		"TypeScript",
		"Node.js",
		"Python",
		"Three.js",
		"UI/UX Design",
	],
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				{/* Warm DNS/TLS so the first form submit does not pay for it. */}
				<link rel="preconnect" href="https://api.emailjs.com" crossOrigin="" />
				<script
					type="application/ld+json"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD has no
					// user input and must be inlined as a raw script body.
					dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
				/>
			</head>
			<body className={fontSans.variable}>
				<a href="#about" className="skip-link">
					Skip to content
				</a>
				<DeviceProvider>{children}</DeviceProvider>
			</body>
		</html>
	);
}
