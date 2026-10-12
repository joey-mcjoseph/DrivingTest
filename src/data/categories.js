// The five areas of the Swedish B-licence theory test, with how many of the
// 65 scored questions come from each one.
export const CATEGORIES = [
  { id: 'rules', name: 'Traffic rules', short: 'Rules', quota: 32, emoji: '🚦' },
  { id: 'safety', name: 'Traffic safety', short: 'Safety', quota: 16, emoji: '🛡️' },
  { id: 'vehicle', name: 'Vehicle knowledge & manoeuvrability', short: 'Vehicle', quota: 7, emoji: '🚗' },
  { id: 'environment', name: 'Environment', short: 'Environment', quota: 5, emoji: '🌱' },
  { id: 'personal', name: 'Individual conditions', short: 'Personal', quota: 5, emoji: '🧠' },
]

export const CATEGORY_BY_ID = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]))

export const EXAM = {
  totalQuestions: 70,
  scoredQuestions: 65,
  trialQuestions: 5,
  passMark: 52,
  timeLimitSec: 50 * 60,
}

export const WEAK_THRESHOLD = 0.8
