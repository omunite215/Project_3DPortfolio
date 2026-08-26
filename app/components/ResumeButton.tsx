import Image from "next/image";

/** A plain anchor: this is a file download, not a client-side route change. */
const ResumeButton = () => (
	<a
		href="/resume/Resume.pdf"
		target="_blank"
		rel="noopener noreferrer"
		download
		className="font-medium text-center px-3 py-3 flex gap-1 justify-center rounded-md transition ease-in-out delay-150 bg-[#915EFF] hover:-translate-y-1 hover:scale-110 hover:bg-purple-600 duration-300"
	>
		<Image
			src="/resume.svg"
			width={24}
			height={24}
			alt=""
			aria-hidden="true"
			className="object-contain animate-pulse"
		/>
		<span className="lg:block hidden text-white">Download Resume</span>
		<span className="lg:hidden sr-only">Download Resume</span>
	</a>
);

export default ResumeButton;
