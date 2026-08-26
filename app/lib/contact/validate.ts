import type { ContactMessage } from "@/app/domain/types";

/** Contact form rules. Pure - no React, no transport. */

export type FieldErrors = Partial<Record<keyof ContactMessage, string>>;

/** Also the focus order for the first invalid field. */
export const FIELD_ORDER = ["name", "email", "message"] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const MIN_NAME = 2;
const MIN_MESSAGE = 10;

export function validateContact(message: ContactMessage): FieldErrors {
	const errors: FieldErrors = {};
	const name = message.name.trim();
	const email = message.email.trim();
	const body = message.message.trim();

	if (!name) errors.name = "Please tell me your name.";
	else if (name.length < MIN_NAME) errors.name = "That looks a bit short.";

	if (!email) errors.email = "I'll need an email to reply to.";
	else if (!EMAIL_RE.test(email))
		errors.email = "That doesn't look like a valid email address.";

	if (!body) errors.message = "Your message is empty.";
	else if (body.length < MIN_MESSAGE)
		errors.message = "A little more detail would help.";

	return errors;
}

export function firstInvalidField(errors: FieldErrors) {
	return FIELD_ORDER.find((field) => errors[field]);
}

export function hasErrors(errors: FieldErrors) {
	return Object.keys(errors).length > 0;
}
