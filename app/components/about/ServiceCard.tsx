"use client";

import { motion } from "motion/react";
import Image from "next/image";
import type { Service } from "@/app/domain/types";
import { fadeIn } from "@/app/utils/motion";
import { Tilt } from "@/app/components/Tilt";

/** One service card. `index` drives the stagger delay. */
export function ServiceCard({
	service,
	index,
}: {
	service: Service;
	index: number;
}) {
	return (
		<Tilt
			options={{ max: 45, scale: 1, speed: 450 }}
			className="xs:w-[250px] w-full"
		>
			<motion.div
				variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
				className="w-full green-pink-gradient p-px rounded-[20px] shadow-card"
			>
				<div className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col">
					<Image
						src={service.icon}
						width={64}
						height={64}
						alt=""
						aria-hidden="true"
						className="w-16 h-16 object-contain"
					/>
					<h3 className="text-white text-[20px] font-bold text-center">
						{service.title}
					</h3>
				</div>
			</motion.div>
		</Tilt>
	);
}

export default ServiceCard;
