import { useRef } from 'react'
import { EXAM, WEAK_THRESHOLD } from '../data/categories.js'
import { categoryStats, isWeak, pctText, topicStats } from '../lib/stats.js'

function formatDate(ts) {
  return new Date(ts).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
}

export default function Progress({ attempts, onOpenAttempt, onOpenTopic, onExport, onImport }) {
  const fileRef = useRef(null)
  const exams = attempts.filter((a) => a.mode === 'exam')
  const recent = exams.slice(-10)
  const cats = categoryStats(attempts)
  const topics = topicStats(attempts)
    .filter((t) => t.recentCount > 0)
    .sort((a, b) => a.pct - b.pct)
  const untouched = topicStats(attempts).filter((t) => t.recentCount === 0)

  return (
    <div className="page">
      <h1 className="page-title">Progress</h1>

      <section className="card">
        <h3>Exam scores</h3>
        {recent.length === 0 ? (
          <p className="muted-text">Take a mock exam to start your chart.</p>
        ) : (
          <div className="chart">
            <div className="chart-pass" style={{ bottom: `${(EXAM.passMark / EXAM.scoredQuestions) * 100}%` }}>
              <span>pass {EXAM.passMark}</span>
            </div>
            {recent.map((a) => (
              <button
                key={a.id}
                className={`chart-bar ${a.passed ? 'pass' : 'fail'}`}
                style={{ height: `${(a.score / EXAM.scoredQuestions) * 100}%` }}
                onClick={() => onOpenAttempt(a.id)}
                title={`${a.score}/${EXAM.scoredQuestions}`}
              >
                <span>{a.score}</span>
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="card">
        <h3>Areas</h3>
        <p className="muted-text small">Based on your last 30 answers in each area (all exams and practice).</p>
        {cats.map((c) => (
          <div key={c.id} className="bar-row">
            <div className="bar-label">
              {c.emoji} {c.short}
              <span>{pctText(c.pct)}</span>
            </div>
            <div className="bar-track">
              {c.pct != null && (
                <div className={`bar-fill ${c.pct < WEAK_THRESHOLD ? 'weak' : 'good'}`} style={{ width: `${c.pct * 100}%` }} />
              )}
            </div>
          </div>
        ))}
      </section>

      <section className="card">
        <h3>Topics: weakest first</h3>
        {topics.length === 0 && <p className="muted-text">Answer some questions to see your topics.</p>}
        {topics.map((t) => (
          <button key={t.id} className={`topic-row ${isWeak(t) ? 'weak' : ''}`} onClick={() => onOpenTopic(t.id)}>
            <span>{isWeak(t) ? '⚠️' : '✅'} {t.name}</span>
            <span className={`badge ${isWeak(t) ? 'weak' : 'good'}`}>{pctText(t.pct)}</span>
          </button>
        ))}
        {untouched.length > 0 && (
          <p className="muted-text small">Not practised yet: {untouched.map((t) => t.name).join(', ')}</p>
        )}
      </section>

      <section className="card">
        <h3>History</h3>
        {attempts.length === 0 && <p className="muted-text">Nothing yet.</p>}
        {[...attempts].reverse().slice(0, 30).map((a) => {
          const total = a.items.filter((it) => !it.trial).length
          return (
            <button key={a.id} className="history-row" onClick={() => onOpenAttempt(a.id)}>
              <span>
                <strong>{a.mode === 'exam' ? '📝 Mock exam' : `⚡ ${a.title}`}</strong>
                <small>{formatDate(a.finishedAt)}</small>
              </span>
              <span className={`badge ${a.mode === 'exam' ? (a.passed ? 'good' : 'weak') : ''}`}>
                {a.score}/{total}
              </span>
            </button>
          )
        })}
      </section>

      <section className="card muted">
        <h3>Backup</h3>
        <p className="muted-text small">Your progress is saved on this phone. Make a backup file if you switch phones.</p>
        <div className="row-btns">
          <button className="btn" onClick={onExport}>Save backup</button>
          <button className="btn" onClick={() => fileRef.current?.click()}>Restore</button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            hidden
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) f.text().then(onImport)
              e.target.value = ''
            }}
          />
        </div>
      </section>
    </div>
  )
}
