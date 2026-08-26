/**
 * Skeleton placeholders. Each mirrors the box model of what it stands in for, so
 * lazy mounting does not shift layout.
 */

export function Skeleton({ className = "" }: { className?: string }) {
	return <div className={`skeleton-shimmer rounded-md ${className}`} />;
}

/** Fills a 3D canvas slot while the scene downloads/compiles. */
export function CanvasSkeleton({
	label = "Preparing 3D scene",
	progress,
}: {
	label?: string;
	progress?: number;
}) {
	return (
		<div
			className="w-full h-full flex flex-col items-center justify-center gap-4"
			role="status"
			aria-live="polite"
		>
			<div className="relative w-16 h-16 float-soft">
				<div className="absolute inset-0 rounded-full border-2 border-[#915EFF]/25" />
				<div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#915EFF] animate-spin" />
			</div>
			<div className="text-center">
				<p className="text-secondary text-[13px] tracking-wide">{label}</p>
				{typeof progress === "number" && (
					<p className="text-white font-bold text-[15px] mt-1 tabular-nums">
						{progress.toFixed(0)}%
					</p>
				)}
			</div>
		</div>
	);
}

/** Matches ServiceCard in About. */
export function ServiceCardSkeleton() {
	return (
		<div className="xs:w-[250px] w-full">
			<div className="w-full green-pink-gradient p-px rounded-[20px] shadow-card opacity-40">
				<div className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col">
					<Skeleton className="w-16 h-16 !rounded-xl" />
					<Skeleton className="h-5 w-32" />
				</div>
			</div>
		</div>
	);
}

/** Matches ProjectCard in Works. */
export function ProjectCardSkeleton() {
	return (
		<div className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full">
			<Skeleton className="w-full h-[230px] !rounded-2xl" />
			<div className="mt-5 space-y-3">
				<Skeleton className="h-6 w-2/3" />
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-4 w-5/6" />
			</div>
			<div className="mt-4 flex gap-2">
				<Skeleton className="h-4 w-16" />
				<Skeleton className="h-4 w-20" />
				<Skeleton className="h-4 w-14" />
			</div>
		</div>
	);
}

/** Matches a single tech ball tile. */
export function TechBallSkeleton() {
	return <Skeleton className="w-28 h-28 !rounded-full" />;
}

/** Matches one VerticalTimelineElement. */
export function TimelineSkeleton() {
	return (
		<div className="flex gap-6 items-start">
			<Skeleton className="w-12 h-12 !rounded-full shrink-0" />
			<div className="flex-1 bg-[#1d1836] rounded-lg p-6 space-y-3">
				<Skeleton className="h-6 w-1/2" />
				<Skeleton className="h-4 w-1/3" />
				<div className="pt-2 space-y-2">
					<Skeleton className="h-3 w-full" />
					<Skeleton className="h-3 w-11/12" />
					<Skeleton className="h-3 w-4/5" />
				</div>
			</div>
		</div>
	);
}

/** Whole-page skeleton for the App Router `loading.tsx`. */
export function PageSkeleton() {
	return (
		<div className="min-h-screen bg-primary pt-32">
			<div className="w-full max-w-(--container-content) xl:max-w-(--container-content-xl) 2xl:max-w-(--container-content-2xl) mx-auto paddingX">
				<div className="flex gap-5">
					<div className="flex flex-col items-center mt-5">
						<div className="w-5 h-5 rounded-full bg-[#915EFF]" />
						<div className="w-1 sm:h-80 h-40 violet-gradient" />
					</div>
					<div className="flex-1 space-y-6">
						<Skeleton className="h-[60px] w-3/4 max-w-lg" />
						<Skeleton className="h-8 w-1/2 max-w-sm" />
					</div>
				</div>
				<div className="mt-24 flex flex-wrap gap-10">
					<ServiceCardSkeleton />
					<ServiceCardSkeleton />
					<ServiceCardSkeleton />
				</div>
			</div>
		</div>
	);
}
