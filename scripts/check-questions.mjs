// Sanity checks for the question bank: run with `npm run check`.
import { CATEGORIES, EXAM } from '../src/data/categories.js'
import { QUESTIONS } from '../src/data/questions.js'
import { TOPICS } from '../src/data/topics.js'
import { buildExam } from '../src/lib/exam.js'

const errors = []
const ids = new Set()
for (const q of QUESTIONS) {
  if (ids.has(q.id)) errors.push(`duplicate id ${q.id}`)
  ids.add(q.id)
  const opts = [q.a, ...q.w]
  if (new Set(opts).size !== opts.length) errors.push(`${q.id}: duplicate options`)
  if (opts.length < 3 || opts.length > 4) errors.push(`${q.id}: needs 3–4 options`)
  if (!q.why) errors.push(`${q.id}: missing explanation`)
}
for (const t of TOPICS) if (!QUESTIONS.some((q) => q.topic === t.id)) errors.push(`topic ${t.id} has no questions`)
for (const c of CATEGORIES) {
  const n = QUESTIONS.filter((q) => q.cat === c.id).length
  console.log(`${c.short.padEnd(12)} ${String(n).padStart(3)} questions (exam uses ${c.quota})`)
  if (n < c.quota) errors.push(`${c.id}: only ${n} questions, exam needs ${c.quota}`)
}
const exam = buildExam()
if (exam.length !== EXAM.totalQuestions) errors.push(`exam has ${exam.length} questions`)
if (exam.filter((i) => i.trial).length !== EXAM.trialQuestions) errors.push('wrong number of trial questions')
if (new Set(exam.map((i) => i.qid)).size !== exam.length) errors.push('exam repeats a question')

console.log(`Total: ${QUESTIONS.length} questions`)
if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}
console.log('OK')
