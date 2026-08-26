"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = {
	children: ReactNode;
	/** Rendered when the subtree throws. */
	fallback: (reset: () => void, error: Error) => ReactNode;
	/** Named in the console warning. */
	label?: string;
};

type State = {
	error: Error | null;
};

/**
 * Scoped error boundary, one per canvas. Without it a driver quirk, a lost
 * context or a missing texture takes the whole page down with it.
 */
export class ErrorBoundary extends Component<Props, State> {
	state: State = { error: null };

	static getDerivedStateFromError(error: Error): State {
		return { error };
	}

	componentDidCatch(error: Error, info: ErrorInfo) {
		console.warn(
			`[${this.props.label ?? "ErrorBoundary"}] caught:`,
			error.message,
			info.componentStack,
		);
	}

	private reset = () => this.setState({ error: null });

	render() {
		const { error } = this.state;
		if (error) return this.props.fallback(this.reset, error);
		return this.props.children;
	}
}
