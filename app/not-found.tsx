import type { Metadata } from "next";
import Link from "next/link";
import { NotFoundIllustration } from "@/app/components/state/Illustrations";

export const metadata: Metadata = {
	title: "Page not found",
	robots: { index: false, follow: false },
};

export default function NotFound() {
	return (
		<main className="min-h-screen bg-primary flex items-center justify-center paddingX">
			<div className="flex flex-col items-center text-center max-w-md gap-5">
				<NotFoundIllustration size={190} />
				<p className="sectionSubText">Error 404</p>
				<h1 className="sectionHeadText !text-[44px]">Nothing here.</h1>
				<p className="text-secondary text-[15px] leading-relaxed">
					That page drifted off. The portfolio lives on one page - head back and
					scroll.
				</p>
				<Link
					href="/"
					className="mt-2 bg-[#915EFF] py-3 px-8 text-white font-bold rounded-xl transition hover:bg-purple-600"
				>
					Back home
				</Link>
			</div>
		</main>
	);
}
