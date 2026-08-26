"use client";

import { motion } from "motion/react";
import { useContactForm } from "@/app/hooks/useContactForm";
import { slideIn } from "@/app/utils/motion";
import { Section } from "./layout/Section";
import { ContactForm } from "./contact/ContactForm";
import { ContactSuccess } from "./contact/ContactSuccess";
import { EarthCanvas } from "./canvas";

/**
 * Contact section. Rules, delivery and state live in `lib/contact` and
 * `useContactForm`; the markup is in `contact/`.
 *
 * Form and globe sit side by side from `lg` rather than `xl`, so 1024-1280px
 * does not get a tall single column with most of the width unused.
 */
const Contact = () => {
	const form = useContactForm();

	return (
		<Section id="contact">
			<div className="lg:mt-12 lg:flex-row flex-col-reverse flex gap-10 overflow-hidden">
				<motion.div
					variants={slideIn("left", "tween", 0.2, 1)}
					className="lg:flex-[0.75] bg-black-100 p-8 rounded-2xl"
				>
					<p className="heroSubText">Get in Touch</p>
					<h3 className="heroHeadText">Contact.</h3>

					{form.status === "success" ? (
						<ContactSuccess onReset={form.reset} />
					) : (
						<ContactForm form={form} />
					)}
				</motion.div>

				<motion.div
					variants={slideIn("right", "tween", 0.2, 1)}
					className="lg:flex-1 lg:h-auto md:h-[550px] h-[350px]"
				>
					<EarthCanvas />
				</motion.div>
			</div>
		</Section>
	);
};

export default Contact;
