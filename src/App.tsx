import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'motion/react'
import { ArrowLeft, ArrowRight, BookOpen, Bookmark, ChevronDown, Heart } from 'lucide-react'
import { story } from './config/story'
import { BookCover } from './components/BookCover'
import { RoadTrip } from './components/RoadTrip'
import { Botanical } from './assets/Botanical'
import { ChapterContent } from './chapters/ChapterContent'

function Story() {
  const [page, setPage] = useState(-1)
  const [bookmarkOpen, setBookmarkOpen] = useState(false)
  const heading = useRef<HTMLHeadingElement>(null)
  const reducedMotion = useReducedMotion()
  const chapter = story.chapters[page]
  useEffect(() => {
    if (page >= 0) {
      window.scrollTo({ top: 0, behavior: reducedMotion ? 'instant' : 'smooth' })
    }
  }, [page, reducedMotion])

  const variables = Object.fromEntries(Object.entries(story.colors).map(([key,value])=>[`--${key}`,value])) as CSSProperties
  return <div className="app-shell" style={variables}>
    <a className="skip-link" href="#story">Skip to the story</a>
    <header className="site-header">
      <a href="#" className="wordmark" aria-label="Return to book cover" onClick={e=>{e.preventDefault();setPage(-1)}}><BookOpen size={20} strokeWidth={1.3}/><span>a little story</span></a>
      <span className="header-note">A LITTLE SOMETHING FOR YOU <Heart size={12}/></span>
    </header>
    <main id="story">
      <div className="intro-line"><span className="tiny-star">✦</span><span>{story.subtitle}</span><span className="tiny-star">✦</span></div>
      <Botanical className="ambient-flower ambient-left"/><Botanical className="ambient-flower ambient-right"/>
      <AnimatePresence mode="wait" initial={false}>
        {page === -1 ? <BookCover key="cover" onOpen={()=>setPage(0)}/> : <motion.section key={page} className={`open-book chapter-${page+1}`} initial={{ opacity:0, y:reducedMotion?0:12 }} animate={{opacity:1,y:0}} exit={{opacity:0,y:reducedMotion?0:-6}} transition={{duration:reducedMotion?0:.23}} onAnimationComplete={()=>heading.current?.focus({preventScroll:true})} aria-label={`Chapter ${page+1} of 5`}>
          <div className="page-topline"><span>CHAPTER {['ONE','TWO','THREE','FOUR','FIVE'][page]}</span><button className="bookmark-button" onClick={()=>setBookmarkOpen(!bookmarkOpen)} aria-expanded={bookmarkOpen} aria-controls="bookmark-note"><Bookmark size={17} aria-hidden="true"/><span>{bookmarkOpen ? 'Close note' : 'Tap for a little note'}</span><ChevronDown size={13} aria-hidden="true"/></button></div>
          {bookmarkOpen&&<aside id="bookmark-note" className="bookmark-message">{story.easterEggs.bookmark}</aside>}
          <div className="chapter-copy">
            <p className="eyebrow">{chapter.label}</p>
            <h1 ref={heading} tabIndex={-1}>{chapter.title}</h1>
            <span className="chapter-ornament" aria-hidden="true">✧</span>
            {page === 4 && <RoadTrip/>}
            {chapter.paragraphs.map((p,i)=><p className={`story-paragraph paragraph-${i}`} key={p}>{p}</p>)}
          </div>
          <ChapterContent key={page} chapter={page}/>
          <nav className="page-navigation" aria-label="Book pages">
            <button className="back-button" onClick={()=>setPage(page-1)}><ArrowLeft size={15}/>{page===0?'Cover':'Previous'}</button>
            <span className="page-number">{String(page+1).padStart(2,'0')} <span>/</span> 05</span>
            {page<4?<button className="next-button" onClick={()=>setPage(page+1)}>Turn the Page <ArrowRight size={15}/></button>:<span className="last-page-note">To be continued…</span>}
          </nav>
        </motion.section>}
      </AnimatePresence>
      {page>=0&&<div className="chapter-dots" aria-label={`Chapter ${page+1} of 5`}>{story.chapters.map((c,i)=><button key={c.title} aria-label={`Go to chapter ${i+1}: ${c.title}`} aria-current={i===page?'step':undefined} className={i===page?'active':''} onClick={()=>setPage(i)}/>)}</div>}
    </main>
    <footer className="site-footer"><span>Written with care{story.senderName ? `, by ${story.senderName}` : ''}.</span><span className="footer-heart" aria-hidden="true">♡</span><span>No rush. Let’s see where this goes.</span></footer>
  </div>
}

export default function App(){ return <MotionConfig reducedMotion="user"><Story/></MotionConfig> }
