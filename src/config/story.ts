export const story = {
  recipientName: '',
  senderName: 'Ram',
  // Public contact information, never a secret. International digits, e.g. 491701234567.
  whatsappNumber: '',
  title: 'A Story Yet to Be Written',
  subtitle: 'Some stories begin with a question.',
  dedication: 'Made for someone a little extraordinary.',
  colors: {
    ivory: '#FFF9F1', blush: '#F6DDE4', sage: '#A8BCA5',
    rose: '#C88998', cocoa: '#493B3A', gold: '#D8BA80',
  },
  chapters: [
    { title: 'The Beginning', label: 'A little unexpected', paragraphs: [
      'Some stories begin with a sentence. Some begin with a coincidence.',
      'And some begin when someone unexpectedly becomes your favorite thought.',
    ] },
    { title: 'Between Books & Flowers', label: 'The lovely little things', paragraphs: [
      "If life were a book, I think you’d be the kind of character people remember long after the final page.",
      'A little curiosity. A little wilderness. A whole world between the lines.',
    ] },
    { title: 'A Python Kind of Feeling', label: 'An unexpected exception', paragraphs: [
      'Some things are difficult to put into words. So naturally, I tried Python.',
    ] },
    { title: 'The Unwritten Chapter', label: 'A page for something real', paragraphs: [
      'I meant what I said to you.',
      'I think you’re genuinely wonderful, and I’d love to discover what a story with you could look like.',
      'Not a perfect story. Not a rushed one. Just something real, written one page at a time.',
    ] },
    { title: 'Your Turn', label: 'Only if you want to', paragraphs: [
      'Every story has a turning point.',
      'So… would you like to see where our story could go?',
      'No pressure. No perfect answer needed. Just yours.',
    ] },
  ],
  discoveries: [
    { name: 'A well-loved book', text: 'Some people feel like a favorite passage. The kind you quietly return to.' },
    { name: 'A little wildflower', text: 'For you: a tiny wildflower, and a wish for more mountain views and unhurried days.' },
    { name: 'A pocket-sized star', text: 'Plot twist: our Python memes might be one of my favorite little traditions.' },
  ],
  answers: [
    { id: 'yes', label: 'I’d love to see where this goes', icon: '💗', response: 'Then maybe this is the beginning of a beautiful chapter.', message: 'I’d love to see where our story could go 💗' },
    { id: 'time', label: 'I need a little more time', icon: '🌷', response: 'Take all the time you need. Your answer matters more than the timing.', message: 'I need a little more time 🌷' },
    { id: 'no', label: 'I don’t feel the same way', icon: '🤍', response: 'Thank you for being honest. I’m glad I got to tell you how I feel.', message: 'I don’t feel the same way 🤍' },
  ],
  easterEggs: {
    bookmark: 'For the record: you don’t have to earn a place in this story. Just be yourself.',
    python: 'No bugs were harmed. A few butterflies were introduced.',
  },
}

export function whatsappLink(number: string, message: string) {
  const digits = number.replace(/[\s()+-]/g, '')
  return /^[1-9]\d{6,14}$/.test(digits)
    ? `https://wa.me/${digits}?text=${encodeURIComponent(message)}` : null
}
