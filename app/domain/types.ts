/** Shared shapes for the content in `app/constants` and the components that render it. */

/** Where a project is deployed; picks the badge on the card. */
export type Platform = "Netlify" | "Vercel" | "Figma" | "Wordpress" | "Web";

export type Tag = {
	name: string;
	/** Text-gradient utility class, e.g. `blue-text-gradient`. */
	color: string;
};

export type Project = {
	name: string;
	description: string;
	tags: Tag[];
	image: string;
	/** Absent for closed-source client work. */
	source_code_link?: string;
	deploy_link: string;
	platform: Platform;
};

export type Service = {
	title: string;
	icon: string;
};

export type Technology = {
	name: string;
	icon: string;
};

export type Experience = {
	title: string;
	company_name: string;
	icon: string;
	iconBg: string;
	date: string;
	points: string[];
};

export type SocialProfile = {
	id: number;
	testimonial: string;
	name: string;
	image: string;
	link: string;
};

export type NavLink = {
	id: string;
	title: string;
};

/** What the contact form sends. */
export type ContactMessage = {
	name: string;
	email: string;
	message: string;
};
