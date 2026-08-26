"use client";

import { motion } from "motion/react";
import { projects } from "@/app/constants";
import { fadeIn, textVariant } from "@/app/utils/motion";
import { Section } from "./layout/Section";
import { ProjectCard } from "./works/ProjectCard";

const Works = () => (
	<Section id="projects">
		<motion.div variants={textVariant()}>
			<p className="sectionSubText">My work</p>
			<h2 className="sectionHeadText">Projects.</h2>
		</motion.div>

		<div className="w-full flex">
			<motion.p
				variants={fadeIn("", "", 0.1, 1)}
				className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
			>
				Following projects showcases my skills and experience through real-world
				examples of my work. Each project is briefly described with links to code
				repositories and live demos in it. It reflects my ability to solve complex
				problems, work with different technologies, and manage projects
				effectively.
			</motion.p>
		</div>

		<div className="mt-20 flex flex-wrap gap-7">
			{projects.map((project, index) => (
				<ProjectCard key={project.name} project={project} index={index} />
			))}
		</div>
	</Section>
);

export default Works;
