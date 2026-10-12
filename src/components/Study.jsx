import { useState } from 'react'
import { CATEGORIES } from '../data/categories.js'
import { QUESTIONS } from '../data/questions.js'
import { isWeak, pctText, topicStats } from '../lib/stats.js'

export default function Study({ attempts, onPracticeTopic, initialTopic }) {
  const [open, setOpen] = useState(initialTopic || null)
  const stats = Object.fromEntries(topicStats(attempts).map((t) => [t.id, t]))

  return (
    <div className="page">
      <h1 className="page-title">Study</h1>
      <p className="muted-text">
        Read the notes for a topic, then practise just that topic. Topics marked red are where you are below 80%.
      </p>
      {CATEGORIES.map((c) => (
        <section key={c.id} className="study-cat">
          <h2>{c.emoji} {c.name}</h2>
          <p className="cat-hint">{c.quota} of the 65 scored questions</p>
          {Object.values(stats).filter((t) => t.cat === c.id).map((t) => {
            const count = QUESTIONS.filter((q) => q.topic === t.id).length
            const weak = isWeak(t)
            const expanded = open === t.id
            return (
              <div key={t.id} className={`topic ${weak ? 'weak' : ''}`}>
                <button className="topic-head" onClick={() => setOpen(expanded ? null : t.id)}>
                  <span className="topic-name">{weak && '⚠️ '}{t.name}</span>
                  <span className={`badge ${t.pct == null ? '' : weak ? 'weak' : 'good'}`}>{pctText(t.pct)}</span>
                  <span className="chev">{expanded ? '▴' : '▾'}</span>
                </button>
                {expanded && (
                  <div className="topic-body">
                    <ul className="notes">
                      {t.notes.map((n) => <li key={n}>{n}</li>)}
                    </ul>
                    <button className="btn primary block" onClick={() => onPracticeTopic(t.id)}>
                      Practise {t.name} ({Math.min(count, 10)} questions)
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </section>
      ))}
    </div>
  )
}
