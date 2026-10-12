import { CATEGORIES, WEAK_THRESHOLD } from '../data/categories.js'
import { TOPICS } from '../data/topics.js'
import { QUESTION_BY_ID } from '../data/questions.js'

// Only the most recent answers count towards a topic's score, so improvement
// shows up instead of being drowned out by early mistakes.
const RECENT_PER_GROUP = 30

// All answered items across attempts, newest first, excluding unscored trial questions.
export function allAnswers(attempts) {
  const out = []
  for (let i = attempts.length - 1; i >= 0; i--) {
    const items = attempts[i].items
    for (let j = items.length - 1; j >= 0; j--) {
      const it = items[j]
      if (it.chosen != null && !it.trial && QUESTION_BY_ID[it.qid]) out.push(it)
    }
  }
  return out
}

function score(answers) {
  const recent = answers.slice(0, RECENT_PER_GROUP)
  const correct = recent.filter((a) => a.correct).length
  return { answered: answers.length, recentCount: recent.length, correct, pct: recent.length ? correct / recent.length : null }
}

export function categoryStats(attempts) {
  const ans = allAnswers(attempts)
  return CATEGORIES.map((c) => ({ ...c, ...score(ans.filter((a) => QUESTION_BY_ID[a.qid].cat === c.id)) }))
}

export function topicStats(attempts) {
  const ans = allAnswers(attempts)
  return TOPICS.map((t) => ({ ...t, ...score(ans.filter((a) => QUESTION_BY_ID[a.qid].topic === t.id)) }))
}

export function isWeak(s) {
  return s.pct != null && s.pct < WEAK_THRESHOLD
}

// Weakest practised topics first; topics with too few answers are not judged yet.
export function weakTopics(attempts, minAnswers = 3) {
  return topicStats(attempts)
    .filter((t) => t.recentCount >= minAnswers && isWeak(t))
    .sort((a, b) => a.pct - b.pct)
}

export function seenCounts(attempts) {
  const seen = {}
  for (const a of attempts) for (const it of a.items) seen[it.qid] = (seen[it.qid] || 0) + 1
  return seen
}

// Questions whose most recent answer was wrong.
export function mistakeIds(attempts) {
  const last = {}
  for (const a of attempts) for (const it of a.items) if (it.chosen != null) last[it.qid] = it.correct
  return Object.keys(last).filter((id) => last[id] === false && QUESTION_BY_ID[id])
}

export function pctText(p) {
  return p == null ? '–' : `${Math.round(p * 100)}%`
}
