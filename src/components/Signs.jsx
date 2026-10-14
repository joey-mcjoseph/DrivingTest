import { useState } from 'react'
import { PARKING_EXAMPLES, SIGN_GROUPS, SIGNS } from '../data/signs.js'
import { QUESTIONS, QUESTION_BY_ID } from '../data/questions.js'
import { allAnswers, pctText } from '../lib/stats.js'
import { WEAK_THRESHOLD } from '../data/categories.js'
import Sign from './Sign.jsx'

// Accuracy on the last 30 answers to questions in a sign group.
function groupScore(attempts, group) {
  const recent = allAnswers(attempts).filter((a) => QUESTION_BY_ID[a.qid].group === group).slice(0, 30)
  return recent.length ? recent.filter((a) => a.correct).length / recent.length : null
}

function Badge({ pct }) {
  const cls = pct == null ? '' : pct < WEAK_THRESHOLD ? 'weak' : 'good'
  return <span className={`badge ${cls}`}>{pctText(pct)}</span>
}

function Card({ item, revealed, onToggle }) {
  return (
    <button className={`sign-card ${revealed ? 'open' : ''}`} onClick={onToggle}>
      <Sign name={item.sign} panels={item.panels} size={72} />
      {revealed ? (
        <span className="sign-text">
          <strong>{item.name}</strong>
          <span>{item.meaning}</span>
        </span>
      ) : (
        <span className="sign-text hidden-meaning">Tap to reveal</span>
      )}
    </button>
  )
}

export default function Signs({ attempts, onQuiz }) {
  const [open, setOpen] = useState({})
  const [showAll, setShowAll] = useState(false)
  const toggle = (key) => setOpen((o) => ({ ...o, [key]: !o[key] }))

  const roadPool = QUESTIONS.filter((q) => q.topic === 'roadsigns')
  const parkingPool = QUESTIONS.filter((q) => q.topic === 'parkingsigns')

  const sections = [
    ...SIGN_GROUPS.map((g) => ({ ...g, items: SIGNS.filter((s) => s.group === g.id), pool: roadPool.filter((q) => q.group === g.id) })),
    {
      id: 'parking',
      name: 'Parking signs & panels',
      hint: 'Black times = Mon–Fri, (brackets) = Saturdays, red = Sundays and holidays.',
      items: PARKING_EXAMPLES,
      pool: parkingPool,
    },
  ]

  return (
    <div className="page">
      <h1 className="page-title">Signs</h1>
      <p className="muted-text">Learn the Swedish road and parking signs. Tap a sign to see what it means, then test yourself.</p>

      <div className="tile-row">
        <button className="tile" onClick={() => onQuiz(roadPool, 'Road signs', 20)}>
          <span className="tile-emoji">🚸</span>
          <strong>Road sign quiz</strong>
          <span>20 random signs</span>
        </button>
        <button className="tile" onClick={() => onQuiz(parkingPool, 'Parking signs', 20)}>
          <span className="tile-emoji">🅿️</span>
          <strong>Parking quiz</strong>
          <span>Signs, panels and times</span>
        </button>
      </div>

      <label className="switch-row">
        <input type="checkbox" checked={showAll} onChange={(e) => setShowAll(e.target.checked)} />
        Show all meanings
      </label>

      {sections.map((sec) => (
        <section key={sec.id} className="study-cat">
          <div className="sign-sec-head">
            <h2>{sec.name}</h2>
            <Badge pct={groupScore(attempts, sec.id)} />
          </div>
          <p className="cat-hint">{sec.hint}</p>
          <div className="sign-grid">
            {sec.items.map((item, i) => {
              const key = `${sec.id}-${i}`
              return <Card key={key} item={item} revealed={showAll || open[key]} onToggle={() => toggle(key)} />
            })}
          </div>
          <button className="btn block" onClick={() => onQuiz(sec.pool, sec.name, Math.min(sec.pool.length, 15))}>
            Quiz: {sec.name.toLowerCase()} ({Math.min(sec.pool.length, 15)})
          </button>
        </section>
      ))}
    </div>
  )
}
