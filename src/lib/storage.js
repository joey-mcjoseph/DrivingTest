const KEY = 'korkort.v1'
const EMPTY = { attempts: [], inProgress: null }

export function load() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? { ...EMPTY, ...JSON.parse(raw) } : EMPTY
  } catch {
    return EMPTY
  }
}

export function save(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    // Storage full or unavailable (private mode) – the app still works for this session.
  }
}

export function exportData(state) {
  return JSON.stringify({ app: 'korkort', version: 1, ...state }, null, 2)
}

export function importData(text) {
  const data = JSON.parse(text)
  if (data.app !== 'korkort' || !Array.isArray(data.attempts)) throw new Error('Not a Körkort backup file')
  return { attempts: data.attempts, inProgress: null }
}
