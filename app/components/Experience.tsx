"use client";

import { motion } from "motion/react";
import { VerticalTimeline } from "react-vertical-timeline-component";
import { experiences } from "@/app/constants";
import { textVariant } from "@/app/utils/motion";
import { ExperienceItem } from "./experience/ExperienceItem";
import { Section } from "./layout/Section";
import "react-vertical-timeline-component/style.min.css";

const Experience = () => (
	<Section id="work">
		<motion.div variants={textVariant()}>
			<p className="sectionSubText text-center">What I have done so far</p>
			<h2 className="sectionHeadText text-center">Work Experience.</h2>
		</motion.div>

		<div className="mt-20 flex flex-col">
			<VerticalTimeline>
				{experiences.map((experience) => (
					<ExperienceItem
						key={`${experience.company_name}-${experience.date}`}
						experience={experience}
					/>
				))}
			</VerticalTimeline>
		</div>
	</Section>
);

export default Experience;
