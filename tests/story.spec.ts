import { test, expect, type Page } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { whatsappLink } from '../src/config/story'
import { story } from '../src/config/story'

async function openBook(page: Page) {
  await page.goto('/')
  await page.getByRole('button', { name: 'Open the Book' }).click()
  await expect(page.getByRole('heading', { name: 'The Beginning', exact: true })).toBeVisible()
}
async function chapter(page: Page, index: number, title: string) {
  await page.getByRole('button', { name: `Go to chapter ${index}: ${title}`, exact: true }).click()
  await expect(page.getByRole('heading', { name: title, exact: true })).toBeVisible()
}

test('complete story, discoveries, pseudocode and all three honest answers', async ({page})=>{
  const errors: string[]=[]
  page.on('pageerror', error=>errors.push(error.message))
  page.on('response', response=>{if(response.status()>=400)errors.push(`${response.status()} ${response.url()}`)})
  await openBook(page)
  await page.getByRole('button',{name:'Turn the Page'}).click()
  await expect(page.getByRole('heading',{name:'Between Books & Flowers',exact:true})).toBeVisible()
  for(const name of ['A well-loved book','A little wildflower','A pocket-sized star']){
    await page.getByRole('button',{name,exact:true}).click()
    await expect(page.getByRole('button',{name,exact:true})).toHaveAttribute('aria-expanded','true')
  }
  await expect(page.getByText('Plot twist:',{exact:false})).toBeVisible()
  await page.getByRole('button',{name:'Turn the Page'}).click()
  await page.getByRole('button',{name:'Run Code'}).click()
  await expect(page.getByText('Looks like you’ve become my favorite exception.')).toBeVisible()
  await page.getByRole('button',{name:'# a tiny developer’s note'}).click()
  await expect(page.getByText('No bugs were harmed.',{exact:false})).toBeVisible()
  await page.getByRole('button',{name:'Turn the Page'}).click()
  await expect(page.getByRole('heading',{name:'The Unwritten Chapter',exact:true})).toBeVisible()
  await page.getByRole('button',{name:'Read the bookmark note'}).click()
  await expect(page.getByText('For the record:',{exact:false})).toBeVisible()
  await page.getByRole('button',{name:'Turn the Page'}).click()
  for(const [label,response] of [
    ['I’d love to see where this goes','Then maybe this is the beginning of a beautiful chapter.'],
    ['I need a little more time','Take all the time you need. Your answer matters more than the timing.'],
    ['I don’t feel the same way','Thank you for being honest. I’m glad I got to tell you how I feel.'],
  ]){
    await page.getByRole('button',{name:label,exact:true}).click()
    await expect(page.getByText(response,{exact:true})).toBeVisible()
    await expect(page.getByRole('button',{name:label,exact:true})).toHaveAttribute('aria-pressed','true')
    await expect(page.getByRole('button',{name:'I’d love to see where this goes',exact:true})).toBeVisible()
    await expect(page.getByRole('button',{name:'I need a little more time',exact:true})).toBeVisible()
    await expect(page.getByRole('button',{name:'I don’t feel the same way',exact:true})).toBeVisible()
  }
  await expect(page.getByRole('link',{name:'Send my answer'})).toHaveCount(0)
  await page.reload()
  await expect(page.getByRole('button',{name:'Open the Book'})).toBeVisible()
  expect(await page.evaluate(()=>({...localStorage}))).toEqual({})
  expect(errors).toEqual([])
})

test('clipboard success and explicit manual fallback', async ({page})=>{
  await page.addInitScript(()=>{
    Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async(text:string)=>{(window as unknown as {copied:string}).copied=text}}})
  })
  await openBook(page)
  await chapter(page,5,'Your Turn')
  await page.getByRole('button',{name:'I need a little more time',exact:true}).click()
  await page.getByRole('button',{name:'Copy my answer'}).click()
  await expect(page.getByText('Copied — ready when you are.')).toBeVisible()
  expect(await page.evaluate(()=>(window as unknown as {copied:string}).copied)).toBe('I need a little more time 🌷')
  await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{throw new Error('denied')}}}))
  await page.getByRole('button',{name:'Copy my answer'}).click()
  await expect(page.getByRole('textbox',{name:'Your answer to copy'})).toHaveValue('I need a little more time 🌷')
})

test('all chapters have no serious accessibility violations or horizontal overflow', async ({page})=>{
  await page.goto('/')
  for(let i=0;i<=5;i++){
    if(i===1)await openBook(page)
    else if(i>1)await page.getByRole('button',{name:'Turn the Page'}).click()
    if(i>0){
      await expect(page.getByRole('heading',{name:story.chapters[i-1].title,exact:true})).toBeVisible()
      await expect(page.getByRole('region',{name:`Chapter ${i} of 5`,exact:true})).toHaveCSS('opacity','1')
    }
    const scan=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()
    expect(scan.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))).toEqual([])
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true)
  }
})

test('keyboard navigation and chapter focus',async({page})=>{
  await page.goto('/')
  await page.getByRole('button',{name:'Open the Book'}).focus()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('heading',{name:'The Beginning',exact:true})).toBeFocused()
  await page.getByRole('button',{name:'Turn the Page'}).focus()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('heading',{name:'Between Books & Flowers',exact:true})).toBeFocused()
  await page.getByRole('button',{name:'Previous',exact:true}).click()
  await expect(page.getByRole('heading',{name:'The Beginning',exact:true})).toBeFocused()
})

test('WhatsApp contact normalization and invalid contact guard',()=>{
  expect(whatsappLink('+49 (170) 123-4567','A little yes 💗')).toBe('https://wa.me/491701234567?text=A%20little%20yes%20%F0%9F%92%97')
  expect(whatsappLink('', 'hello')).toBeNull()
  expect(whatsappLink('javascript:alert(1)','hello')).toBeNull()
})
