import { saveCookie } from './utils.js'

export async function login(page) {
    const EMAIL = 'vasaa1982@gmail.com';
    const PASS = 'A15122022I';

    await page.goto('https://animalfood.com.ua/avtorizatsiya/', {
      waitUntil: 'load',
      // Remove the timeout
      timeout: 0
    });

    await page.type('#input-email', EMAIL, {delay: 100})
    await page.type('#input-password', PASS, {delay: 20})
    // await page.$eval('#input-email', (el, mail) => {el.value = mail}, EMAIL)
    // await page.$eval('#input-password', (el, pass) => {el.value = pass}, PASS)
    await page.click('input[type="submit"]')
    await page.waitForTimeout(2000)
    await page.screenshot( {path: 'exemple.png'})
    
    saveCookie(page)
    // await page.waitForNavigation()
  
  }