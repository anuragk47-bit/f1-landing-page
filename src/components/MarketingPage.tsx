import { useEffect, useState } from 'react'
import {
  nextRace,
  races,
  regulations,
  season,
  teams,
  type Race,
} from '../data/season'
import { site } from '../data/site'
import { AlertsForm } from './AlertsForm'

const img = (file: string, width: number) =>
  `/.netlify/images?url=/img/${file}&w=${width}&fm=webp`

const dateFormat = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  timeZone: 'UTC',
})

/** Current time, ticking every second. Null during SSR and the first client render. */
function useNow() {
  const [now, setNow] = useState<number | null>(null)
  useEffect(() => {
    setNow(Date.now())
    const timer = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(timer)
  }, [])
  return now
}

const navLinks = [
  { href: '#calendar', label: 'Calendar' },
  { href: '#grid', label: 'The grid' },
  { href: '#new-era', label: '2026 rules' },
]

export function MarketingPage() {
  const now = useNow()
  const upcoming = now === null ? undefined : nextRace(now)

  return (
    <div id="top">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-carbon/80 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4">
          <a href="#top" className="flex items-center gap-3">
            <span aria-hidden className="flex gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <span key={i} className="size-2 rounded-full bg-kerb" />
              ))}
            </span>
            <span className="font-display text-2xl font-black uppercase tracking-wide">
              {site.name}
            </span>
          </a>
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-xs uppercase tracking-[0.2em] text-white/70 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href="#alerts"
            className="bg-kerb px-4 py-2 font-display text-sm font-extrabold uppercase tracking-wider hover:bg-kerb-dark"
          >
            Race alerts
          </a>
        </nav>
      </header>

      <main>
        <Hero race={upcoming} now={now} />
        <div className="kerb" aria-hidden />
        <Stats />
        <Calendar now={now} nextRound={upcoming?.round} />
        <Grid />
        <NewEra />
        <div className="kerb" aria-hidden />
        <AlertsForm />
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-10 text-sm text-mist sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-xl font-black uppercase text-white">
            {site.name}
          </p>
          <p className="max-w-xl">
            An unofficial fan site, not affiliated with Formula 1, the FIA or
            any team. Race times are approximate — check the official schedule
            before you tune in.
          </p>
        </div>
      </footer>
    </div>
  )
}

function Hero({ race, now }: { race?: Race; now: number | null }) {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden pt-24">
      <img
        src={img('hero.png', 1600)}
        srcSet={`${img('hero.png', 800)} 800w, ${img('hero.png', 1600)} 1600w, ${img('hero.png', 2400)} 2400w`}
        sizes="100vw"
        alt="A red single-seater race car throwing sparks through a floodlit street-circuit corner at night"
        fetchPriority="high"
        className="absolute inset-0 size-full object-cover object-[60%_center]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/50 to-carbon/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-carbon/80 via-transparent to-transparent" />

      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-5 pb-16 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="eyebrow mb-5">Formula 1 · {season} season</p>
          <h1 className="headline mb-6 text-[clamp(4rem,13vw,10rem)]">
            Five red
            <br />
            lights.
            <br />
            <span className="text-kerb">Go.</span>
          </h1>
          <p className="mb-8 max-w-lg text-lg text-white/80">
            {site.tagline}. Every Grand Prix on the {season} calendar, all
            eleven teams on the grid, and a live countdown to the next time the
            lights go out.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#calendar" className="action">
              See the calendar <span aria-hidden>→</span>
            </a>
            <a href="#alerts" className="action-ghost">
              Get race alerts
            </a>
          </div>
        </div>
        <NextRaceCard race={race} now={now} />
      </div>
    </section>
  )
}

function NextRaceCard({ race, now }: { race?: Race; now: number | null }) {
  const remaining = race && now !== null ? Date.parse(race.start) - now : 0
  const parts = [
    { label: 'Days', value: Math.floor(remaining / 86_400_000) },
    { label: 'Hrs', value: Math.floor(remaining / 3_600_000) % 24 },
    { label: 'Min', value: Math.floor(remaining / 60_000) % 60 },
    { label: 'Sec', value: Math.floor(remaining / 1000) % 60 },
  ]
  const seasonOver = now !== null && !race

  return (
    <aside
      aria-label="Next race"
      className="weave w-full border-t-4 border-kerb p-6 lg:w-[26rem]"
    >
      <div className="mb-4 flex items-center justify-between">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-mist">
          {seasonOver ? 'Season complete' : 'Next race'}
        </p>
        <span aria-hidden className="flex gap-1.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className="start-light"
              style={{ animationDelay: `${i * 0.25}s` }}
            />
          ))}
        </span>
      </div>
      {seasonOver ? (
        <p className="headline text-4xl">See you in {season + 1}</p>
      ) : (
        <>
          <p className="font-mono text-xs text-kerb">
            {race ? `Round ${race.round} · ${race.city}` : 'Loading…'}
          </p>
          <p className="headline mb-5 mt-1 min-h-[2em] text-4xl">
            {race?.name ?? ' '}
          </p>
          <div className="grid grid-cols-4 gap-2" role="timer" aria-live="off">
            {parts.map((part) => (
              <div key={part.label} className="bg-black/40 py-3 text-center">
                <p className="font-display text-4xl font-black tabular-nums">
                  {race ? String(part.value).padStart(2, '0') : '--'}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mist">
                  {part.label}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </aside>
  )
}

function Stats() {
  const stats = [
    { value: races.length, label: 'Grands Prix' },
    { value: teams.length, label: 'Teams' },
    { value: teams.length * 2, label: 'Drivers' },
    { value: races.filter((r) => r.sprint).length, label: 'Sprint weekends' },
  ]
  return (
    <section
      aria-label="Season at a glance"
      className="border-b border-white/10"
    >
      <dl className="mx-auto grid max-w-7xl grid-cols-2 px-5 md:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col-reverse border-white/10 py-10 text-center [&:not(:last-child)]:md:border-r"
          >
            <dt className="mt-1 font-mono text-xs uppercase tracking-[0.25em] text-mist">
              {stat.label}
            </dt>
            <dd className="font-display text-6xl font-black">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

type Filter = 'all' | 'upcoming' | 'completed'

function Calendar({
  now,
  nextRound,
}: {
  now: number | null
  nextRound?: number
}) {
  const [filter, setFilter] = useState<Filter>('all')
  const isDone = (race: Race) => now !== null && Date.parse(race.start) <= now
  const shown = races.filter((race) =>
    filter === 'all' || now === null
      ? true
      : filter === 'completed'
        ? isDone(race)
        : !isDone(race),
  )

  return (
    <section
      id="calendar"
      aria-labelledby="calendar-heading"
      className="scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl px-5 py-24">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-4">{races.length} rounds · 5 continents</p>
            <h2 id="calendar-heading" className="headline text-6xl sm:text-7xl">
              The {season} calendar
            </h2>
          </div>
          <div
            role="group"
            aria-label="Filter races"
            className="flex border border-white/15"
          >
            {(['all', 'upcoming', 'completed'] as const).map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={filter === option}
                onClick={() => setFilter(option)}
                className={`px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] transition ${filter === option ? 'bg-white text-carbon' : 'text-white/70 hover:text-white'}`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <ol className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {shown.map((race) => {
            const done = isDone(race)
            const next = race.round === nextRound
            return (
              <li
                key={race.round}
                className={`relative bg-carbon p-6 transition hover:bg-asphalt ${done ? 'opacity-50' : ''} ${next ? 'ring-2 ring-inset ring-kerb' : ''}`}
              >
                <div className="mb-6 flex items-start justify-between">
                  <span className="font-display text-5xl font-black text-white/15">
                    {String(race.round).padStart(2, '0')}
                  </span>
                  <span className="font-mono text-xs tracking-[0.2em] text-mist">
                    {race.country}
                  </span>
                </div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-kerb">
                  {dateFormat.format(new Date(race.start))}
                </p>
                <h3 className="mt-1 font-display text-2xl font-extrabold uppercase leading-tight">
                  {race.name.replace(' Grand Prix', '')}
                </h3>
                <p className="mt-1 text-sm text-mist">{race.circuit}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {next && <Tag className="bg-kerb text-white">Up next</Tag>}
                  {done && <Tag className="bg-white/10">Completed</Tag>}
                  {race.sprint && (
                    <Tag className="border border-white/30">Sprint</Tag>
                  )}
                  {race.night && (
                    <Tag className="border border-white/30">Night race</Tag>
                  )}
                </div>
              </li>
            )
          })}
        </ol>
        {shown.length === 0 && (
          <p className="py-12 text-center text-mist">No races here yet.</p>
        )}
      </div>
    </section>
  )
}

function Tag({
  children,
  className,
}: {
  children: React.ReactNode
  className: string
}) {
  return (
    <span
      className={`px-2 py-1 font-mono text-[10px] uppercase tracking-[0.15em] ${className}`}
    >
      {children}
    </span>
  )
}

function Grid() {
  return (
    <section
      id="grid"
      aria-labelledby="grid-heading"
      className="weave scroll-mt-20 border-y border-white/10"
    >
      <div className="mx-auto max-w-7xl px-5 py-24">
        <p className="eyebrow mb-4">
          {teams.length} teams · {teams.length * 2} drivers
        </p>
        <h2 id="grid-heading" className="headline mb-12 text-6xl sm:text-7xl">
          Meet the grid
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {teams.map((team) => (
            <li
              key={team.name}
              className="group relative overflow-hidden bg-carbon p-6 transition hover:-translate-y-1"
              style={{ boxShadow: `inset 4px 0 0 ${team.color}` }}
            >
              <div
                aria-hidden
                className="absolute -right-10 -top-10 size-32 rotate-45 opacity-20 transition group-hover:opacity-40"
                style={{ background: team.color }}
              />
              <h3 className="relative font-display text-3xl font-black uppercase">
                {team.name}
              </h3>
              <p className="relative mb-5 font-mono text-xs uppercase tracking-[0.15em] text-mist">
                {team.base} · {team.powerUnit} power
              </p>
              <ul className="relative space-y-2">
                {team.drivers.map((driver) => {
                  const [first, ...rest] = driver.split(' ')
                  return (
                    <li key={driver} className="flex items-baseline gap-2">
                      <span className="text-white/60">{first}</span>
                      <span className="font-display text-xl font-extrabold uppercase">
                        {rest.join(' ')}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function NewEra() {
  return (
    <section
      id="new-era"
      aria-labelledby="era-heading"
      className="scroll-mt-20"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 lg:grid-cols-2 lg:items-center">
        <div className="relative">
          <img
            src={img('pitlane.png', 1200)}
            srcSet={`${img('pitlane.png', 700)} 700w, ${img('pitlane.png', 1200)} 1200w`}
            sizes="(min-width: 1024px) 50vw, 100vw"
            alt="A pit crew swarming a race car during a lightning-fast tyre change"
            loading="lazy"
            className="aspect-[4/3] w-full object-cover"
          />
          <div className="absolute -bottom-4 -left-4 bg-kerb px-5 py-3 font-display text-xl font-black uppercase">
            New era · {season}
          </div>
        </div>
        <div>
          <p className="eyebrow mb-4">
            The biggest rule change in a generation
          </p>
          <h2 id="era-heading" className="headline mb-6 text-6xl sm:text-7xl">
            A whole
            <br />
            new machine
          </h2>
          <p className="mb-10 max-w-lg text-lg text-white/70">
            {season} brought new chassis and power unit regulations at the same
            time. Here’s what changed under the bodywork.
          </p>
          <dl className="grid gap-px bg-white/10 sm:grid-cols-2">
            {regulations.map((rule) => (
              <div key={rule.title} className="flex flex-col bg-carbon p-5">
                <dt className="mt-1 font-display text-xl font-extrabold uppercase">
                  {rule.title}
                </dt>
                <dd className="order-first font-display text-4xl font-black text-kerb">
                  {rule.stat}
                </dd>
                <dd className="mt-2 text-sm text-mist">{rule.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
