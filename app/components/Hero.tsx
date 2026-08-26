"use client";

import { motion } from "motion/react";
import { useDevice } from "@/app/providers/DeviceProvider";
import { Container } from "./layout/Container";
import { ComputersCanvas } from "./canvas";

const Hero = () => {
	const { reducedMotion } = useDevice();

	return (
		<section id="hero" className="relative w-full h-screen mx-auto">
			{/* This overlay covers the canvas, so it takes the pointer events the
			    model's OrbitControls would otherwise get. Add `pointer-events-none`
			    here to make the model draggable. */}
			<Container className="absolute inset-0 top-[120px] flex flex-row items-start gap-5">
				<div className="flex flex-col justify-center items-center mt-5">
					<div className="w-5 h-5 rounded-full bg-[#915EFF]" />
					<div className="w-1 sm:h-80 h-40 violet-gradient" />
				</div>
				<div>
					<h1 className="heroHeadText text-white">
						Hi, I&apos;m <span className="text-[#915EFF]">Om</span>
					</h1>
					<p className="heroSubText">A Software Engineer</p>
				</div>
			</Container>

			<ComputersCanvas />

			<div className="absolute xs:bottom-2 bottom-32 w-full flex justify-center items-center">
				<a href="#about" aria-label="Scroll to the About section">
					<div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
						<motion.div
							animate={reducedMotion ? undefined : { y: [0, 24, 0] }}
							transition={{
								duration: 1.5,
								repeat: Number.POSITIVE_INFINITY,
								repeatType: "loop",
							}}
							className="w-3 h-3 rounded-full bg-secondary mb-1"
						/>
					</div>
				</a>
			</div>
		</section>
	);
};

export default Hero;
