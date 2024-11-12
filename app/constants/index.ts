export const navLinks = [
	{
		id: "about",
		title: "About",
	},
	{
		id: "work",
		title: "Work",
	},
	{
		id: "contact",
		title: "Contact",
	},
];

const services = [
	{
		title: "UI/UX Designer",
		icon: "/backend.webp",
	},
	{
		title: "Full Stack Web Developer",
		icon: "/web.webp",
	},
	{
		title: "App Developer",
		icon: "/mobile.webp",
	},
	{
		title: "Software Engineer",
		icon: "/creator.webp",
	},
];

const technologies = [
	{
		name: "HTML 5",
		icon: "/tech/html.webp",
	},
	{
		name: "CSS 3",
		icon: "/tech/css.webp",
	},
	{
		name: "JavaScript",
		icon: "/tech/javascript.webp",
	},
	{
		name: "TypeScript",
		icon: "/tech/typescript.webp",
	},
	{
		name: "React JS",
		icon: "/tech/reactjs.webp",
	},
	{
		name: "Next.JS",
		icon: "/tech/nextjs.svg",
	},
	{
		name: "Redux Toolkit",
		icon: "/tech/redux.webp",
	},
	{
		name: "Tailwind CSS",
		icon: "/tech/tailwind.webp",
	},
	{
		name: "Three JS",
		icon: "/tech/threejs.webp",
	},
	{
		name: "git",
		icon: "/tech/git.webp",
	},
	{
		name: "figma",
		icon: "/tech/figma.webp",
	},
	{
		name: "wordpress",
		icon: "/tech/wordpress.webp",
	},
	{
		name: "bootstrap",
		icon: "/tech/bootstrap.webp",
	},
];

const experiences = [
	{
		title: "Wordpress Developer & UI/UX Designer",
		company_name: "A.V.M Auto",
		icon: "/company/avm.webp",
		iconBg: "#383E56",
		date: "2020 -  2023",
		points: [
			"Self-Taught Expertise: Gained proficiency in WordPress and UI/UX design through independent learning.",
			"Collaborative Design: Worked closely with stakeholders to gather feedback and iterate on the portfolio website's interactivity.",
			"Successful Website Development: Designed and developed a visually appealing and user-friendly portfolio website using WordPress.",
			"Positive Business Impact: Contributed to +54.25% sales and overall business growth through the improved website."
		],
	},
	{
		title: "Next.JS Developer",
		company_name: "Sparkbright Engineering",
		icon: "/company/avm.webp",
		iconBg: "#E6DEDD",
		date: "2023 - 2024",
		points: [
			"Self-Taught Expertise: Gained proficiency in React.JS and Next.JS through independent learning.",
			"Successful Website Development: Designed and developed a visually appealing and user-friendly portfolio website using Next.JS.",
			"Collaborative Design: Worked closely with stakeholders to gather feedback and iterate on the portfolio website's interactivity."
		],
	},
	{
		title: "Software Developer",
		company_name: "Way to Web Pvt. Ltd.",
		icon: "/company/avm.webp",
		iconBg: "#E6DEDD",
		date: "2024 - Present",
		points: [
			"Developing and maintaining Wordpress Site for A.V.M Auto The Car Body Shop based in Ahmedabad, Gujarat India.",
			"Analyzing feedbacks and fixing bugs.",
			"Search Engine Optimization.",
			"Design Maintainence and hosting maintenance.",
		],
	},
];

const testimonials = [
	{
		id: 1,
		testimonial:
			"Behance is a social media platform owned by Adobe whose main focus is to showcase and discover creative work.",
		name: "Om Patel",
		image: "/socialmedia/behance.svg",
		link: "https://www.behance.net/omthecreator",
	},
	{
		id: 2,
		testimonial:
			"LinkedIn is a business and employment-focused social media platform that works through websites and mobile apps.",
		name: "Om Patel",
		image: "/socialmedia/linkedin.svg",
		link: "https://www.linkedin.com/in/om-patel-401068143/",
	},
	{
		id: 3,
		testimonial:
			"Dribbble is a self-promotion and social networking platform for digital designers and creatives. It serves as a design portfolio.",
		name: "Om Patel",
		image: "/socialmedia/dribble.svg",
		link: "https://dribbble.com/om2121",
	},
	{
		id: 4,
		testimonial:
			"Also do check out my UI/UX Portfolio where I have shared by design studies.",
		name: "Om Patel",
		image: "/socialmedia/portfolio.svg",
		link: "https://omthecreator.netlify.app/",
	},
	{
		id: 5,
		testimonial:
			"Also do check out my Github Profile where I have shared all my codes from basic to advanced.",
		name: "Om Patel",
		image: "/tech/github.webp",
		link: "https://github.com/omunite215",
	},
];


const projects :{
	name: string;
	description: string;
	tags: {
		name: string;
		color: string;
	}[];
	image: string;
	source_code_link?: string;
	deploy_link: string;
	platform: "Netlify" | "Vercel" | "Figma" | "Wordpress"
}[] = [
	{
		name: "A.V.M Auto Portfolio",
		description:
			"A Designed and developed a visually appealing and user-friendly portfolio website using WordPress.",
		tags: [
			{
				name: "wordpress",
				color: "blue-text-gradient",
			},
			{
				name: "google-translate",
				color: "green-text-gradient",
			},
		],
		image: "/projectimg/avm.webp",
		platform: "Wordpress",
		deploy_link: "https://avmauto.in/",
	},
	{
		name: "Admin Dashboard UI",
		description:
			"React Admin Dashboard is a stunning web application that has a beautiful User Interface and has been built using advanced JavaScript concepts, React, and Tailwind CSS which has different graphs, stats and themes.",
		tags: [
			{
				name: "react",
				color: "blue-text-gradient",
			},
			{
				name: "Syncfusion UI",
				color: "orange-text-gradient",
			},
			{
				name: "tailwind",
				color: "green-text-gradient",
			},
		],
		image: "/projectimg/dashboard.webp",
		source_code_link: "https://github.com/omunite215/React-Admin-DashBoard",
		platform: "Netlify",
		deploy_link: "https://reactadmindashboardbyom.netlify.app/",
	},
	{
		name: "HooBank",
		description:
			"A responsive Bank HomePage showcasing different features such as various payment gateways integration, easy money transfer, advanced security, etc. It has a beautiful interface made using Tailwind CSS and React",
		tags: [
			{
				name: "react",
				color: "blue-text-gradient",
			},
			{
				name: "tailwind",
				color: "green-text-gradient",
			},
		],
		image: "/projectimg/hoobank.webp",
		source_code_link: "https://github.com/omunite215/hoobank",
		platform: "Netlify",
		deploy_link: "https://hoobankbyom.netlify.app/",
	},
	{
		name: "Provid A Youtube Clone",
		description:
			"Provid is a YouTube clone project built with React, Material UI, and Tailwind CSS. The platform has been designed with a stunning dark mode that enhances the viewing experience. The user interface is intuitive and easy to navigate, ensuring that users can easily find the content they're looking for.",
		tags: [
			{
				name: "react",
				color: "blue-text-gradient",
			},
			{
				name: "materialui",
				color: "orange-text-gradient",
			},
			{
				name: "rapidapi",
				color: "blue-text-gradient",
			},
		],
		image: "/projectimg/provid.webp",
		source_code_link: "https://github.com/omunite215/Provid-A-YouTube-Clone",
		platform: "Netlify",
		deploy_link: "https://providbyom.netlify.app/",
	},
	{
		name: "A 3D Developer Portfolio",
		description:
			"A responsive 3D Portfolio website which is made using Three.js a cross-browser JavaScript library and application programming interface used to create and display animated 3D computer graphics in a web browser using WebGL. It has a beautiful interface made using Tailwind CSS and React.",
		tags: [
			{
				name: "react",
				color: "blue-text-gradient",
			},
			{
				name: "tailwind",
				color: "green-text-gradient",
			},
			{
				name: "threejs",
				color: "orange-text-gradient",
			},
			{
				name: "emailjs",
				color: "pink-text-gradient",
			},
		],
		image: "/projectimg/portfoliosample.webp",
		source_code_link: "https://github.com/omunite215/portfolio",
		platform: "Netlify",
		deploy_link: "https://portfoliobyompatel.netlify.app/",
	},
];

export { services, technologies, experiences, testimonials, projects };
