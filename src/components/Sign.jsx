// Simplified Swedish road signs drawn in SVG, so no image files are needed.
// Codes in comments refer to the Swedish sign catalogue (A = warning, B = priority,
// C = prohibitory, D = mandatory, E = instruction).
const YELLOW = '#f7d117'
const RED = '#d52b1e'
const BLUE = '#1f5fae'
const INK = '#111'

// ── Building blocks ───────────────────────────────────────────────
function Warn({ children }) {
  return (
    <>
      <polygon points="50,6 96,88 4,88" fill="#fff" />
      <polygon points="50,12 91,85 9,85" fill={YELLOW} stroke={RED} strokeWidth="8" strokeLinejoin="round" />
      {children}
    </>
  )
}

function Round({ fill = YELLOW, ring = RED, children }) {
  return (
    <>
      <circle cx="50" cy="50" r="47" fill="#fff" />
      <circle cx="50" cy="50" r="41" fill={fill} stroke={ring} strokeWidth="11" />
      {children}
    </>
  )
}

function BlueRound({ children }) {
  return (
    <>
      <circle cx="50" cy="50" r="46" fill={BLUE} stroke="#fff" strokeWidth="3" />
      {children}
    </>
  )
}

function BlueSquare({ children }) {
  return (
    <>
      <rect x="4" y="4" width="92" height="92" rx="8" fill={BLUE} stroke="#fff" strokeWidth="3" />
      {children}
    </>
  )
}

function Person({ x, y, s = 1, color = INK }) {
  // Walking figure; (x, y) is the top of the head.
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} stroke={color} strokeWidth="4" strokeLinecap="round" fill="none">
      <circle cx="0" cy="3" r="3.5" fill={color} stroke="none" />
      <path d="M0 9 L-2 22 M-2 22 L-7 34 M-2 22 L5 34 M-1 12 L7 19 M-1 12 L-8 18" />
    </g>
  )
}

function Bike({ x, y, s = 1, color = INK }) {
  // Bicycle with rider; (x, y) is the centre of the frame.
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} stroke={color} strokeWidth="3" fill="none" strokeLinecap="round">
      <circle cx="-11" cy="6" r="7" />
      <circle cx="11" cy="6" r="7" />
      <path d="M-11 6 L-3 -4 L6 -4 L11 6 M-3 -4 L0 6 L-11 6 M6 -4 L4 -9" />
      <circle cx="1" cy="-19" r="3" fill={color} stroke="none" />
      <path d="M0 -15 L-3 -5 L0 6 M0 -13 L6 -8" />
    </g>
  )
}

function Car({ x, y, s = 1, color = INK }) {
  // Car seen from behind; (x, y) is the centre.
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={color}>
      <path d="M-9 -9 L9 -9 L12 -1 L-12 -1 Z" />
      <rect x="-14" y="-2" width="28" height="11" rx="2" />
      <rect x="-12" y="8" width="6" height="5" rx="1" />
      <rect x="6" y="8" width="6" height="5" rx="1" />
    </g>
  )
}

function Arrow({ d, color = '#fff', w = 8 }) {
  return <path d={d} fill="none" stroke={color} strokeWidth={w} strokeLinejoin="round" />
}

function Text({ x = 50, y, size, children, color = INK, weight = 800 }) {
  return (
    <text x={x} y={y} textAnchor="middle" fontSize={size} fontWeight={weight} fill={color} fontFamily="Arial, Helvetica, sans-serif">
      {children}
    </text>
  )
}

const ROUNDABOUT_ARROWS = (
  // mirrored so the arrows run anticlockwise, as on the Swedish signs
  <g transform="translate(100 0) scale(-1 1)">
    {[0, 120, 240].map((r) => (
      <g key={r} transform={`rotate(${r} 50 50)`}>
        <path d="M50 22 A28 28 0 0 1 74 36" fill="none" stroke="currentColor" strokeWidth="7" />
        <polygon points="80,30 78,46 66,38" fill="currentColor" />
      </g>
    ))}
  </g>
)

// ── Signs ──────────────────────────────────────────────────────────
const SIGNS = {
  // Warning signs (A)
  'w-curve': () => <Warn><Arrow color={INK} w="6" d="M42 78 L42 60 Q42 46 58 44 L58 38 M50 38 L58 38 L58 46" /></Warn>,
  'w-curves': () => <Warn><Arrow color={INK} w="5" d="M40 80 Q40 68 52 64 Q62 60 54 50 Q46 42 56 36 M50 34 L57 35 L56 42" /></Warn>,
  'w-hill': () => (
    <Warn>
      <polygon points="24,76 76,76 76,54" fill={INK} />
      <Text x="44" y="62" size="13">10%</Text>
    </Warn>
  ),
  'w-narrows': () => <Warn><Arrow color={INK} w="5" d="M34 78 L34 66 L42 52 L42 38 M66 78 L66 66 L58 52 L58 38" /></Warn>,
  'w-bump': () => <Warn><path d="M22 74 L36 74 Q50 52 64 74 L78 74" fill="none" stroke={INK} strokeWidth="5" /></Warn>,
  'w-slippery': () => (
    <Warn>
      <Car x="50" y="50" s="0.9" />
      <Arrow color={INK} w="3" d="M38 76 Q34 70 40 66 M62 76 Q66 70 60 66" />
    </Warn>
  ),
  'w-pedestrian': () => <Warn><Person x="50" y="38" s="1.05" /></Warn>,
  'w-children': () => <Warn><Person x="42" y="38" s="1.05" /><Person x="60" y="50" s="0.7" /></Warn>,
  'w-cyclists': () => <Warn><Bike x="50" y="64" s="1" /></Warn>,
  'w-elk': () => (
    <Warn>
      <g fill={INK}>
        <ellipse cx="55" cy="60" rx="15" ry="7.5" />
        <path d="M44 57 Q46 51 52 52 L56 54 Z" />
        <path d="M42 58 L34 54 L27 61 L29 65 L36 62 L42 64 Z" />
        <path d="M35 55 L31 47 L34 48 L35 44 L38 49 L40 46 L40 53 Z" />
        <rect x="43" y="63" width="3" height="16" />
        <rect x="48" y="64" width="3" height="15" />
        <rect x="61" y="64" width="3" height="15" />
        <rect x="66" y="62" width="3" height="17" />
      </g>
    </Warn>
  ),
  'w-roadworks': () => (
    <Warn>
      <Person x="44" y="38" s="1" />
      <path d="M51 56 L62 70" stroke={INK} strokeWidth="3" />
      <path d="M58 76 Q66 64 74 76 Z" fill={INK} />
    </Warn>
  ),
  'w-signals': () => (
    <Warn>
      <rect x="42" y="34" width="16" height="44" rx="3" fill={INK} />
      <circle cx="50" cy="42" r="5" fill={RED} />
      <circle cx="50" cy="56" r="5" fill="#f5b400" />
      <circle cx="50" cy="70" r="5" fill="#1a9a4a" />
    </Warn>
  ),
  'w-twoway': () => (
    <Warn>
      <Arrow color={INK} w="5" d="M42 78 L42 42 M35 49 L42 40 L49 49" />
      <Arrow color={INK} w="5" d="M58 38 L58 74 M51 67 L58 76 L65 67" />
    </Warn>
  ),
  'w-junction': () => <Warn><path d="M50 36 L50 80 M32 60 L68 60" stroke={INK} strokeWidth="7" /></Warn>,
  'w-sideroad': () => <Warn><path d="M50 36 L50 80" stroke={INK} strokeWidth="9" /><path d="M32 60 L68 60" stroke={INK} strokeWidth="4" /></Warn>,
  'w-roundabout': () => (
    <Warn>
      <g transform="translate(29 39) scale(0.42)" color={INK}>{ROUNDABOUT_ARROWS}</g>
    </Warn>
  ),
  'w-gates': () => (
    <Warn>
      <rect x="28" y="54" width="44" height="7" fill={INK} />
      <rect x="28" y="66" width="44" height="7" fill={INK} />
      <path d="M33 50 L33 78 M67 50 L67 78" stroke={INK} strokeWidth="4" />
    </Warn>
  ),
  'w-train': () => (
    <Warn>
      <g fill={INK}>
        <rect x="30" y="56" width="34" height="14" />
        <rect x="52" y="46" width="12" height="12" />
        <rect x="34" y="48" width="6" height="9" />
        <circle cx="37" cy="74" r="4" />
        <circle cx="49" cy="74" r="4" />
        <circle cx="60" cy="74" r="4" />
        <rect x="64" y="64" width="6" height="6" />
      </g>
    </Warn>
  ),
  'w-danger': () => <Warn><rect x="46" y="36" width="8" height="28" rx="3" fill={INK} /><circle cx="50" cy="73" r="5" fill={INK} /></Warn>,
  'rail-distance': () => (
    <>
      <rect x="32" y="2" width="36" height="96" rx="3" fill="#fff" stroke="#999" strokeWidth="1.5" />
      {[14, 42, 70].map((y) => (
        <polygon key={y} points={`34,${y + 14} 66,${y} 66,${y + 10} 34,${y + 24}`} fill={RED} />
      ))}
    </>
  ),
  'rail-cross': () => (
    <g transform="rotate(45 50 50)">
      <rect x="10" y="42" width="80" height="16" fill="#fff" stroke={RED} strokeWidth="4" />
      <rect x="42" y="10" width="16" height="80" fill="#fff" stroke={RED} strokeWidth="4" />
      <rect x="44" y="44" width="12" height="12" fill="#fff" />
    </g>
  ),

  // Priority signs (B)
  giveway: () => <polygon points="6,12 94,12 50,90" fill={YELLOW} stroke={RED} strokeWidth="9" strokeLinejoin="round" />,
  stop: () => (
    <>
      <polygon points="30,3 70,3 97,30 97,70 70,97 30,97 3,70 3,30" fill={RED} stroke="#fff" strokeWidth="4" />
      <Text y="61" size="28" color="#fff">STOP</Text>
    </>
  ),
  crossing: () => (
    <BlueSquare>
      <polygon points="50,14 88,84 12,84" fill="#fff" />
      <Person x="50" y="34" s="1.15" />
      <rect x="22" y="78" width="56" height="4" fill={INK} />
    </BlueSquare>
  ),
  'bike-crossing': () => (
    <BlueSquare>
      <polygon points="50,14 88,84 12,84" fill="#fff" />
      <Bike x="50" y="66" s="0.95" />
    </BlueSquare>
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
  'oncoming-priority': () => (
    <Round>
      <Arrow color={INK} w="6" d="M38 78 L38 30 M31 38 L38 28 L45 38" />
      <Arrow color={RED} w="6" d="M62 22 L62 70 M55 62 L62 72 L69 62" />
    </Round>
  ),
  'priority-over-oncoming': () => (
    <BlueSquare>
      <Arrow color="#fff" w="7" d="M38 82 L38 28 M30 37 L38 26 L46 37" />
      <Arrow color={RED} w="7" d="M62 18 L62 72 M54 63 L62 74 L70 63" />
    </BlueSquare>
  ),

  // Prohibitory signs (C)
  'no-entry': () => (
    <>
      <circle cx="50" cy="50" r="46" fill={RED} stroke="#fff" strokeWidth="3" />
      <rect x="20" y="42" width="60" height="16" fill="#fff" />
    </>
  ),
  'no-vehicles': () => <Round />,
  'no-overtaking': () => (
    <Round>
      <Car x="36" y="50" s="1" color={RED} />
      <Car x="64" y="50" s="1" color={INK} />
    </Round>
  ),
  'no-uturn': () => (
    <Round>
      <Arrow color={INK} w="6" d="M60 76 L60 42 Q60 28 47 28 Q34 28 34 42 L34 58 M27 50 L34 61 L41 50" />
      <line x1="22" y1="78" x2="78" y2="22" stroke={RED} strokeWidth="7" />
    </Round>
  ),
  'no-left': () => (
    <Round>
      <Arrow color={INK} w="6" d="M58 78 L58 46 L32 46 M40 37 L29 46 L40 55" />
      <line x1="22" y1="78" x2="78" y2="22" stroke={RED} strokeWidth="7" />
    </Round>
  ),
  'weight-limit': () => <Round><Text y="60" size="26">3.5t</Text></Round>,
  'height-limit': () => (
    <Round>
      <Text y="59" size="22">3.3m</Text>
      <polygon points="42,22 58,22 50,30" fill={INK} />
      <polygon points="42,78 58,78 50,70" fill={INK} />
    </Round>
  ),
  'no-pedestrians': () => (
    <Round>
      <Person x="50" y="26" s="1.3" />
      <line x1="22" y1="78" x2="78" y2="22" stroke={RED} strokeWidth="7" />
    </Round>
  ),
  'no-parking': () => (
    <Round fill={BLUE}>
      <line x1="22" y1="22" x2="78" y2="78" stroke={RED} strokeWidth="9" />
    </Round>
  ),
  'no-stopping': () => (
    <Round fill={BLUE}>
      <line x1="22" y1="22" x2="78" y2="78" stroke={RED} strokeWidth="9" />
      <line x1="78" y1="22" x2="22" y2="78" stroke={RED} strokeWidth="9" />
    </Round>
  ),
  'no-parking-odd': () => (
    <Round fill={BLUE}>
      <line x1="22" y1="22" x2="78" y2="78" stroke={RED} strokeWidth="9" />
      <rect x="47" y="24" width="6" height="16" fill="#fff" />
    </Round>
  ),
  'no-parking-even': () => (
    <Round fill={BLUE}>
      <line x1="22" y1="22" x2="78" y2="78" stroke={RED} strokeWidth="9" />
      <rect x="42" y="24" width="6" height="16" fill="#fff" />
      <rect x="52" y="24" width="6" height="16" fill="#fff" />
    </Round>
  ),
  'parking-zone': () => (
    <>
      <rect x="10" y="2" width="80" height="96" rx="6" fill="#fff" stroke={INK} strokeWidth="2" />
      <g transform="translate(22 8) scale(0.56)">
        <Round fill={BLUE}>
          <line x1="22" y1="22" x2="78" y2="78" stroke={RED} strokeWidth="9" />
        </Round>
      </g>
      <Text y="88" size="20">ZON</Text>
    </>
  ),

  // Mandatory signs (D)
  ahead: () => <BlueRound><Arrow d="M50 80 L50 26 M38 40 L50 24 L62 40" w="9" /></BlueRound>,
  'turn-right': () => <BlueRound><Arrow d="M36 80 L36 50 L70 50 M58 38 L72 50 L58 62" w="9" /></BlueRound>,
  'keep-right': () => <BlueRound><Arrow d="M30 30 L68 68 M68 50 L68 68 L50 68" w="9" /></BlueRound>,
  roundabout: () => <BlueRound><g color="#fff">{ROUNDABOUT_ARROWS}</g></BlueRound>,
  'bike-path': () => <BlueRound><Bike x="50" y="56" s="1.2" color="#fff" /></BlueRound>,
  footpath: () => <BlueRound><Person x="50" y="22" s="1.45" color="#fff" /></BlueRound>,
  'shared-path': () => (
    <BlueRound>
      <path d="M50 8 L50 92" stroke="#fff" strokeWidth="3" />
      <Person x="31" y="30" s="0.95" color="#fff" />
      <Bike x="70" y="55" s="0.65" color="#fff" />
    </BlueRound>
  ),

  // Instruction signs (E)
  parking: () => (
    <BlueSquare>
      <Text y="72" size="62" color="#fff">P</Text>
    </BlueSquare>
  ),
  'one-way': () => <BlueSquare><Arrow d="M50 84 L50 22 M36 38 L50 20 L64 38" w="10" /></BlueSquare>,
  'dead-end': () => (
    <BlueSquare>
      <rect x="42" y="38" width="16" height="48" fill="#fff" />
      <rect x="24" y="22" width="52" height="16" fill={RED} />
    </BlueSquare>
  ),
  'passing-place': () => <BlueSquare><Text y="72" size="58" color="#fff">M</Text></BlueSquare>,
  'home-zone': () => (
    <BlueSquare>
      <path d="M14 56 L32 40 L50 56 L50 80 L14 80 Z" fill="#fff" />
      <Person x="66" y="40" s="1.05" color="#fff" />
      <circle cx="80" cy="76" r="5" fill="#fff" />
    </BlueSquare>
  ),
  'pedestrian-street': () => (
    <BlueSquare>
      <Person x="38" y="28" s="1.25" color="#fff" />
      <Person x="64" y="40" s="0.9" color="#fff" />
    </BlueSquare>
  ),
  'bike-street': () => (
    <BlueSquare>
      <Bike x="50" y="44" s="1.1" color="#fff" />
      <Car x="50" y="80" s="0.6" color="#fff" />
    </BlueSquare>
  ),
  'recommended-speed': () => <BlueSquare><Text y="68" size="44" color="#fff">30</Text></BlueSquare>,
}

// Small symbols used on additional panels under a sign.
const PANEL_SYMBOLS = {
  disabled: (
    <svg viewBox="0 0 40 40" width="1.8em" height="1.8em" aria-label="disabled symbol">
      <rect width="40" height="40" rx="4" fill={BLUE} />
      <circle cx="20" cy="8" r="3.5" fill="#fff" />
      <path d="M19 13 L19 24 L28 24 L31 32 M19 18 L27 18" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M14 20 A9 9 0 1 0 26 30" stroke="#fff" strokeWidth="3" fill="none" />
    </svg>
  ),
  disc: (
    <svg viewBox="0 0 40 40" width="1.8em" height="1.8em" aria-label="parking disc symbol">
      <rect width="40" height="40" rx="4" fill={BLUE} />
      <circle cx="20" cy="22" r="12" fill="#fff" />
      <path d="M20 22 L20 14 M20 22 L26 25" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
      <text x="20" y="8" textAnchor="middle" fontSize="7" fontWeight="800" fill="#fff" fontFamily="Arial">P</text>
    </svg>
  ),
}

// A panel line is a list of segments: "8–18" (black), "!11–15" (red: Sundays and
// public holidays) or "#disc" / "#disabled" (symbols).
function Panel({ line, fontSize }) {
  return (
    <div className="sign-panel" style={{ fontSize }}>
      {line.map((seg) =>
        seg.startsWith('#') ? (
          <span key={seg}>{PANEL_SYMBOLS[seg.slice(1)]}</span>
        ) : (
          <span key={seg} className={seg.startsWith('!') ? 'red' : ''}>{seg.replace(/^!/, '')}</span>
        ),
      )}
    </div>
  )
}

export default function Sign({ name, panels, size = 110 }) {
  let body
  if (name.startsWith('speed-')) {
    body = (
      <Round>
        <Text y="62" size="34">{name.slice(6)}</Text>
      </Round>
    )
  } else {
    const Draw = SIGNS[name]
    if (!Draw) return null
    body = <Draw />
  }
  const svg = (
    <svg className="sign" width={size} height={size} viewBox="0 0 100 100" role="img" aria-label={`Road sign: ${name}`}>
      {body}
    </svg>
  )
  if (!panels?.length) return svg
  return (
    <div className="sign-stack">
      {svg}
      {panels.map((line, i) => <Panel key={i} line={line} fontSize={Math.round(size * 0.16)} />)}
    </div>
  )
}
