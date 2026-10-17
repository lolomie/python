export const story = {
  recipientName: '',
  senderName: 'Ram',
  // Public contact information, never a secret. International digits, e.g. 491701234567.
  whatsappNumber: '',
  title: 'A Story Yet to Be Written',
  subtitle: 'Some stories begin with a question.',
  dedication: 'Made for someone very special.',
  colors: {
    ivory: '#FFF9F1', blush: '#F6DDE4', sage: '#A8BCA5',
    rose: '#C88998', cocoa: '#493B3A', gold: '#D8BA80',
  },
  chapters: [
    { title: 'The Beginning', label: 'A small beginning', paragraphs: [
      'Some stories start with a hello. Others start with a little surprise.',
      'This one starts with you. Somehow, thinking of you has become one of my favorite things.',
    ] },
    { title: 'Between Books & Flowers', label: 'The lovely little things', paragraphs: [
      'If life were a book, you’d be someone I’d want to read more about.',
      'Good books, flowers, and mountain views. Little things that make me think of you.',
    ] },
    { title: 'A Python Kind of Feeling', label: 'A little Python joke', paragraphs: [
      'Sometimes it’s hard to find the right words. So I tried a little Python.',
    ] },
    { title: 'The Unwritten Chapter', label: 'A page for something real', paragraphs: [
      'I meant what I said to you.',
      'I really like you. I’d love to get to know you better and see if we could build something real together.',
      'We don’t have to rush. We can take it one small step at a time.',
    ] },
    { title: 'Your Turn', label: 'Only if you want to', paragraphs: [
      'The next page is yours.',
      'Would you like to get to know each other better and see where this goes?',
      'No pressure. You can tell me how you really feel.',
    ] },
  ],
  discoveries: [
    { name: 'A favorite book', text: 'Like a favorite book, you’re someone I’d love to know a little better, page by page.' },
    { name: 'A little flower', text: 'A little flower for you. I hope your days have plenty of fresh air, mountain views, and reasons to smile.' },
    { name: 'A little star', text: 'Our Python memes always make me smile. I really like that little thing we share.' },
  ],
  answers: [
    { id: 'yes', label: 'I’d love to see where this goes', icon: '💗', response: 'Then let’s take it one page at a time. I’d really like that.', message: 'I’d love to see where our story could go 💗' },
    { id: 'time', label: 'I need a little more time', icon: '🌷', response: 'Take all the time you need. There’s no hurry to answer.', message: 'I need a little more time 🌷' },
    { id: 'no', label: 'I don’t feel the same way', icon: '🤍', response: 'Thank you for being honest. I’m glad I got to tell you how I feel.', message: 'I don’t feel the same way 🤍' },
  ],
  easterEggs: {
    bookmark: 'One little reminder: you don’t have to impress me. I like you just as you are.',
    python: 'No bugs here. Just me, smiling at my phone when you send a meme. :)',
  },
}

export function whatsappLink(number: string, message: string) {
  const digits = number.replace(/[\s()+-]/g, '')
  return /^[1-9]\d{6,14}$/.test(digits)
    ? `https://wa.me/${digits}?text=${encodeURIComponent(message)}` : null
}
