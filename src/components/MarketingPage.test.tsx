import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect, it } from 'vitest'
import { MarketingPage } from './MarketingPage'
import { nextRace, races } from '../data/season'

afterEach(cleanup)

it('renders the hero, calendar and signup', () => {
  render(<MarketingPage />)
  expect(screen.getByRole('heading', { level: 1 }).textContent).toContain(
    'Five red',
  )
  expect(screen.getByRole('heading', { name: /2026 calendar/i })).toBeTruthy()
  expect(screen.getAllByRole('listitem').length).toBeGreaterThan(races.length)
  expect(screen.getByRole('button', { name: 'Get race alerts' })).toBeTruthy()
})

it('filters the calendar to upcoming races', async () => {
  render(<MarketingPage />)
  const user = userEvent.setup()
  await user.click(screen.getByRole('button', { name: 'upcoming' }))
  expect(
    screen
      .getByRole('button', { name: 'upcoming' })
      .getAttribute('aria-pressed'),
  ).toBe('true')
})

it('finds the next race by start time', () => {
  expect(nextRace(Date.parse('2026-10-31T00:00:00Z'))?.round).toBe(20)
  expect(nextRace(Date.parse('2026-12-31T00:00:00Z'))).toBeUndefined()
})
