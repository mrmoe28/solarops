export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Vercel App Template
        </h1>
        <p className="text-center text-gray-600 mb-8">
          A production-ready Next.js template optimized for Vercel deployment
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <div className="border rounded-lg p-4">
            <h2 className="font-semibold mb-2">Monorepo Ready</h2>
            <p className="text-sm text-gray-600">
              Organized with pnpm workspaces and Turborepo
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <h2 className="font-semibold mb-2">Vercel Optimized</h2>
            <p className="text-sm text-gray-600">
              Configured for optimal Vercel deployments
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <h2 className="font-semibold mb-2">TypeScript First</h2>
            <p className="text-sm text-gray-600">
              Full TypeScript support with strict mode
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}