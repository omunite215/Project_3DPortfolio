"use client";

import { MessageSentIllustration } from "@/app/components/state/Illustrations";

/** Post-send confirmation. Purely presentational. */
export function ContactSuccess({ onReset }: { onReset: () => void }) {
	return (
		<div
			className="mt-12 flex flex-col items-center text-center gap-4 py-6"
			role="status"
			aria-live="polite"
		>
			<MessageSentIllustration size={104} />
			<h4 className="text-white font-bold text-[20px]">Message sent</h4>
			<p className="text-secondary text-[15px] max-w-sm leading-relaxed">
				A humble thanks for reaching out. I&apos;ll respond as soon as I can.
			</p>
			<button
				type="button"
				onClick={onReset}
				className="mt-2 bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl"
			>
				Send another
			</button>
		</div>
	);
}

export default ContactSuccess;
