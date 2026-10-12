// Simplified Swedish road signs drawn in SVG, so no image files are needed.
const YELLOW = '#f7d117'
const RED = '#d52b1e'
const BLUE = '#1f5fae'

function Round({ fill, ring = RED, children }) {
  return (
    <>
      <circle cx="50" cy="50" r="46" fill="#fff" />
      <circle cx="50" cy="50" r="42" fill={fill} stroke={ring} strokeWidth="11" />
      {children}
    </>
  )
}

const SIGNS = {
  giveway: () => (
    <polygon points="6,12 94,12 50,90" fill={YELLOW} stroke={RED} strokeWidth="9" strokeLinejoin="round" />
  ),
  stop: () => (
    <>
      <polygon points="30,3 70,3 97,30 97,70 70,97 30,97 3,70 3,30" fill={RED} stroke="#fff" strokeWidth="4" />
      <text x="50" y="61" textAnchor="middle" fontSize="28" fontWeight="800" fill="#fff" fontFamily="Arial, sans-serif">STOP</text>
    </>
  ),
  priority: () => (
    <>
      <polygon points="50,3 97,50 50,97 3,50" fill="#fff" stroke="#222" strokeWidth="1.5" />
      <polygon points="50,18 82,50 50,82 18,50" fill={YELLOW} />
    </>
  ),
  'end-priority': () => (
    <>
      <polygon points="50,3 97,50 50,97 3,50" fill="#fff" stroke="#222" strokeWidth="1.5" />
      <polygon points="50,18 82,50 50,82 18,50" fill={YELLOW} />
      <line x1="30" y1="70" x2="70" y2="30" stroke="#222" strokeWidth="7" />
    </>
  ),
  'no-entry': () => (
    <>
      <circle cx="50" cy="50" r="46" fill={RED} stroke="#fff" strokeWidth="3" />
      <rect x="20" y="42" width="60" height="16" fill="#fff" />
    </>
  ),
  'no-stopping': () => (
    <Round fill={BLUE}>
      <line x1="22" y1="22" x2="78" y2="78" stroke={RED} strokeWidth="9" />
      <line x1="78" y1="22" x2="22" y2="78" stroke={RED} strokeWidth="9" />
    </Round>
  ),
  'no-parking': () => (
    <Round fill={BLUE}>
      <line x1="22" y1="22" x2="78" y2="78" stroke={RED} strokeWidth="9" />
    </Round>
  ),
  roundabout: () => (
    <>
      <circle cx="50" cy="50" r="46" fill={BLUE} stroke="#fff" strokeWidth="3" />
      {/* mirrored so the arrows run anticlockwise, as on the Swedish D3 sign */}
      <g transform="translate(100 0) scale(-1 1)">
        {[0, 120, 240].map((r) => (
          <g key={r} transform={`rotate(${r} 50 50)`}>
            <path d="M50 22 A28 28 0 0 1 74 36" fill="none" stroke="#fff" strokeWidth="7" />
            <polygon points="80,30 78,46 66,38" fill="#fff" />
          </g>
        ))}
      </g>
    </>
  ),
  parking: () => (
    <>
      <rect x="4" y="4" width="92" height="92" rx="8" fill={BLUE} stroke="#fff" strokeWidth="3" />
      <text x="50" y="72" textAnchor="middle" fontSize="62" fontWeight="800" fill="#fff" fontFamily="Arial, sans-serif">P</text>
    </>
  ),
  crossing: () => (
    <>
      <rect x="4" y="4" width="92" height="92" rx="6" fill={BLUE} />
      <polygon points="50,14 88,84 12,84" fill="#fff" />
      <circle cx="52" cy="36" r="5" fill="#222" />
      <path d="M51 42 L46 60 L40 76 M47 58 L56 76 M50 46 L60 54 M49 46 L42 54" stroke="#222" strokeWidth="4" fill="none" strokeLinecap="round" />
      <rect x="22" y="78" width="56" height="4" fill="#222" />
    </>
  ),
}

export default function Sign({ name, size = 110 }) {
  let body
  if (name.startsWith('speed-')) {
    const n = name.slice(6)
    body = (
      <Round fill={YELLOW}>
        <text x="50" y="62" textAnchor="middle" fontSize="34" fontWeight="800" fill="#111" fontFamily="Arial, sans-serif">{n}</text>
      </Round>
    )
  } else {
    const Draw = SIGNS[name]
    if (!Draw) return null
    body = <Draw />
  }
  return (
    <svg className="sign" width={size} height={size} viewBox="0 0 100 100" role="img" aria-label={`Road sign: ${name}`}>
      {body}
    </svg>
  )
}
