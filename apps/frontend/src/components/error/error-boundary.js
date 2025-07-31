'use client';
import React, { Component } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertTriangle, RefreshCw, Home, ChevronDown, ChevronUp } from 'lucide-react';
export class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
            showDetails: false,
        };
    }
    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error,
            errorInfo: null,
            showDetails: false,
        };
    }
    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
        this.setState({
            errorInfo,
        });
        // Call custom error handler if provided
        if (this.props.onError) {
            this.props.onError(error, errorInfo);
        }
        // Send error to monitoring service (e.g., Sentry)
        if (typeof window !== 'undefined' && window.Sentry) {
            window.Sentry.captureException(error, {
                contexts: {
                    react: {
                        componentStack: errorInfo.componentStack,
                    },
                },
            });
        }
    }
    reset = () => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null,
            showDetails: false,
        });
    };
    toggleDetails = () => {
        this.setState((prev) => ({ showDetails: !prev.showDetails }));
    };
    render() {
        if (this.state.hasError && this.state.error) {
            // Use custom fallback if provided
            if (this.props.fallback) {
                return this.props.fallback(this.state.error, this.reset);
            }
            // Default error UI
            return (<div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
          <Card className="max-w-2xl w-full p-8">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="rounded-full bg-red-100 p-4">
                <AlertTriangle className="h-12 w-12 text-red-600"/>
              </div>

              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-gray-900">
                  Oops! Something went wrong
                </h1>
                <p className="text-gray-600">
                  We encountered an unexpected error. Please try refreshing the page or contact
                  support if the issue persists.
                </p>
              </div>

              <div className="flex gap-4">
                <Button onClick={this.reset} variant="default">
                  <RefreshCw className="mr-2 h-4 w-4"/>
                  Try Again
                </Button>
                <Button onClick={() => (window.location.href = '/')} variant="outline">
                  <Home className="mr-2 h-4 w-4"/>
                  Go Home
                </Button>
              </div>

              {/* Error details toggle */}
              <Button onClick={this.toggleDetails} variant="ghost" size="sm" className="text-gray-500">
                {this.state.showDetails ? (<>
                    <ChevronUp className="mr-2 h-4 w-4"/>
                    Hide Details
                  </>) : (<>
                    <ChevronDown className="mr-2 h-4 w-4"/>
                    Show Details
                  </>)}
              </Button>

              {/* Error details */}
              {this.state.showDetails && (<div className="w-full text-left space-y-4">
                  <div className="bg-gray-100 rounded-lg p-4">
                    <h3 className="font-semibold text-sm text-gray-700 mb-2">
                      Error Message:
                    </h3>
                    <p className="text-sm text-red-600 font-mono">
                      {this.state.error.message}
                    </p>
                  </div>

                  {this.state.errorInfo && (<div className="bg-gray-100 rounded-lg p-4">
                      <h3 className="font-semibold text-sm text-gray-700 mb-2">
                        Component Stack:
                      </h3>
                      <pre className="text-xs text-gray-600 overflow-x-auto">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </div>)}

                  {process.env.NODE_ENV === 'development' && this.state.error.stack && (<div className="bg-gray-100 rounded-lg p-4">
                      <h3 className="font-semibold text-sm text-gray-700 mb-2">
                        Stack Trace:
                      </h3>
                      <pre className="text-xs text-gray-600 overflow-x-auto">
                        {this.state.error.stack}
                      </pre>
                    </div>)}
                </div>)}
            </div>
          </Card>
        </div>);
        }
        return this.props.children;
    }
}
