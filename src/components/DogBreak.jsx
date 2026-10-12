import { useEffect, useState } from 'react'
import { prefetchDog, takeDog } from '../lib/dogs.js'

const CHEERS = [
  'Good job! Five more down 🐾',
  'You\'re doing amazing! Keep going!',
  'Paws for a second… you\'ve got this!',
  'This pup believes in you!',
  'Woof! That\'s the spirit!',
  'Almost a licensed driver! 🚗',
  'Every question gets you closer to that körkort!',
  'Treat yourself to this dog. You earned it.',
  'Heja heja! 💛💙',
]

export default function DogBreak({ count, onClose }) {
  const [dog, setDog] = useState(undefined) // undefined = loading, null = unavailable
  const [failed, setFailed] = useState(false)
  const [cheer] = useState(() => CHEERS[Math.floor(Math.random() * CHEERS.length)])

  useEffect(() => {
    let alive = true
    takeDog().then((d) => alive && setDog(d))
    return () => {
      alive = false
      prefetchDog()
    }
  }, [])

  return (
    <div className="overlay" role="dialog" aria-modal="true">
      <div className="dog-card">
        <div className="dog-title">🐶 Dog break!</div>
        <div className="dog-sub">{count} questions done</div>
        <div className="dog-media">
          {dog === undefined && <div className="dog-emoji pulse">🐕</div>}
          {(dog === null || failed) && <div className="dog-emoji">🐶</div>}
          {dog && !failed &&
            (dog.video ? (
              <video src={dog.url} autoPlay loop muted playsInline onError={() => setFailed(true)} />
            ) : (
              <img src={dog.url} alt="A very good dog" onError={() => setFailed(true)} />
            ))}
        </div>
        <p className="dog-cheer">{cheer}</p>
        <button className="btn primary block" onClick={onClose}>Woof! Keep going →</button>
      </div>
    </div>
  )
}
