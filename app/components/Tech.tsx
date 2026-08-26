"use client";

import { technologies } from "@/app/constants";
import { Section } from "./layout/Section";
import { BallCanvas } from "./canvas";

const Tech = () => (
	<Section id="tech">
		<div className="flex flex-row flex-wrap justify-center gap-10">
			{technologies.map((technology) => (
				<div className="w-28 h-28" key={technology.name}>
					<BallCanvas icon={technology.icon} name={technology.name} />
				</div>
			))}
		</div>
	</Section>
);

export default Tech;
