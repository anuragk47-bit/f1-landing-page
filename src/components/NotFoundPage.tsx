import { Link } from '@tanstack/react-router'

export function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center p-8">
      <p className="eyebrow mb-4">Red flag</p>
      <h1 className="headline mb-6 text-7xl">Off the track</h1>
      <p className="mb-8 text-white/70">
        This page isn’t on the calendar. Head back to the pit lane.
      </p>
      <Link to="/" className="action self-start">
        Back to the pits
      </Link>
    </main>
  )
}
