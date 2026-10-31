import { useRef, useState, type FormEvent } from 'react'
import { teams } from '../data/season'
import { alertsForm } from '../data/site'

type Status = 'idle' | 'pending' | 'error' | 'success'

export function AlertsForm() {
  const [status, setStatus] = useState<Status>('idle')
  const submitting = useRef(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting.current || status === 'success') return
    const body = new URLSearchParams()
    new FormData(event.currentTarget).forEach((value, key) =>
      body.append(key, String(value)),
    )
    submitting.current = true
    setStatus('pending')
    try {
      const response = await fetch(alertsForm.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
        signal: AbortSignal.timeout(15000),
      })
      if (!response.ok || /\bdata-netlify\s*=/i.test(await response.text()))
        throw new Error('Signup was not accepted')
      setStatus('success')
    } catch {
      setStatus('error')
    } finally {
      submitting.current = false
    }
  }

  return (
    <section
      id="alerts"
      tabIndex={-1}
      aria-labelledby="alerts-heading"
      className="relative scroll-mt-20 overflow-hidden"
    >
      <img
        src="/.netlify/images?url=/img/grid.png&w=1600&fm=webp"
        alt=""
        loading="lazy"
        className="absolute inset-0 size-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-carbon via-carbon/90 to-carbon/40" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-24 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="eyebrow mb-4">Race-week alerts</p>
          <h2
            id="alerts-heading"
            className="headline mb-6 text-6xl sm:text-7xl"
          >
            Never miss
            <br />
            <span className="text-kerb">lights out</span>
          </h2>
          <p id="alerts-note" className="max-w-md text-lg text-white/70">
            One email before every Grand Prix weekend with session times in your
            timezone, plus a heads-up for sprint weekends. No spam, and you can
            unsubscribe anytime.
          </p>
        </div>
        <form
          name={alertsForm.name}
          method="POST"
          action={alertsForm.endpoint}
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={submit}
          aria-busy={status === 'pending'}
          onChange={() => {
            if (!submitting.current && status === 'error') setStatus('idle')
          }}
          className="weave border-l-4 border-kerb p-6 sm:p-10"
        >
          <input type="hidden" name="form-name" value={alertsForm.name} />
          <p hidden>
            <label>
              Leave this empty
              <input name="bot-field" tabIndex={-1} autoComplete="off" />
            </label>
          </p>
          {status === 'success' ? (
            <div role="status" className="py-8">
              <p className="headline mb-3 text-5xl">You’re on the grid.</p>
              <p className="text-white/70">
                Watch your inbox before the next race weekend.
              </p>
              <button
                type="button"
                className="mt-6 font-mono text-xs uppercase tracking-[0.2em] underline"
                onClick={() => setStatus('idle')}
              >
                Sign up another email
              </button>
            </div>
          ) : (
            <fieldset
              disabled={status === 'pending'}
              className="space-y-6 disabled:opacity-70"
            >
              <legend className="sr-only">Sign up for race-week alerts</legend>
              <div>
                <label htmlFor="alerts-name" className="form-label">
                  Name
                </label>
                <input
                  id="alerts-name"
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={100}
                  placeholder="Your name"
                  className="form-input"
                />
              </div>
              <div>
                <label htmlFor="alerts-email" className="form-label">
                  Email
                </label>
                <input
                  id="alerts-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  placeholder="you@example.com"
                  className="form-input"
                />
              </div>
              <div>
                <label htmlFor="alerts-team" className="form-label">
                  Favourite team
                </label>
                <select
                  id="alerts-team"
                  name="team"
                  defaultValue=""
                  className="form-input"
                >
                  <option value="">No favourite — I love them all</option>
                  {teams.map((team) => (
                    <option key={team.name} value={team.name}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                aria-describedby="alerts-note"
                className="action w-full justify-center"
              >
                {status === 'pending' ? 'Sending…' : 'Get race alerts'}
              </button>
              <p role="status" className="sr-only">
                {status === 'pending' ? 'Sending your signup…' : ''}
              </p>
              {status === 'error' && (
                <p role="alert" className="text-sm text-kerb">
                  We couldn’t confirm your signup. Your details are still here;
                  please try again.
                </p>
              )}
            </fieldset>
          )}
        </form>
      </div>
    </section>
  )
}
