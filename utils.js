import path from 'node:path';
import fs from 'fs'
import { fileURLToPath } from 'node:url';
import { transliterate as tr, slugify } from 'transliteration';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function getPaginateLength(page) {
    const lastPaginateElement = '.pagination li:last-of-type a'
    await page.waitForSelector(lastPaginateElement)
    const lastPagePaginate = await page.$eval(lastPaginateElement, page => page.href)
    return lastPagePaginate.split('=')[1]
    // await page.screenshot({path: path.resolve(__dirname, 'category.jpeg'), type:'jpeg'})
}


async function saveCookie(page) {
    const cookies = await page.cookies()
    const cookieJson = JSON.stringify(cookies, null, 2)
  
    await fs.writeFile('cookies.json', cookieJson, function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("The file was saved!");
    })
}

async function loadCookie(page){
    const file = await fs.readFileSync(path.resolve(__dirname, 'cookies.json'), { encoding: 'utf8' })
    const cookie = await JSON.parse(file)
    await page.setCookie(...cookie)
}

function priceFormat(price) {
    let formattedPrice = price.replace('грн.', '')
    formattedPrice = formattedPrice.replace('\n', '')


    return formattedPrice
}

function setImageName(str) {
    const name = str.toLowerCase()
    return slugify(tr(name), '-')
}

export {
    getPaginateLength, 
    saveCookie,
    loadCookie,
    priceFormat,
    setImageName
}