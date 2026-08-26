import {
	About,
	BackToTop,
	Contact,
	Experience,
	Feedbacks,
	Hero,
	Navbar,
	ScrollProgress,
	StarsCanvas,
	Tech,
	Works,
} from "./components";

export default function Home() {
	return (
		<div className="relative z-0 bg-primary font-sans">
			<ScrollProgress />
			<div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
				<Navbar />
				<Hero />
			</div>
			<main>
				<About />
				<Experience />
				<Tech />
				<Works />
				<Feedbacks />
				<div className="relative z-0">
					<Contact />
					<StarsCanvas />
				</div>
			</main>
			<BackToTop />
		</div>
	);
}
