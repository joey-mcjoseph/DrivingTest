import { EXAM } from '../data/categories.js'
import { pctText, weakTopics } from '../lib/stats.js'

export default function Home({ attempts, inProgress, mistakeCount, onExam, onResume, onQuick, onWeak, onMistakes, go }) {
  const exams = attempts.filter((a) => a.mode === 'exam')
  const last = exams[exams.length - 1]
  const passes = exams.filter((a) => a.passed).length
  const weak = weakTopics(attempts).slice(0, 3)

  return (
    <div className="page">
      <div className="hero">
        <div className="hero-flag">🇸🇪</div>
        <h1>Körkort Practice</h1>
        <p>Swedish B-licence theory test</p>
      </div>

      {inProgress && (
        <button className="card resume" onClick={onResume}>
          <strong>▶ Continue where you left off</strong>
          <span>
            {inProgress.title}: question {inProgress.current + 1} of {inProgress.items.length}
          </span>
        </button>
      )}

      <button className="card big-action" onClick={onExam}>
        <div className="ba-emoji">📝</div>
        <div>
          <strong>Full mock exam</strong>
          <span>{EXAM.totalQuestions} questions · 50 min · pass with {EXAM.passMark}/{EXAM.scoredQuestions}</span>
        </div>
      </button>

      <div className="tile-row">
        <button className="tile" onClick={onQuick}>
          <span className="tile-emoji">⚡</span>
          <strong>Quick 20</strong>
          <span>Mixed practice with answers</span>
        </button>
        <button className="tile" onClick={onWeak}>
          <span className="tile-emoji">🎯</span>
          <strong>Weak spots</strong>
          <span>{weak.length ? 'Practise what you miss most' : 'Mixed practice for now'}</span>
        </button>
        <button className="tile" onClick={onMistakes} disabled={!mistakeCount}>
          <span className="tile-emoji">🔁</span>
          <strong>My mistakes</strong>
          <span>{mistakeCount ? `${mistakeCount} to fix` : 'None yet!'}</span>
        </button>
        <button className="tile" onClick={() => go('study')}>
          <span className="tile-emoji">📚</span>
          <strong>Study</strong>
          <span>Notes by topic</span>
        </button>
      </div>

      <section className="card">
        <h3>Your progress</h3>
        {exams.length === 0 ? (
          <p className="muted-text">No exams yet. Take your first mock exam to see where you stand!</p>
        ) : (
          <div className="stat-row">
            <div className="stat"><b>{exams.length}</b><span>exams</span></div>
            <div className="stat"><b>{passes}</b><span>passed</span></div>
            <div className="stat"><b>{last.score}/{EXAM.scoredQuestions}</b><span>last score</span></div>
          </div>
        )}
        {weak.length > 0 && (
          <>
            <p className="weak-head">Needs work:</p>
            <ul className="chip-list">
              {weak.map((t) => (
                <li key={t.id} className="chip weak">{t.name} · {pctText(t.pct)}</li>
              ))}
            </ul>
          </>
        )}
        <button className="btn block" onClick={() => go('progress')}>See full progress →</button>
      </section>
    </div>
  )
}
