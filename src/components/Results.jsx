import { CATEGORIES, EXAM, WEAK_THRESHOLD } from '../data/categories.js'
import { QUESTION_BY_ID } from '../data/questions.js'
import { TOPIC_BY_ID } from '../data/topics.js'
import { pctText } from '../lib/stats.js'
import Sign from './Sign.jsx'

export default function Results({ attempt, onHome, onPracticeIds }) {
  const isExam = attempt.mode === 'exam'
  const scored = attempt.items.filter((it) => !it.trial)
  const wrong = attempt.items.filter((it) => !it.correct)
  const trials = attempt.items.filter((it) => it.trial)

  const byCat = CATEGORIES.map((c) => {
    const its = scored.filter((it) => QUESTION_BY_ID[it.qid]?.cat === c.id)
    const ok = its.filter((it) => it.correct).length
    return { ...c, total: its.length, ok, pct: its.length ? ok / its.length : null }
  }).filter((c) => c.total > 0)

  const topicMiss = {}
  for (const it of scored) if (!it.correct) {
    const t = QUESTION_BY_ID[it.qid]?.topic
    if (t) topicMiss[t] = (topicMiss[t] || 0) + 1
  }
  const focus = Object.entries(topicMiss).sort((a, b) => b[1] - a[1]).slice(0, 4)

  return (
    <div className="page">
      <div className={`result-hero ${isExam ? (attempt.passed ? 'pass' : 'fail') : ''}`}>
        {isExam ? (
          <>
            <div className="result-emoji">{attempt.passed ? '🎉' : '💪'}</div>
            <div className="result-title">{attempt.passed ? 'PASSED!' : 'Not this time'}</div>
            <div className="result-score">{attempt.score} / {EXAM.scoredQuestions}</div>
            <div className="result-sub">
              {attempt.passed
                ? 'Amazing! You would have passed the real test.'
                : `You need ${EXAM.passMark} to pass. That's ${EXAM.passMark - attempt.score} more. You can do it!`}
            </div>
          </>
        ) : (
          <>
            <div className="result-emoji">{attempt.score / scored.length >= WEAK_THRESHOLD ? '🌟' : '📚'}</div>
            <div className="result-title">{attempt.title}</div>
            <div className="result-score">{attempt.score} / {scored.length}</div>
            <div className="result-sub">{pctText(attempt.score / scored.length)} correct</div>
          </>
        )}
        {attempt.durationSec != null && (
          <div className="result-time">Time: {Math.floor(attempt.durationSec / 60)} min {attempt.durationSec % 60} s</div>
        )}
      </div>

      <section className="card">
        <h3>By area</h3>
        {byCat.map((c) => (
          <div key={c.id} className="bar-row">
            <div className="bar-label">{c.emoji} {c.short}<span>{c.ok}/{c.total}</span></div>
            <div className="bar-track">
              <div className={`bar-fill ${c.pct < WEAK_THRESHOLD ? 'weak' : 'good'}`} style={{ width: `${c.pct * 100}%` }} />
            </div>
          </div>
        ))}
      </section>

      {focus.length > 0 && (
        <section className="card">
          <h3>Focus on these next</h3>
          <ul className="focus-list">
            {focus.map(([t, n]) => (
              <li key={t}><strong>{TOPIC_BY_ID[t].name}</strong>: {n} wrong</li>
            ))}
          </ul>
        </section>
      )}

      {isExam && trials.length > 0 && (
        <section className="card muted">
          <h3>Trial questions</h3>
          <p>
            Just like the real test, {trials.length} questions were unscored trial questions. You got{' '}
            {trials.filter((t) => t.correct).length} of them right. They're marked “trial” below.
          </p>
        </section>
      )}

      {wrong.length > 0 && (
        <section className="card">
          <h3>Review your mistakes ({wrong.length})</h3>
          {wrong.map((it) => {
            const q = QUESTION_BY_ID[it.qid]
            if (!q) return null
            return (
              <div key={it.qid} className="review">
                {it.trial && <span className="tag">trial</span>}
                {q.sign && <Sign name={q.sign} panels={q.panels} size={64} />}
                <p className="review-q">{q.q}</p>
                {it.chosen != null ? (
                  <p className="review-bad">Your answer: {it.chosen}</p>
                ) : (
                  <p className="review-bad">Not answered</p>
                )}
                <p className="review-ok">Correct: {q.a}</p>
                <p className="review-why">{q.why}</p>
              </div>
            )
          })}
        </section>
      )}

      <div className="actions">
        {wrong.length > 0 && (
          <button className="btn primary block" onClick={() => onPracticeIds(wrong.map((it) => it.qid), 'Retry mistakes')}>
            Retry these {wrong.length} questions
          </button>
        )}
        <button className="btn block" onClick={onHome}>Back to home</button>
      </div>
    </div>
  )
}
