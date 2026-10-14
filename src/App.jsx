import { useCallback, useEffect, useState } from 'react'
import { EXAM } from './data/categories.js'
import { QUESTIONS, QUESTION_BY_ID } from './data/questions.js'
import { TOPIC_BY_ID } from './data/topics.js'
import { buildExam, buildPractice } from './lib/exam.js'
import { exportData, importData, load, save } from './lib/storage.js'
import { mistakeIds, seenCounts, weakTopics } from './lib/stats.js'
import Home from './components/Home.jsx'
import Quiz from './components/Quiz.jsx'
import Results from './components/Results.jsx'
import Study from './components/Study.jsx'
import Progress from './components/Progress.jsx'
import Signs from './components/Signs.jsx'

const TABS = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'study', label: 'Study', icon: '📚' },
  { id: 'signs', label: 'Signs', icon: '🚸' },
  { id: 'progress', label: 'Progress', icon: '📈' },
]

function newSession(mode, title, items) {
  return {
    id: `${Date.now()}`,
    mode,
    title,
    items: items.map((it) => ({ ...it, chosen: null })),
    current: 0,
    startedAt: Date.now(),
    lastDogAt: 0,
    ...(mode === 'exam' ? { remainingSec: EXAM.timeLimitSec } : {}),
  }
}

export default function App() {
  const [data, setData] = useState(load)
  const [view, setView] = useState({ name: 'home' })

  // Effect bodies use braces so nothing is returned: newer browsers make
  // scrollTo() return a Promise, which React would treat as a cleanup function.
  useEffect(() => {
    save(data)
  }, [data])
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [view])

  const start = (session) => {
    setData((d) => ({ ...d, inProgress: session }))
    setView({ name: 'quiz' })
  }

  const startPractice = (pool, title, n = 20) => {
    if (!pool.length) return
    start(newSession('practice', title, buildPractice(pool, n, seenCounts(data.attempts))))
  }

  const updateSession = useCallback((s) => setData((d) => ({ ...d, inProgress: s })), [])

  const finishSession = useCallback((s) => {
    const items = s.items.map(({ qid, chosen, trial }) => ({
      qid,
      chosen,
      trial,
      correct: chosen != null && chosen === QUESTION_BY_ID[qid]?.a,
    }))
    const score = items.filter((it) => it.correct && !it.trial).length
    const attempt = {
      id: s.id,
      mode: s.mode,
      title: s.title,
      startedAt: s.startedAt,
      finishedAt: Date.now(),
      durationSec: s.mode === 'exam' ? EXAM.timeLimitSec - s.remainingSec : null,
      items,
      score,
      ...(s.mode === 'exam' ? { passed: score >= EXAM.passMark } : {}),
    }
    setData((d) => ({ attempts: [...d.attempts, attempt], inProgress: null }))
    setView({ name: 'results', id: attempt.id })
  }, [])

  // Pausing keeps an exam so it can be resumed; practice is saved as it stands.
  const quitSession = () => {
    const s = data.inProgress
    if (s.mode === 'exam') setView({ name: 'home' })
    else if (s.items.some((it) => it.chosen != null)) {
      finishSession({ ...s, items: s.items.filter((it) => it.chosen != null) })
    } else {
      setData((d) => ({ ...d, inProgress: null }))
      setView({ name: 'home' })
    }
  }

  const confirmReplace = () =>
    !data.inProgress || confirm('Starting something new will discard your unfinished session. Continue?')

  const actions = {
    onExam: () => confirmReplace() && start(newSession('exam', 'Mock exam', buildExam(seenCounts(data.attempts)))),
    onResume: () => setView({ name: 'quiz' }),
    onQuick: () => confirmReplace() && startPractice(QUESTIONS, 'Quick 20'),
    onWeak: () => {
      if (!confirmReplace()) return
      const weak = new Set(weakTopics(data.attempts).map((t) => t.id))
      const pool = weak.size ? QUESTIONS.filter((q) => weak.has(q.topic)) : QUESTIONS
      startPractice(pool, 'Weak spots')
    },
    onMistakes: () => {
      if (!confirmReplace()) return
      const ids = new Set(mistakeIds(data.attempts))
      startPractice(QUESTIONS.filter((q) => ids.has(q.id)), 'My mistakes')
    },
  }

  const practiceTopic = (topicId) =>
    confirmReplace() && startPractice(QUESTIONS.filter((q) => q.topic === topicId), TOPIC_BY_ID[topicId].name, 10)

  const practiceIds = (ids, title) => {
    const set = new Set(ids)
    startPractice(QUESTIONS.filter((q) => set.has(q.id)), title, ids.length)
  }

  const handleExport = async () => {
    const text = exportData(data)
    const file = new File([text], `korkort-backup-${new Date().toISOString().slice(0, 10)}.json`, { type: 'application/json' })
    try {
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: 'Körkort backup' })
        return
      }
    } catch {
      // share cancelled or unsupported – fall back to download
    }
    const a = document.createElement('a')
    a.href = URL.createObjectURL(file)
    a.download = file.name
    a.click()
    URL.revokeObjectURL(a.href)
  }

  const handleImport = (text) => {
    try {
      const restored = importData(text)
      if (confirm(`Restore ${restored.attempts.length} saved attempts? This replaces the progress on this phone.`)) setData(restored)
    } catch (e) {
      alert(`Could not restore: ${e.message}`)
    }
  }

  const go = (name) => setView({ name })

  if (view.name === 'quiz' && data.inProgress) {
    return <Quiz session={data.inProgress} onUpdate={updateSession} onFinish={finishSession} onQuit={quitSession} />
  }

  let page
  if (view.name === 'results') {
    const attempt = data.attempts.find((a) => a.id === view.id)
    page = attempt ? (
      <Results attempt={attempt} onHome={() => go('home')} onPracticeIds={(ids, t) => confirmReplace() && practiceIds(ids, t)} />
    ) : null
  } else if (view.name === 'study') {
    page = <Study attempts={data.attempts} onPracticeTopic={practiceTopic} initialTopic={view.topic} />
  } else if (view.name === 'signs') {
    page = <Signs attempts={data.attempts} onQuiz={(pool, title, n) => confirmReplace() && startPractice(pool, title, n)} />
  } else if (view.name === 'progress') {
    page = (
      <Progress
        attempts={data.attempts}
        onOpenAttempt={(id) => setView({ name: 'results', id })}
        onOpenTopic={(topic) => setView({ name: 'study', topic })}
        onExport={handleExport}
        onImport={handleImport}
      />
    )
  }
  if (!page) {
    page = (
      <Home
        attempts={data.attempts}
        inProgress={data.inProgress}
        mistakeCount={mistakeIds(data.attempts).length}
        go={go}
        {...actions}
      />
    )
  }

  const activeTab = view.name === 'results' ? null : TABS.some((t) => t.id === view.name) ? view.name : 'home'

  return (
    <div className="app">
      {page}
      <nav className="tabbar">
        {TABS.map((t) => (
          <button key={t.id} className={activeTab === t.id ? 'active' : ''} onClick={() => go(t.id)}>
            <span className="tab-icon">{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}
