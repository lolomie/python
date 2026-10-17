import { ArrowRight, Sparkles } from 'lucide-react'
import { motion } from 'motion/react'
import { Botanical } from '../assets/Botanical'
import { story } from '../config/story'

export function BookCover({ onOpen }: { onOpen: () => void }) {
  return <motion.section className="cover-scene" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, rotateY: -12 }} transition={{ duration: .4 }} aria-label="Book cover">
    <p className="eyebrow cover-eyebrow"><span/> A LITTLE STORY, JUST FOR YOU <span/></p>
    <div className="closed-book">
      <div className="cover-border"/>
      <span className="cover-ribbon" aria-hidden="true"/>
      <div className="cover-stars" aria-hidden="true">✧ <span>✦</span> ✧</div>
      <p className="cover-volume">AN UNFINISHED LITTLE STORY</p>
      <h1>A Story<br/><em>Yet to Be</em><br/>Written</h1>
      <div className="cover-rule" aria-hidden="true">❦</div>
      <p className="dedication">{story.recipientName ? `Made for ${story.recipientName}, someone very special.` : story.dedication}</p>
      <Botanical className="cover-flower" variant="bouquet"/>
      <p className={`cover-edition${story.senderName ? ' cover-author' : ''}`}>{story.senderName ? `by ${story.senderName} :)` : 'A FIRST EDITION OF SOMETHING POSSIBLE'}</p>
    </div>
    <button className="primary open-button" onClick={onOpen}>Open the Book <ArrowRight size={17}/></button>
    <p className="quiet-note"><Sparkles size={13}/> A few little pages, just for you. Take your time.</p>
  </motion.section>
}
