import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="form-shell app-bg">
          <section className="form-card glass-panel text-white">
            <h1 className="mb-3 text-3xl font-bold">SkyCast Pro</h1>
            <p className="text-white/78">The app hit an unexpected error. Refresh the page to continue.</p>
          </section>
        </main>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
