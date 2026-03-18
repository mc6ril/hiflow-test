import { Component, type ErrorInfo, type ReactNode } from 'react';

type AppErrorBoundaryProps = {
  children: ReactNode;
  fallback: () => ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetKey: number;
};

type AppErrorBoundaryState = {
  hasError: boolean;
};

export class AppErrorBoundary extends Component<
  AppErrorBoundaryProps,
  AppErrorBoundaryState
> {
  state: AppErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    // Switch rendering to fallback UI on the next render pass.
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Optional callback so the parent can react to the captured error.
    this.props.onError?.(error, errorInfo);
  }

  componentDidUpdate(previousProps: AppErrorBoundaryProps) {
    // resetKey lets parent components request a fresh attempt after a failure.
    if (previousProps.resetKey !== this.props.resetKey && this.state.hasError) {
      this.setState({
        hasError: false,
      });
    }
  }

  render() {
    if (this.state.hasError) {
      // Fallback stays isolated from crashed subtree.
      return this.props.fallback();
    }

    return this.props.children;
  }
}
