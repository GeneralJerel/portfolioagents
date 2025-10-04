export default function Pricing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="font-bold text-xl">
              <span className="text-gray-900">portfolio</span>
              <span className="text-blue-600">agent</span>
              <span className="text-gray-500">.io</span>
            </a>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="/how-it-works" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                How It Works
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Examples
              </a>
              <a href="/pricing" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                Pricing
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Sign In
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Choose the perfect plan to showcase your career story
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            {/* Main Pricing Card */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-12 shadow-2xl mb-12">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-white mb-4">Simple Pay-Per-Portfolio Pricing</h2>
                <p className="text-xl text-blue-100">Only pay for what you create</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                {/* Setup Cost */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <div className="text-center">
                    <div className="inline-block p-4 bg-white/20 rounded-full mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Portfolio Setup</h3>
                    <div className="flex items-baseline justify-center mb-4">
                      <span className="text-6xl font-bold text-white">$100</span>
                    </div>
                    <p className="text-blue-100">One-time per portfolio page</p>
                  </div>
                </div>

                {/* Monthly Hosting */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <div className="text-center">
                    <div className="inline-block p-4 bg-white/20 rounded-full mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Monthly Hosting</h3>
                    <div className="flex items-baseline justify-center mb-4">
                      <span className="text-6xl font-bold text-white">$10</span>
                      <span className="text-2xl text-blue-100 ml-2">/mo</span>
                    </div>
                    <p className="text-blue-100">Per portfolio page</p>
                  </div>
                </div>
              </div>
            </div>

            {/* What's Included */}
            <div className="bg-white rounded-2xl p-10 shadow-lg mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">What's Included</h3>
              <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900">AI-Powered Portfolio</p>
                    <p className="text-sm text-gray-600">Beautiful, professional page</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900">Smart AI Agent</p>
                    <p className="text-sm text-gray-600">Answers questions 24/7</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900">Unlimited Chat</p>
                    <p className="text-sm text-gray-600">No message limits</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900">Custom Domain</p>
                    <p className="text-sm text-gray-600">Use your own domain</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900">Analytics Dashboard</p>
                    <p className="text-sm text-gray-600">Track visitor engagement</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900">Premium Templates</p>
                    <p className="text-sm text-gray-600">Professional designs</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Voice Calls Pricing */}
            <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-10 shadow-xl">
              <div className="text-center mb-8">
                <div className="inline-block p-4 bg-white/20 rounded-full mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">Voice Conversations</h3>
                <p className="text-purple-100 mb-6">Add voice calling to your AI agent</p>
                <div className="inline-block bg-white/20 backdrop-blur-sm rounded-xl px-8 py-4 border border-white/30">
                  <p className="text-white text-lg">Pay only for what you use</p>
                  <p className="text-4xl font-bold text-white mt-2">Per Minute Billing</p>
                  <p className="text-purple-100 mt-2 text-sm">Charged based on actual call duration</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 max-w-2xl mx-auto">
                <div className="space-y-3">
                  <div className="flex items-start text-white">
                    <svg className="w-5 h-5 text-purple-200 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Recruiters can call your AI agent directly</span>
                  </div>
                  <div className="flex items-start text-white">
                    <svg className="w-5 h-5 text-purple-200 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Natural voice conversations powered by VAPI</span>
                  </div>
                  <div className="flex items-start text-white">
                    <svg className="w-5 h-5 text-purple-200 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Transparent billing - no hidden fees</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">
              Frequently Asked Questions
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Can I create multiple portfolios?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Absolutely! Each portfolio costs $100 to set up and $10/month to host. You can create as many as you need—perfect if you want different versions for different roles or industries.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  How does voice calling pricing work?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Voice calling is billed per minute based on actual usage. You only pay for the time recruiters spend talking to your AI agent. Billing is transparent with no hidden fees or minimum commitments.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  What's included in the $10/month hosting fee?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Everything! Your portfolio hosting includes unlimited chat messages, 24/7 uptime, custom domain support, analytics dashboard, and regular updates. The only additional cost is for voice calling minutes if you enable that feature.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Can I cancel anytime?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Yes! You can cancel your monthly hosting at any time. Your portfolio will remain active until the end of your current billing period. The $100 setup fee is one-time and non-refundable.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  How long does it take to set up?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Most portfolios are ready within 24-48 hours after you submit your resume. We'll customize your AI agent, set up your page, and send you the link to review before going live.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Do you offer refunds?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We offer a 30-day money-back guarantee on the setup fee. If you're not satisfied with your portfolio within the first month, contact us for a full refund. Monthly hosting fees are prorated if you cancel.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Transform your resume into an AI-powered portfolio today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-blue-600 text-white font-bold text-lg rounded-lg hover:bg-blue-700 transition-colors shadow-lg">
                Create Your Portfolio
              </button>
              <button className="px-8 py-4 bg-white text-gray-900 font-bold text-lg rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-colors">
                Contact Us
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <div className="font-bold text-xl mb-2">
                <span className="text-gray-900">portfolio</span>
                <span className="text-blue-600">agent</span>
                <span className="text-gray-500">.io</span>
              </div>
              <p className="text-sm text-gray-500">
                Transform your resume into an AI-powered portfolio
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-gray-700 text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 text-sm">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-xs text-gray-400">
              © 2025 PortfolioAgent.io. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
