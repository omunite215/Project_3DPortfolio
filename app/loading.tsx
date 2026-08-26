import { PageSkeleton } from "@/app/components/state/Skeletons";

/**
 * Route-level loading UI. Streams in ahead of the page so the first paint is a
 * shaped placeholder instead of a blank navy screen.
 */
export default function Loading() {
	return <PageSkeleton />;
}
