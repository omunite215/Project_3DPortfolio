"use client";

import Image from "next/image";
import Link from "next/link";

/** Logo and wordmark, as one anchor back to the top. */
export function Brand({ onNavigateHome }: { onNavigateHome?: () => void }) {
	return (
		<Link
			href="/"
			onClick={onNavigateHome}
			className="flex items-center gap-2"
			aria-label="Om Patel - back to top"
		>
			<Image
				src="/logo.png"
				width={80}
				height={80}
				alt=""
				aria-hidden="true"
				priority
				className="w-[80px] h-[80px] object-contain"
			/>
			<p className="text-white text-[18px] font-bold cursor-pointer flex">
				Om &nbsp; <span className="sm:block hidden">| omunite215</span>
			</p>
		</Link>
	);
}

export default Brand;
