import emailjs from "@emailjs/browser";
import type { ContactMessage } from "@/app/domain/types";

/**
 * Message delivery behind an interface, so the form is not bound to EmailJS.
 * Moving to a Route Handler later means adding an implementation here.
 */

export type MessageTransport = {
	/** Resolves on delivery, rejects with a readable Error otherwise. */
	send(message: ContactMessage): Promise<void>;
};

// EmailJS ids are public by design; they ship in the client bundle regardless.
// Read from env so a fork can redirect them, with fallbacks so it works bare.
const SERVICE_ID =
	process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "service_91ssn8g";
const TEMPLATE_ID =
	process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "template_jjegxdr";
const PUBLIC_KEY =
	process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "VeFeVdEHL9F9_i6xp";

export const OWNER_NAME = "Om Patel";
export const OWNER_EMAIL = "omunite21@gmail.com";

export const emailJsTransport: MessageTransport = {
	async send(message) {
		await emailjs.send(
			SERVICE_ID,
			TEMPLATE_ID,
			{
				from_name: message.name,
				to_name: OWNER_NAME,
				from_email: message.email,
				to_email: OWNER_EMAIL,
				message: message.message,
			},
			PUBLIC_KEY,
		);
	},
};
