import { CATEGORIES, EXAM } from '../data/categories.js'
import { QUESTIONS } from '../data/questions.js'

export function shuffle(list) {
  const a = [...list]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Prefer questions she has seen least, so repeated exams rotate through the bank.
function pickLeastSeen(pool, n, seenCount) {
  return shuffle(pool)
    .sort((x, y) => (seenCount[x.id] || 0) - (seenCount[y.id] || 0))
    .slice(0, n)
}

function toItem(q, trial = false) {
  return { qid: q.id, options: shuffle([q.a, ...q.w]), trial }
}

// Full mock test: 65 scored questions split by category quota, plus 5 unscored
// trial questions hidden among them.
export function buildExam(seenCount = {}) {
  const scored = CATEGORIES.flatMap((c) =>
    pickLeastSeen(QUESTIONS.filter((q) => q.cat === c.id), c.quota, seenCount),
  )
  const used = new Set(scored.map((q) => q.id))
  const trial = pickLeastSeen(QUESTIONS.filter((q) => !used.has(q.id)), EXAM.trialQuestions, seenCount)
  return shuffle([...scored.map((q) => toItem(q)), ...trial.map((q) => toItem(q, true))])
}

export function buildPractice(questions, n, seenCount = {}) {
  return pickLeastSeen(questions, n, seenCount).map((q) => toItem(q))
}
