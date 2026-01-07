export default function Loading() {
  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header skeleton */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-border/50 bg-bg-primary/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo skeleton */}
          <div className="w-24 h-8 bg-bg-surface rounded-lg animate-pulse" />

          {/* Nav items skeleton */}
          <div className="hidden md:flex items-center gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-16 h-4 bg-bg-surface rounded animate-pulse"
                style={{ animationDelay: `${i * 100}ms` }}
              />
            ))}
          </div>

          {/* CTA button skeleton */}
          <div className="w-32 h-10 bg-gradient-to-r from-accent-orange/20 to-accent-amber/20 rounded-lg animate-pulse" />
        </div>
      </header>

      {/* Main content skeleton */}
      <main className="pt-32 pb-20">
        {/* Hero section skeleton */}
        <section className="max-w-7xl mx-auto px-6 mb-20">
          <div className="text-center space-y-6">
            {/* Badge skeleton */}
            <div className="w-48 h-6 bg-bg-surface rounded-full mx-auto animate-pulse" />

            {/* Title skeleton */}
            <div className="space-y-4">
              <div className="w-full max-w-2xl h-12 bg-bg-surface rounded-lg mx-auto animate-pulse" />
              <div className="w-3/4 max-w-xl h-12 bg-bg-surface rounded-lg mx-auto animate-pulse" />
            </div>

            {/* Subtitle skeleton */}
            <div className="w-96 max-w-full h-5 bg-bg-surface rounded mx-auto animate-pulse" />

            {/* CTA buttons skeleton */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <div className="w-48 h-12 bg-gradient-to-r from-accent-orange/20 to-accent-amber/20 rounded-lg animate-pulse" />
              <div className="w-40 h-12 bg-bg-surface border border-border/50 rounded-lg animate-pulse" />
            </div>
          </div>
        </section>

        {/* Trust badges skeleton */}
        <section className="max-w-7xl mx-auto px-6 mb-20">
          <div className="flex flex-wrap justify-center gap-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-40 h-10 bg-bg-surface/60 border border-border/30 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 50}ms` }}
              />
            ))}
          </div>
        </section>

        {/* Cards section skeleton */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="w-64 h-8 bg-bg-surface rounded-lg mx-auto animate-pulse mb-4" />
            <div className="w-96 max-w-full h-5 bg-bg-surface rounded mx-auto animate-pulse" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="p-6 bg-bg-surface/60 backdrop-blur-sm rounded-xl border border-border/50"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Icon skeleton */}
                <div className="w-12 h-12 bg-bg-elevated rounded-lg animate-pulse mb-4" />

                {/* Title skeleton */}
                <div className="w-3/4 h-6 bg-bg-elevated rounded animate-pulse mb-3" />

                {/* Description skeleton */}
                <div className="space-y-2">
                  <div className="w-full h-4 bg-bg-elevated rounded animate-pulse" />
                  <div className="w-5/6 h-4 bg-bg-elevated rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Branded loader indicator */}
      <div className="fixed bottom-8 right-8 flex items-center gap-3 bg-bg-surface/90 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50 shadow-lg">
        {/* Animated dot */}
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-orange opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-orange" />
        </span>
        <span className="text-sm text-text-secondary font-medium">Caricamento...</span>
      </div>
    </div>
  )
}
