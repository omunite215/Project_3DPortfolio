"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/app/domain/types";
import { fadeIn } from "@/app/utils/motion";
import { Tilt } from "@/app/components/Tilt";
import { Skeleton } from "@/app/components/state/Skeletons";
import { platformIcon } from "./platformIcon";

type ImageState = "loading" | "ready" | "error";

/** One project card. */
export function ProjectCard({
	project,
	index,
}: {
	project: Project;
	index: number;
}) {
	// Largest images on the page; shimmer until decoded so the card never flashes.
	const [imageState, setImageState] = useState<ImageState>("loading");

	const { name, description, tags, image, source_code_link, deploy_link, platform } =
		project;

	return (
		<motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
			<Tilt
				options={{ max: 45, scale: 1, speed: 450 }}
				className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full"
			>
				<div className="relative w-full h-[230px]">
					{imageState !== "ready" && (
						<Skeleton className="absolute inset-0 w-full h-full !rounded-2xl" />
					)}

					{imageState === "error" ? (
						<div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-2xl bg-black-100 text-center px-4">
							<span className="text-secondary text-[12px]">
								Preview unavailable
							</span>
						</div>
					) : (
						<Image
							src={image}
							width={720}
							height={460}
							alt={`${name} screenshot`}
							sizes="(max-width: 40rem) 100vw, 360px"
							loading="lazy"
							onLoad={() => setImageState("ready")}
							onError={() => setImageState("error")}
							className={`w-full h-full object-cover rounded-2xl transition-opacity duration-500 ${
								imageState === "ready" ? "opacity-100" : "opacity-0"
							}`}
						/>
					)}

					<div className="absolute inset-0 flex justify-end m-3 card-img_hover">
						{source_code_link && (
							<Link
								href={source_code_link}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={`${name} source code on GitHub`}
								className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
							>
								<Image
									src="/tech/github.webp"
									width={24}
									height={24}
									alt=""
									aria-hidden="true"
									className="object-contain"
								/>
							</Link>
						)}
						<Link
							href={deploy_link}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={`Open ${name} live site`}
							className="black-gradient w-10 h-10 ml-2 rounded-full flex justify-center items-center cursor-pointer"
						>
							<Image
								src={platformIcon(platform)}
								width={24}
								height={24}
								alt=""
								aria-hidden="true"
								className="object-contain"
							/>
						</Link>
					</div>
				</div>

				<div className="mt-5">
					<h3 className="text-white font-bold text-[24px]">{name}</h3>
					<p className="mt-2 text-secondary text-[14px]">{description}</p>
				</div>

				<div className="mt-4 flex flex-wrap gap-2">
					{tags.map((tag) => (
						<p key={`${name}-${tag.name}`} className={`text-[14px] ${tag.color}`}>
							#{tag.name}
						</p>
					))}
				</div>
			</Tilt>
		</motion.div>
	);
}

export default ProjectCard;
