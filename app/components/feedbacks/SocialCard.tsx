"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import type { SocialProfile } from "@/app/domain/types";
import { fadeIn } from "@/app/utils/motion";

/** One social-profile card. */
export function SocialCard({
	profile,
	index,
}: {
	profile: SocialProfile;
	index: number;
}) {
	const { testimonial, name, link, image } = profile;

	return (
		<motion.div
			variants={fadeIn("", "spring", index * 0.5, 0.75)}
			className="bg-black-200 p-10 rounded-3xl xs:w-[320px] w-full"
		>
			<p className="text-white font-black text-[48px]" aria-hidden="true">
				&quot;
			</p>

			<div className="mt-1">
				<p className="text-white tracking-wider text-[18px]">{testimonial}</p>
				<div className="mt-7 flex justify-between items-center gap-1">
					<div className="flex-1 flex flex-col">
						<p className="text-white font-medium text-[16px]">
							<span className="blue-text-gradient">@</span>
							{name}
						</p>
					</div>
					<Link
						href={link}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={`Open ${name}'s profile (opens in a new tab)`}
					>
						<Image
							src={image}
							width={40}
							height={40}
							alt=""
							aria-hidden="true"
							loading="lazy"
							className="w-10 h-10 rounded-full object-cover"
						/>
					</Link>
				</div>
			</div>
		</motion.div>
	);
}

export default SocialCard;
