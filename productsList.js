import { priceFormat } from "./utils.js"
import { getImage } from "./image.js"

export async function getProductsList(browser, page, url) {
    await page.goto(url)
    await page.waitForSelector('#table-price')
  
    const bodyHandle = await page.$('#table-price')
    let rows = await bodyHandle.$$('tr')
    rows = rows.slice(1)
    const loadProducts = []
  
    for( let product of rows) {
      await product.waitForSelector('.text-right')
      const brand = await product.$eval('.text-right', brand => brand.innerText)
      const sku = await product.$eval('td:nth-of-type(3)', sku => sku.innerText)
      const name = await product.$eval('td:nth-of-type(4)', name => name.innerText)
  
      let price = 0
  
      await page
        .waitForSelector('.p-l-price-special', {timeout: 100})
        .then(async () => {
            price = await product.$eval('.p-l-price-special', price => price.innerText)
        })
        .catch(async () => {
            price = await product.$eval('.price', price => price.innerText)
        })
  
      const inStock = await product.$eval('td:nth-of-type(6)', stock => (stock.innerText == 'В наличии') ? true : false)
      const link = await product.$eval('.text-center a', link => link.href)

      /**
       * Загружаем изображения
       * Форматируем
       * return Имя изображения */ 

      let img = ''

      try{
        img = await getImage(browser, link)
      }catch(err){
        console.error(err.message)
      }
      
  
      loadProducts.push({
        sku,
        name,
        brand,
        price: priceFormat(price),
        inStock,
        link,
        img
      })
    }


    // const products = rows.map(async (product, i) => {
    //   await product.waitForSelector('.text-right')
    //   const brand = await product.$eval('.text-right', brand => brand.innerText)
    //   const sku = await product.$eval('td:nth-of-type(3)', sku => sku.innerText)
    //   const name = await product.$eval('td:nth-of-type(4)', name => name.innerText)
  
    //   let price = 0
  
    //   await page
    //           .waitForSelector('.p-l-price-special', {timeout: 100})
    //           .then(async () => {
    //               price = await product.$eval('.p-l-price-special', price => price.innerText)
    //           })
    //           .catch(async () => {
    //               price = await product.$eval('.price', price => price.innerText)
    //           })
  
    //   const inStock = await product.$eval('td:nth-of-type(6)', stock => (stock.innerText == 'В наличии') ? true : false)
    //   const link = await product.$eval('.text-center a', link => link.href)
      
    //   await product.click('.text-center a')
      
    //   page.waitForTimeout(5000)

              
    //   return {
    //     sku,
    //     name,
    //     brand,
    //     price: priceFormat(price),
    //     inStock,
    //     link
    //   }
  
    // });
  
    // const loadProducts = await Promise.all(products)
  
    return loadProducts
  }