"use client";

import { useEffect } from "react";
import { AppErrorIllustration } from "@/app/components/state/Illustrations";

/**
 * Route-level error boundary. Catches anything the per-canvas boundaries did
 * not, so a failure still lands on a branded page rather than the framework's
 * default error screen.
 */
export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error("[route] unhandled error:", error);
	}, [error]);

	return (
		<main className="min-h-screen bg-primary flex items-center justify-center paddingX">
			<div className="flex flex-col items-center text-center max-w-md gap-5">
				<AppErrorIllustration size={150} />
				<h1 className="sectionHeadText !text-[40px]">Something broke.</h1>
				<p className="text-secondary text-[15px] leading-relaxed">
					An unexpected error stopped this page from rendering. Trying again
					usually clears it.
				</p>

				{error.digest && (
					<code className="text-[11px] text-secondary/70 font-mono">
						ref: {error.digest}
					</code>
				)}

				<div className="flex flex-wrap gap-3 justify-center mt-2">
					<button
						type="button"
						onClick={reset}
						className="bg-[#915EFF] py-3 px-8 text-white font-bold rounded-xl transition hover:bg-purple-600"
					>
						Try again
					</button>
					<a
						href="/"
						className="bg-tertiary py-3 px-8 text-white font-bold rounded-xl transition hover:bg-black-100"
					>
						Back home
					</a>
				</div>
			</div>
		</main>
	);
}
