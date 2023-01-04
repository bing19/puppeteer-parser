import puppeteer from 'puppeteer';
import { getPaginateLength, loadCookie  } from './utils.js';
import { login } from './login.js';
import { getProductsList } from './productsList.js';

// process.on('uncaughtException', (error) => {
//     console.error(error.message);
// });

async function start () {
    const launchOptions = { args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--disable-gpu',
          '--window-size=1920x1080'
      ], headless: true, // !! true executablePath: '/usr/bin/chromium-browser', }
    }

    const pageOpt = {
        networkIdle2Timeout: 5000,
        waitUntil: 'networkidle2',
        timeout: 3000000
    }
  
    const browser = await puppeteer.launch(launchOptions);
    const page = await browser.newPage(pageOpt);

    // await page.setViewport({width: 1200, height: 720})

   
    
    // await login(page)

    await loadCookie(page)

    const catLink = 'https://animalfood.com.ua/vse-tovari/suhoj-korm-koty/'
    await page.goto(catLink)

    // const lastPage = await getPaginateLength(page)
    const lastPage = 2

    const products = []

    for (let i = 1; i <= lastPage; i++){
      let pageProducts = []

      if(i == 1) {
        pageProducts = await getProductsList(browser, page, 'https://animalfood.com.ua/vse-tovari/suhoj-korm-koty/')
        // products.push(...pageProducts)
      } else {
        pageProducts = await getProductsList(browser, page, `https://animalfood.com.ua/vse-tovari/suhoj-korm-koty/?page=${i}`)
        // products.push(...pageProducts)
      }

      console.log(pageProducts)
    }
//  products = await getProductsList(page, 'https://animalfood.com.ua/vse-tovari/suhoj-korm-koty/')
    

    // const html = await page.evaluate(body => {
    //   return body.map( row => row.innerHTML)
    // }, rows);

    // await bodyHandle.dispose();

    // console.log(rows)

    // const links = await getCategoryLinks (page)
  

    // await page.waitForSelector('.wf_header_account')
    // await page.click('.wf_header_account')
    


    // await page.waitForSelector('h1')
    // const h1 = await page.$eval('h1', elem => {
    //   return elem.innerText
    // })

    // console.log(h1)


    // const bodyHandle = await page.$('.theme-doc-version-badge');
    // const html = await page.evaluate(body => body.textContent, bodyHandle);
    // await bodyHandle.dispose();

    // console.log(html)

    // const element = await page.waitForSelector('.anchorWithStickyNavbar_LWe7');

    // const h1 = await page.evaluate(() => {
    //   return document.querySelector(allResultsSelector);
    // });

    // console.log(element)

    await browser.close();
  };

  start()

async function getCategoryLinks(page) {
  await page.waitForSelector('#wf_cat')

  const links = await page.$$eval('#wf_cat a', links => {
    return links.map(link => link.href)
  })

  return links
}



console.log('PARSE START !!!!')