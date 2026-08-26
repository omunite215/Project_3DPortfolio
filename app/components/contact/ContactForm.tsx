"use client";

import { OWNER_EMAIL } from "@/app/lib/contact/transport";
import type { UseContactForm } from "@/app/hooks/useContactForm";
import { MessageFailedIllustration } from "@/app/components/state/Illustrations";
import { Field } from "./Field";

/** The form. All state arrives from `useContactForm`. */

export function ContactForm({ form }: { form: UseContactForm }) {
	const {
		values,
		errors,
		status,
		failureMessage,
		sending,
		formRef,
		honeypot,
		setHoneypot,
		handleChange,
		handleSubmit,
	} = form;

	return (
		<form
			ref={formRef}
			onSubmit={handleSubmit}
			noValidate
			suppressHydrationWarning
			className="mt-12 flex flex-col gap-8"
		>
			<Field
				name="name"
				label="Your Name."
				value={values.name}
				onChange={handleChange}
				placeholder="What's your name?"
				autoComplete="name"
				error={errors.name}
				disabled={sending}
			/>

			<Field
				name="email"
				type="email"
				label="Your Email."
				value={values.email}
				onChange={handleChange}
				placeholder="What's your email?"
				autoComplete="email"
				error={errors.email}
				disabled={sending}
			/>

			<Field
				name="message"
				label="Your Message."
				value={values.message}
				onChange={handleChange}
				placeholder="What do you want to say?"
				rows={7}
				error={errors.message}
				disabled={sending}
			/>

			{/* Honeypot: off-screen, not announced, no tab stop. */}
			<input
				type="text"
				name="company_website"
				suppressHydrationWarning
				value={honeypot}
				onChange={(event) => setHoneypot(event.target.value)}
				tabIndex={-1}
				autoComplete="off"
				aria-hidden="true"
				className="absolute w-px h-px -left-[9999px] opacity-0"
			/>

			<button
				type="submit"
				disabled={sending}
				className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl disabled:opacity-60 disabled:cursor-not-allowed"
			>
				{sending ? "Sending..." : "Send"}
			</button>

			{status === "error" && (
				<div
					className="flex items-start gap-4 rounded-xl border border-[#ff8095]/30 bg-[#ff8095]/10 p-4"
					role="alert"
				>
					<MessageFailedIllustration size={56} />
					<div>
						<p className="text-white font-semibold text-[15px]">
							Couldn&apos;t send that
						</p>
						<p className="text-secondary text-[13px] mt-1 leading-relaxed">
							{failureMessage} You can also email me directly at{" "}
							<a
								href={`mailto:${OWNER_EMAIL}`}
								className="text-[#915EFF] underline"
							>
								{OWNER_EMAIL}
							</a>
							.
						</p>
					</div>
				</div>
			)}
		</form>
	);
}

export default ContactForm;
