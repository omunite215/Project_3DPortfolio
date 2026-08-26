"use client";

import { motion } from "motion/react";
import { testimonials } from "@/app/constants";
import { textVariant } from "@/app/utils/motion";
import { SocialCard } from "./feedbacks/SocialCard";
import { Section } from "./layout/Section";

const Feedbacks = () => (
	<Section id="social">
		<div className="mt-12 bg-black-100 rounded-[20px]">
			<div className="padding bg-tertiary rounded-2xl min-h-[300px]">
				<motion.div variants={textVariant()}>
					<h2 className="sectionHeadText">Social Profiles</h2>
					<p className="sectionSubText">
						Click on social media icons to check out..
					</p>
				</motion.div>
			</div>
			<div className="paddingX -mt-20 pb-14 flex flex-wrap gap-7">
				{testimonials.map((testimonial, index) => (
					<SocialCard key={testimonial.id} profile={testimonial} index={index} />
				))}
			</div>
		</div>
	</Section>
);

export default Feedbacks;
