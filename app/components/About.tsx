"use client";

import { motion } from "motion/react";
import { services } from "@/app/constants";
import { fadeIn, textVariant } from "@/app/utils/motion";
import { ServiceCard } from "./about/ServiceCard";
import { Section } from "./layout/Section";

const About = () => (
	<Section id="about">
		<motion.div variants={textVariant()}>
			<p className="sectionSubText">Introduction</p>
			<h2 className="sectionHeadText">Overview.</h2>
		</motion.div>

		{/* Intentionally unconstrained: this paragraph runs the full measure. */}
		<motion.p
			variants={fadeIn("", "", 0.1, 1)}
			className="mt-4 text-secondary text-[17px] leading-[30px]"
		>
			Dynamic Full-Stack Developer with a passion for crafting innovative web
			applications. Proven expertise in React, Next.js, Node.js, and Python.
			Skilled in UI/UX design and DevOps (Docker). Proven ability to deliver
			high-quality, scalable solutions, as demonstrated by a strong portfolio of
			full-stack Next.js projects and modern UI/UX designs. Eager to leverage my
			technical prowess and problem-solving abilities to contribute to
			cutting-edge projects and drive innovation.
		</motion.p>

		<div className="mt-20 flex flex-wrap gap-10">
			{services.map((service, index) => (
				<ServiceCard key={service.title} service={service} index={index} />
			))}
		</div>
	</Section>
);

export default About;
