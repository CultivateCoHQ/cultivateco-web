import React, { Component, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * @class CannabisErrorBoundary
 * @extends {Component<Props, State>}
 * @description A React error boundary component to catch JavaScript errors anywhere in its child component tree,
 * log those errors, and display a fallback UI instead of the component tree that crashed.
 * This prevents the entire application from crashing and provides a better user experience.
 */
class CannabisErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  /**
   * @static getDerivedStateFromError
   * @param {Error} error
   * @returns {State}
   * @description This lifecycle method is called after an error has been thrown by a descendant component.
   * It updates the state so the next render will show the fallback UI.
   */
  public static getDerivedStateFromError(error: Error): State {
    console.error('getDerivedStateFromError called with:', error);
    return { hasError: true, error };
  }

  /**
   * @method componentDidCatch
   * @param {Error} error
   * @param {React.ErrorInfo} errorInfo
   * @description This lifecycle method is used to log error information.
   * It's called after an error has been thrown by a descendant component.
   */
  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('componentDidCatch called with:', error, errorInfo);
    // You could also log the error to an external service here, e.g., Sentry, Bugsnag, etc.
    // logErrorToMyService(error, errorInfo);
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
          <h1 className="text-3xl font-bold mb-4">Oops! Something went wrong.</h1>
          <p className="text-lg text-center mb-6">
            We're sorry for the inconvenience. Please try refreshing the page.
          </p>
          <div className="p-4 bg-red-100 dark:bg-red-900 border border-red-400 rounded-md shadow-inner">
            <h2 className="font-semibold text-lg text-red-700 dark:text-red-300">Error Details:</h2>
            <pre className="text-sm overflow-auto max-h-40 mt-2 text-red-600 dark:text-red-400">
              {this.state.error?.toString() || 'No error details available.'}
            </pre>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export { CannabisErrorBoundary };
