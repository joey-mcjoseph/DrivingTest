async function fetchJson(url, ms = 5000) {
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), ms)
  try {
    const res = await fetch(url, { signal: ctrl.signal, cache: 'no-store' })
    if (!res.ok) throw new Error(res.status)
    return await res.json()
  } finally {
    clearTimeout(t)
  }
}

// random.dog serves GIFs and short videos; the filter param excludes still images.
// dog.ceo (still photos) is the fallback, and an emoji if offline.
export async function fetchDog() {
  try {
    const d = await fetchJson('https://random.dog/woof.json?filter=jpg,jpeg,png,JPG,JPEG,PNG')
    if (d?.url && (d.fileSizeBytes == null || d.fileSizeBytes < 8_000_000)) {
      return { url: d.url, video: /\.(mp4|webm)$/i.test(d.url) }
    }
  } catch {
    // fall through to the next source
  }
  try {
    const d = await fetchJson('https://dog.ceo/api/breeds/image/random')
    if (d?.status === 'success') return { url: d.message, video: false }
  } catch {
    // offline
  }
  return null
}

// Fetch the next dog ahead of time so it appears instantly at the break.
let nextDog = null
export function prefetchDog() {
  if (!nextDog) nextDog = fetchDog()
}
export function takeDog() {
  const p = nextDog || fetchDog()
  nextDog = null
  return p
}
