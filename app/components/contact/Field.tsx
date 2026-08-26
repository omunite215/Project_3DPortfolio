"use client";

/**
 * A labelled form control and its error message, with the aria-invalid /
 * aria-describedby pairing kept in one place.
 *
 * `suppressHydrationWarning` is deliberate: password managers stamp autofill
 * attributes onto form controls before React hydrates, which otherwise logs a
 * mismatch on every load. The markup itself hydrates clean.
 */

const CONTROL_CLASS =
	"bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium w-full";

type Props = {
	name: string;
	label: string;
	value: string;
	onChange: (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => void;
	placeholder: string;
	error?: string;
	disabled?: boolean;
	type?: "text" | "email";
	autoComplete?: string;
	/** Renders a textarea instead of an input. */
	rows?: number;
};

export function Field({
	name,
	label,
	value,
	onChange,
	placeholder,
	error,
	disabled = false,
	type = "text",
	autoComplete,
	rows,
}: Props) {
	const errorId = `err-${name}`;
	const shared = {
		name,
		value,
		onChange,
		placeholder,
		disabled,
		"aria-invalid": Boolean(error),
		"aria-describedby": error ? errorId : undefined,
		className: CONTROL_CLASS,
		suppressHydrationWarning: true,
	} as const;

	return (
		<label className="flex flex-col" suppressHydrationWarning>
			<span className="text-white font-medium mb-4">{label}</span>

			{rows ? (
				<textarea rows={rows} {...shared} />
			) : (
				<input type={type} autoComplete={autoComplete} {...shared} />
			)}

			{error && (
				<span id={errorId} className="mt-2 text-[13px] text-[#ff8095]">
					{error}
				</span>
			)}
		</label>
	);
}

export default Field;
