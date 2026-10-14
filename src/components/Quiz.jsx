import { useEffect, useRef, useState } from 'react'
import { QUESTION_BY_ID } from '../data/questions.js'
import { CATEGORY_BY_ID } from '../data/categories.js'
import { TOPIC_BY_ID } from '../data/topics.js'
import Sign from './Sign.jsx'
import DogBreak from './DogBreak.jsx'
import { prefetchDog } from '../lib/dogs.js'

const DOG_EVERY = 5

function formatTime(sec) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

export default function Quiz({ session, onUpdate, onFinish, onQuit }) {
  const isExam = session.mode === 'exam'
  const { items, current } = session
  const item = items[current]
  const q = QUESTION_BY_ID[item.qid]
  const answered = items.filter((it) => it.chosen != null).length
  const [dogAt, setDogAt] = useState(null)
  const [showGrid, setShowGrid] = useState(false)
  const latest = useRef(session)
  latest.current = session

  useEffect(() => {
    prefetchDog()
  }, [])

  // Exam countdown. Paused while the dog break is showing.
  useEffect(() => {
    if (!isExam || dogAt != null) return
    const id = setInterval(() => {
      const s = latest.current
      const remainingSec = s.remainingSec - 1
      if (remainingSec <= 0) onFinish({ ...s, remainingSec: 0 })
      else onUpdate({ ...s, remainingSec })
    }, 1000)
    return () => clearInterval(id)
  }, [isExam, dogAt, onUpdate, onFinish])

  const locked = !isExam && item.chosen != null

  function choose(opt) {
    if (locked) return
    const next = items.map((it, i) => (i === current ? { ...it, chosen: opt } : it))
    onUpdate({ ...session, items: next })
  }

  function maybeDog(s) {
    const n = s.items.filter((it) => it.chosen != null).length
    if (n > 0 && n % DOG_EVERY === 0 && n > (s.lastDogAt || 0)) {
      setDogAt(n)
      return { ...s, lastDogAt: n }
    }
    return s
  }

  function goTo(i) {
    onUpdate(maybeDog({ ...session, current: i }))
  }

  function next() {
    if (current < items.length - 1) goTo(current + 1)
    else finish()
  }

  function finish() {
    const missing = items.length - answered
    if (isExam && missing > 0 && !confirm(`You have ${missing} unanswered question${missing > 1 ? 's' : ''}. Hand in anyway?`)) return
    onFinish(session)
  }

  function quit() {
    if (confirm(isExam ? 'Pause this exam? You can continue it later from the home screen.' : 'Stop practising? Your answers so far will be saved.')) onQuit()
  }

  const isLast = current === items.length - 1
  const correct = item.chosen === q.a
  const lowTime = isExam && session.remainingSec < 5 * 60

  return (
    <div className="quiz">
      <header className="quiz-bar">
        <button className="btn ghost small" onClick={quit} aria-label="Pause or quit">✕</button>
        <button className="quiz-count" onClick={() => isExam && setShowGrid(true)}>
          {current + 1} / {items.length}{isExam && ' ▾'}
        </button>
        {isExam ? (
          <span className={`timer ${lowTime ? 'low' : ''}`}>⏱ {formatTime(session.remainingSec)}</span>
        ) : (
          <span className="timer">{session.title}</span>
        )}
      </header>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${(answered / items.length) * 100}%` }} />
      </div>

      <main className="quiz-body">
        <div className="q-meta">
          {CATEGORY_BY_ID[q.cat].emoji} {CATEGORY_BY_ID[q.cat].short} · {TOPIC_BY_ID[q.topic].name}
        </div>
        {q.sign && (
          <div className="q-sign">
            <Sign name={q.sign} panels={q.panels} />
          </div>
        )}
        <h2 className="q-text">{q.q}</h2>
        <div className="options">
          {item.options.map((opt, i) => {
            let cls = 'option'
            if (item.chosen === opt) cls += ' chosen'
            if (locked && opt === q.a) cls += ' right'
            if (locked && item.chosen === opt && !correct) cls += ' wrong'
            return (
              <button key={opt} className={cls} onClick={() => choose(opt)} disabled={locked}>
                <span className="opt-letter">{'ABCD'[i]}</span>
                <span>{opt}</span>
              </button>
            )
          })}
        </div>
        {locked && (
          <div className={`feedback ${correct ? 'ok' : 'bad'}`}>
            <strong>{correct ? '✅ Correct!' : '❌ Not quite.'}</strong> {q.why}
          </div>
        )}
      </main>

      <footer className="quiz-nav">
        {isExam && (
          <button className="btn" onClick={() => goTo(current - 1)} disabled={current === 0}>← Back</button>
        )}
        {isExam && !isLast && answered === items.length && (
          <button className="btn" onClick={finish}>Hand in</button>
        )}
        <button className="btn primary grow" onClick={next} disabled={!isExam && item.chosen == null}>
          {isLast ? (isExam ? 'Hand in' : 'See results') : 'Next →'}
        </button>
      </footer>

      {showGrid && (
        <div className="overlay" onClick={() => setShowGrid(false)}>
          <div className="grid-card" onClick={(e) => e.stopPropagation()}>
            <div className="grid-head">
              <strong>Questions</strong>
              <span>{answered} of {items.length} answered</span>
            </div>
            <div className="q-grid">
              {items.map((it, i) => (
                <button
                  key={it.qid}
                  className={`q-cell ${it.chosen != null ? 'done' : ''} ${i === current ? 'here' : ''}`}
                  onClick={() => {
                    setShowGrid(false)
                    onUpdate({ ...session, current: i })
                  }}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button className="btn primary block" onClick={() => { setShowGrid(false); finish() }}>Hand in exam</button>
          </div>
        </div>
      )}

      {dogAt != null && <DogBreak count={dogAt} onClose={() => setDogAt(null)} />}
    </div>
  )
}
