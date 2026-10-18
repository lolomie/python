import { useId } from 'react'

type Props = { driver: string; passenger: string }

/** Original SVG illustration; rear view of a left-hand-drive 911. */
export function PinkPorsche({ driver, passenger }: Props) {
  const id = useId().replace(/:/g, '')
  return <svg className="pink-porsche" viewBox="0 0 560 370" role="img" aria-labelledby={`${id}-title ${id}-description`}>
    <title id={`${id}-title`}>A pink Porsche 911, with {driver} driving and {passenger} in the passenger seat</title>
    <desc id={`${id}-description`}>The car is seen from behind. An arrow from {driver} points to the left driver’s seat. An arrow from {passenger} points to the right passenger seat.</desc>
    <defs>
      <linearGradient id={`${id}-paint`} x1="0" y1="0" x2="0.3" y2="1">
        <stop stopColor="#f8dbe3"/><stop offset=".48" stopColor="#e6abc0"/><stop offset="1" stopColor="#c987a0"/>
      </linearGradient>
      <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#7b8580"/><stop offset="1" stopColor="#414b48"/>
      </linearGradient>
      <marker id={`${id}-arrow`} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto" markerUnits="userSpaceOnUse">
        <path d="m1 1 5 3-5 3" fill="none" stroke="#805864" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </marker>
    </defs>
    <g aria-hidden="true">
      <path d="M23 301q49-17 91-8m331 0q46-9 92 8" fill="none" stroke="#c4ccb4" strokeWidth="1.4"/>
      <path d="m53 294-7-23m7 15-14-6m14 1 6-12m444 24 6-28m-6 17 17-9m-14 0-5-10" fill="none" stroke="#99aa8c" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="46" cy="269" r="4" fill="#dfb2bf"/><circle cx="510" cy="263" r="4" fill="#dfb2bf"/>
      <ellipse cx="280" cy="330" rx="184" ry="12" fill="#bcae9c" opacity=".16"/>
      <path d="M118 268h37v48q-1 10-11 10h-17q-9 0-9-10Zm287 0h37v48q0 10-9 10h-17q-10 0-11-10Z" fill="#484445"/>
      <path d="m167 174-19-6q-16-4-19 6l-1 9 29 6m236-15 19-6q16-4 19 6l1 9-29 6" fill="#e5adc0" stroke="#af758b" strokeWidth="1.5"/>
      <path d="M101 233q5-29 37-48l33-57q16-35 51-39 58-10 116 0 35 4 51 39l33 57q32 19 37 48l-3 63q-2 18-20 19H124q-18-1-20-19Z" fill={`url(#${id}-paint)`} stroke="#ac7689" strokeWidth="2"/>
      <path d="M172 182q14-27 26-53 10-21 31-24 51-7 102 0 21 3 31 24 12 26 26 53Z" fill={`url(#${id}-glass)`} stroke="#a27383" strokeWidth="2"/>
      <path d="M184 178q13-31 29-58 3-5 11-7" fill="none" stroke="#f5e8df" strokeWidth="2" opacity=".45"/>
      <path d="m255 111-26 66m39-67-27 67" stroke="#d3dfd7" strokeWidth="6" opacity=".1"/>
      <g fill="#d0b9ad" stroke="#ab948a" strokeWidth="1">
        <rect x="205" y="139" width="35" height="30" rx="11"/>
        <rect x="320" y="139" width="35" height="30" rx="11"/>
        <path d="M195 181v-7q0-10 10-10h35q10 0 10 10v7m60 0v-7q0-10 10-10h35q10 0 10 10v7"/>
      </g>
      <path d="M165 185q115 15 230 0m-272 21q18-14 36-14m242 0q18 0 36 14" fill="none" stroke="#fff0f4" strokeWidth="3" strokeLinecap="round" opacity=".8"/>
      <path d="M195 198h170l7 23H188Z" fill="#836975" stroke="#a9778b"/>
      {[0,1,2,3].map(i=><path key={i} d={`M${195-i*2} ${202+i*5}h${170+i*4}`} stroke="#d8a1b5" strokeWidth="2"/>)}
      <path d="M279 198v24m5-24v24" stroke="#f5d9e4" strokeWidth="2"/>
      <path d="M116 228q164 20 328 0l-3 14q-161 19-322 0Z" fill="#8d4e64" stroke="#ae7187"/>
      <path d="M123 234q157 19 314 0" fill="none" stroke="#ffb6c7" strokeWidth="4" strokeLinecap="round"/>
      <path d="M126 234h35m238 0h35" stroke="#ffe4e9" strokeWidth="2" strokeLinecap="round"/>
      <text x="280" y="263" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" letterSpacing="5" fill="#664650">PORSCHE</text>
      <path d="M108 275q172 17 344 0m-329 27q157 12 314 0" fill="none" stroke="#ab7288" strokeWidth="1.3"/>
      <path d="M132 297h296l-9 14H141Z" fill="#63515a"/>
      <rect x="235" y="277" width="90" height="23" rx="4" fill="#fff7eb" stroke="#a67d85"/>
      <text x="280" y="293" textAnchor="middle" fontFamily="Georgia, serif" fontSize="14" fontStyle="italic" fill="#715463">911</text>
      <g fill="#554951" stroke="#c9b4b8" strokeWidth="2">
        <rect x="152" y="297" width="31" height="10" rx="5"/><rect x="377" y="297" width="31" height="10" rx="5"/>
      </g>
      <path d="M112 250v34m336-34v34" stroke="#ffecf1" strokeWidth="3" strokeLinecap="round" opacity=".6"/>
      <text x="83" y="49" textAnchor="middle" className="car-name">{driver}</text>
      <text x="83" y="68" textAnchor="middle" className="car-seat-label">driver</text>
      <text x="477" y="49" textAnchor="middle" className="car-name">{passenger}</text>
      <text x="477" y="68" textAnchor="middle" className="car-seat-label">passenger</text>
      <path d="M90 79c-3 33 59 13 88 31 16 10 15 28 34 38" fill="none" stroke="#805864" strokeWidth="1.7" strokeLinecap="round" markerEnd={`url(#${id}-arrow)`}/>
      <path d="M470 79c3 33-59 13-88 31-16 10-15 28-34 38" fill="none" stroke="#805864" strokeWidth="1.7" strokeLinecap="round" markerEnd={`url(#${id}-arrow)`}/>
      <path d="m278 48 2 5 5 2-5 2-2 5-2-5-5-2 5-2" fill="#c3a16b"/>
    </g>
  </svg>
}
