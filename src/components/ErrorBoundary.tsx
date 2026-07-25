import React, { ErrorInfo, ReactNode } from 'react';
import { RefreshCw, AlertTriangle, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  override state: State = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in application:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.hash = '#/';
    window.location.reload();
  };

  override render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2] dark:bg-[#1C1815] text-[#2C221E] dark:text-[#FAF7F2] p-6">
          <div className="max-w-md w-full bg-white dark:bg-[#25201C] border border-[#E2B158]/30 rounded-3xl p-8 text-center shadow-xl space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 dark:bg-amber-950/50 flex items-center justify-center text-[#9E6D22] dark:text-[#E2B158]">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div>
              <h2 className="font-serif-title text-2xl font-bold">
                Something went wrong
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                We encountered an unexpected error while loading this page.
              </p>
            </div>

            {this.state.error?.message && (
              <div className="p-3 bg-red-50 dark:bg-red-950/30 rounded-xl text-left border border-red-200 dark:border-red-900/50">
                <p className="text-[11px] font-mono text-red-600 dark:text-red-400 break-words">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={this.handleReset}
                className="flex-1 py-3 px-4 rounded-xl golden-gradient text-[#2C221E] font-bold text-xs flex items-center justify-center gap-2 shadow hover:opacity-90 transition-opacity"
              >
                <RefreshCw className="w-4 h-4" />
                Reload Page
              </button>
              <a
                href="#/"
                onClick={() => this.setState({ hasError: false, error: null })}
                className="flex-1 py-3 px-4 rounded-xl border border-[#E2B158]/40 text-[#2C221E] dark:text-[#FAF7F2] font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#E2B158]/10 transition-colors"
              >
                <Home className="w-4 h-4" />
                Go to Home
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
