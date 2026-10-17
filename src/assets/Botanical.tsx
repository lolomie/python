type Props = { className?: string; variant?: 'branch' | 'bouquet' | 'landscape' }

export function Botanical({ className = '', variant = 'branch' }: Props) {
  return <svg className={className} viewBox="0 0 340 340" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id={`petal-${variant}`} x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#f6dde4"/><stop offset="1" stopColor="#c88998"/>
      </linearGradient>
    </defs>
    {variant === 'landscape' ? <>
      <circle cx="246" cy="75" r="24" fill="#ead7ad" opacity=".7"/>
      <path d="M15 245 110 99 166 178 212 117 330 253" fill="#cdd5c4"/>
      <path d="m110 99-32 49 31-12 17 18 9-21Z" fill="#fff9f1"/>
      <path d="m212 117-25 39 27-12 17 18Z" fill="#fff9f1"/>
      <path d="M0 256Q89 166 185 249T340 235V340H0" fill="#afbea4"/>
      <path d="M0 288q95-77 178-3t162-8v63H0" fill="#879d80"/>
      <path d="M140 340q104-54 47-83" stroke="#f4ead5" strokeWidth="15"/>
      <path d="m28 249 11-39 12 39m212 28 15-55 17 55" fill="#627b62"/>
    </> : <>
      <path d="M167 315c17-92 3-141-42-245m43 212c-53-24-73-63-88-110m88 61c46-32 61-67 80-121m-85 75c-37-15-59-34-74-69" stroke="#7b9275" strokeWidth="2.2" strokeLinecap="round"/>
      {[[151,243,-55],[132,210,-70],[107,185,-30],[175,206,42],[195,179,35],[212,148,48],[144,152,-50],[124,118,-48],[170,268,55],[92,146,-35],[230,113,25]].map(([x,y,r],i) =>
        <ellipse key={i} cx={x} cy={y} rx="10" ry="24" fill={i%2?'#a8bca5':'#839a7b'} opacity=".78" transform={`rotate(${r} ${x} ${y})`}/>)}
      {[[121,70,1],[250,103,.78],[83,166,.6]].map(([x,y,s],i)=><g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
        {[0,72,144,216,288].map(a=><ellipse key={a} cy="-14" rx="12" ry="21" fill={`url(#petal-${variant})`} stroke="#bd8190" strokeWidth=".5" transform={`rotate(${a})`}/>)}
        <circle r="7" fill="#d8ba80"/><circle r="3" fill="#a98a56"/>
      </g>)}
      {variant === 'bouquet' && <><path d="m126 285 39 9 36-9-13 30-24-14-23 14Z" fill="#d8ba80"/><path d="M166 300v29m2-29 17 25" stroke="#c4a66e" strokeWidth="3"/></>}
      <path d="m250 205 3 7 7 3-7 3-3 7-3-7-7-3 7-3Zm-166 36 2 5 5 2-5 2-2 5-2-5-5-2 5-2Z" fill="#d8ba80"/>
    </>}
  </svg>
}
