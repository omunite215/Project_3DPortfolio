"use client";

import { type RefObject, useCallback, useRef, useState } from "react";
import type { ContactMessage } from "@/app/domain/types";
import {
	type FieldErrors,
	firstInvalidField,
	hasErrors,
	validateContact,
} from "@/app/lib/contact/validate";
import {
	type MessageTransport,
	emailJsTransport,
} from "@/app/lib/contact/transport";

/**
 * Contact form state machine. Rules live in `lib/contact/validate`, delivery
 * behind `MessageTransport` - injected, so it can be swapped or stubbed.
 */

export type ContactStatus = "idle" | "sending" | "success" | "error";

const EMPTY: ContactMessage = { name: "", email: "", message: "" };

export type UseContactForm = {
	values: ContactMessage;
	errors: FieldErrors;
	status: ContactStatus;
	failureMessage: string;
	sending: boolean;
	formRef: RefObject<HTMLFormElement | null>;
	honeypot: string;
	setHoneypot: (value: string) => void;
	handleChange: (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => void;
	handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
	reset: () => void;
};

export function useContactForm(
	transport: MessageTransport = emailJsTransport,
): UseContactForm {
	const formRef = useRef<HTMLFormElement>(null);

	const [values, setValues] = useState<ContactMessage>(EMPTY);
	const [errors, setErrors] = useState<FieldErrors>({});
	const [status, setStatus] = useState<ContactStatus>("idle");
	const [failureMessage, setFailureMessage] = useState("");
	// Bots fill hidden inputs; humans cannot see this one.
	const [honeypot, setHoneypot] = useState("");

	const handleChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			const { name, value } = event.target;
			setValues((prev) => ({ ...prev, [name]: value }));
			// Clear the error as soon as they start correcting it.
			setErrors((prev) =>
				prev[name as keyof ContactMessage]
					? { ...prev, [name]: undefined }
					: prev,
			);
			setStatus((prev) => (prev === "error" ? "idle" : prev));
		},
		[],
	);

	const focusField = useCallback((field: keyof ContactMessage) => {
		formRef.current
			?.querySelector<HTMLElement>(`[name="${field}"]`)
			?.focus();
	}, []);

	const deliver = useCallback(
		async (message: ContactMessage) => {
			setStatus("sending");
			setFailureMessage("");

			try {
				await transport.send(message);
				setStatus("success");
				setValues(EMPTY);
			} catch (error: unknown) {
				console.error("[contact] send failed:", error);
				setStatus("error");
				setFailureMessage(
					error instanceof Error
						? error.message
						: "The message could not be delivered.",
				);
			}
		},
		[transport],
	);

	const handleSubmit = useCallback(
		(event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();

			if (honeypot) return; // silently drop bots

			const found = validateContact(values);
			if (hasErrors(found)) {
				setErrors(found);
				setStatus("idle");
				// Focus the first problem so keyboard and SR users know what failed.
				const first = firstInvalidField(found);
				if (first) focusField(first);
				return;
			}

			// Submit handlers stay synchronous; `deliver` owns the rejection path.
			void deliver(values);
		},
		[honeypot, values, deliver, focusField],
	);

	const reset = useCallback(() => {
		setStatus("idle");
		setErrors({});
		setFailureMessage("");
	}, []);

	return {
		values,
		errors,
		status,
		failureMessage,
		sending: status === "sending",
		formRef,
		honeypot,
		setHoneypot,
		handleChange,
		handleSubmit,
		reset,
	};
}
