import { useState } from 'react'
import { BookOpen, Check, Copy, Flower2, Heart, Play, Send, Sparkles, Star } from 'lucide-react'
import { Botanical } from '../assets/Botanical'
import { story, whatsappLink } from '../config/story'

export function ChapterContent({ chapter }: { chapter: number }) {
  const [discoveries, setDiscoveries] = useState<number[]>([])
  const [ran, setRan] = useState(false)
  const [egg, setEgg] = useState(false)
  const [answerId, setAnswerId] = useState<string | null>(null)
  const [copyState, setCopyState] = useState('')
  const [manualCopy, setManualCopy] = useState(false)
  const answer = story.answers.find(a => a.id === answerId)
  const link = answer && whatsappLink(story.whatsappNumber, answer.message)

  async function copyAnswer() {
    if (!answer) return
    try {
      await navigator.clipboard.writeText(answer.message)
      setCopyState('Copied — ready when you are.')
    } catch {
      setManualCopy(true)
      setCopyState('You can select and copy your answer below.')
    }
  }

  if (chapter === 0) return <div className="opening-illustration">
    <div className="illustrated-book" aria-hidden="true"><span>once<br/><i>upon a</i><br/>maybe.</span><Botanical variant="branch"/></div>
    <p className="handwritten">And so, a little story begins.</p>
  </div>

  if (chapter === 1) return <>
    <div className="nature-window"><Botanical variant="landscape"/><span>somewhere between a good book & a mountain view</span></div>
    <p className="interaction-hint">Three little things, waiting to be discovered.</p>
    <div className="discoveries">{story.discoveries.map((d, i) => {
      const Icon = [BookOpen, Flower2, Star][i]
      const open = discoveries.includes(i)
      return <button key={d.name} className={`discovery ${open ? 'discovered' : ''}`} aria-expanded={open} onClick={() => setDiscoveries(old => old.includes(i) ? old.filter(x=>x!==i) : [...old,i])}>
        <Icon size={26} strokeWidth={1.25}/><span>{d.name}</span>
      </button>
    })}</div>
    <div className="discovery-messages" aria-live="polite">{discoveries.map(i=><p key={i}>{story.discoveries[i].text}</p>)}</div>
  </>

  if (chapter === 2) return <>
    <div className="code-card">
      <div className="code-header"><span className="window-dots" aria-hidden="true">● ● ●</span><span>a_little_feeling.py</span><Heart size={13}/></div>
      <p className="code-label">ROMANTIC PSEUDOCODE · NOT REAL PYTHON</p>
      <pre><code><span className="syntax">try</span>:{'\n'}{'    '}stop_thinking_about_you(){'\n'}<span className="syntax">except</span> ImpossibleError:{'\n'}{'    '}print(<span className="string">"Well... here we are ❤️"</span>)</code></pre>
      <button className="run-button" onClick={()=>setRan(true)}><Play size={14} fill="currentColor"/> {ran ? 'Run again' : 'Run Code'}</button>
      {ran && <div className="code-output" role="status"><span>↳ Output</span><p>Looks like you’ve become my favorite exception.</p></div>}
    </div>
    <button className="python-egg" aria-expanded={egg} onClick={()=>setEgg(!egg)}># a tiny developer’s note <Sparkles size={12}/></button>
    {egg && <p className="small-reveal">{story.easterEggs.python}</p>}
  </>

  if (chapter === 3) return <div className="unwritten-illustration">
    <svg viewBox="0 0 300 165" fill="none" aria-hidden="true">
      <path className="draw-line" d="M40 140V25q55-18 110 0 55-18 110 0v115q-55-18-110 0-55-18-110 0Zm110-115v115" stroke="#a99a82" strokeWidth="1.5"/>
      <path className="draw-line bookmark-one" d="M93 23v66l15-12 15 12V23" stroke="#b77c8c" strokeWidth="2" fill="#f6dde4"/>
      <path className="draw-line bookmark-two" d="M180 23v82l15-12 15 12V23" stroke="#82977e" strokeWidth="2" fill="#dce5d6"/>
      <path className="draw-line" d="M74 111h49m54 10h49" stroke="#d8ba80" strokeLinecap="round"/>
    </svg>
    <p className="handwritten">Two bookmarks. A little room to begin.</p>
    <p className="intent-note">A chance to get to know each other, with honest intentions.<br/>The next page is entirely yours.</p>
  </div>

  return <div className="answer-section">
    <fieldset><legend className="sr-only">How do you feel?</legend>
      {story.answers.map(a=><button key={a.id} className={`answer-button ${answerId===a.id?'selected':''}`} aria-pressed={answerId===a.id} onClick={()=>{setAnswerId(a.id);setCopyState('');setManualCopy(false)}}><span aria-hidden="true">{a.icon}</span><span>{a.label}</span><span className="answer-check" aria-hidden="true">{answerId===a.id ? <Check size={15}/> : <span/>}</span></button>)}
    </fieldset>
    {answer && <div className={`answer-response ${answer.id === 'yes' ? 'blossoming' : ''}`} role="status">
      {answer.id==='yes'&&<div className="flower-celebration" aria-hidden="true">✿ <span>✽</span> ❀ <span>✿</span> ❁</div>}
      <p>{answer.response}</p>
      <p className="privacy-note">Your choice stays on this page. Nothing has been sent or saved.</p>
      <div className="share-actions"><button className="secondary" onClick={copyAnswer}><Copy size={15}/> Copy my answer</button>{link&&<a className="secondary" href={link} target="_blank" rel="noreferrer"><Send size={15}/> Send my answer</a>}</div>
      {link && <p className="privacy-note">Opens WhatsApp. You review and send the message yourself.</p>}
      {copyState&&<p className="copy-status">{copyState}</p>}
      {manualCopy&&<textarea className="manual-copy" aria-label="Your answer to copy" readOnly value={answer.message} onFocus={e=>e.target.select()}/>}
    </div>}
    <p className="answer-footnote">You can change your choice, or leave this page, at any time.</p>
  </div>
}
