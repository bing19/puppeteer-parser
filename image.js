import { loadCookie, setImageName } from './utils.js';
import https from 'node:https'
import path, { resolve } from 'node:path';
import {Transform} from 'node:stream';
import { fileURLToPath } from 'node:url';
import gm from 'gm'
import chalk from 'chalk';
import Joi from 'joi'
// import Promise from 'bluebird'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Promise.promisifyAll(gm.prototype)


export async function getImage (browser, pageLink) {
    const imgPage = await browser.newPage()
    await imgPage.goto(pageLink)
    await imgPage.waitForSelector('.thumbnail')

    const productName = await imgPage.$eval('h1', name => name.innerText)

    await imgPage.click('.thumbnail')
    await imgPage.waitForSelector('.mfp-img')

    const link = await imgPage.$eval('.mfp-img', img => img.src)
    const imgName = setImageName(productName)
    
    const validateLink = Joi.string().uri().validate(link)

    if(validateLink.error) throw new Error(validateLink.error.details[0].message)

    await https.request(validateLink.value, (response) => {
        
        var data = new Transform();

        response.on('data', function(chunk) {
            data.push(chunk);
        });

        response.on('end', async function() {
            const imgData = data.read()
            await download(imgData, imgName)
            console.log(`Обработка изображений для товара ${chalk.bgGreen.white.bold(' Окончена ')}`)
        });

        response.on('error', err => {
            console.log(err)
        })
    })
    .on('response', (res) => { 
        if(res.statusCode < 200 || res.statusCode >=400) {
            res.emit('error', `Ссылка отдает неверный код: ${res.statusCode}`)
        }
    })
    .on('error', e => { console.log(e.message) })
    .end()


    imgPage.close()
    
    return imgName + '.png'
}

function errorHandler(err) {
    console.log(chalk.bgRed(err.message))
}

function download (img, imgName) {
    return Promise.all([
        new Promise((resolve, reject) => {
            gm(img)
                .resize('420', '420')
                .quality(80)
                .write(path.join(__dirname, 'images', `${imgName}.1800x1800w.png`), err => {
                    if(err) reject(new Error(`Ошибка загрузки картинки ${imgName}.1800x1800w.png`))
                    resolve()
                })
        }).catch(errorHandler),

        new Promise((resolve, reject) => {
            gm(img)
                .resize('420', '420')
                .quality(80)
                .write(path.join(__dirname, 'images', `${imgName}.1800x1800w.png.webp`), err => {
                    if(err) reject(new Error(`Ошибка загрузки картинки ${imgName}.1800x1800w.png.webp`))
                    resolve()
                })
        }).catch(errorHandler),

        new Promise((resolve, reject) => {
            gm(img)
                .resize('414', '420')
                .quality(80)
                .write(path.join(__dirname, 'images', `${imgName}.700x800.png`), err => {
                    if(err) reject(new Error(`Ошибка загрузки картинки ${imgName}.700x800.png`))
                    resolve()
                })
        }).catch(errorHandler),

        new Promise((resolve, reject) => {
            gm(img)
                .resize('414', '420')
                .quality(80)
                .write(path.join(__dirname, 'images', `${imgName}.700x800.png.webp`), err => {
                    if(err) reject(new Error(`Ошибка загрузки картинки ${imgName}.700x800.png.webp`))
                    resolve()
                })
        }).catch(errorHandler),

        new Promise((resolve, reject) => {
            gm(img)
                .resize('441', '440')
                .quality(80)
                .write(path.join(__dirname, 'images', `${imgName}.800x600.png`), err => {
                    if(err) reject(new Error(`Ошибка загрузки картинки ${imgName}.800x600.png`))
                    resolve()
                })
        }).catch(errorHandler),

        new Promise((resolve, reject) => {
            gm(img)
                .resize('441', '440')
                .quality(80)
                .write(path.join(__dirname, 'images', `${imgName}.600x800.png`), err => {
                    if(err) reject(new Error(`Ошибка загрузки картинки ${imgName}.600x800.png`))
                    resolve()
                })
        }).catch(errorHandler),

        new Promise((resolve, reject) => {
            gm(img)
                .resize('441', '440')
                .quality(80)
                .write(path.join(__dirname, 'images', `${imgName}.600x800.png.webp`), err => {
                    if(err) reject(new Error(`Ошибка загрузки картинки ${imgName}.600x800.png.webp`))
                    resolve()
                })
        }).catch(errorHandler),

        new Promise((resolve, reject) => {
            gm(img)
                .resize('120', '120')
                .quality(80)
                .write(path.join(__dirname, 'images', `${imgName}.300x120.png`), err => {
                    if(err) reject(new Error(`Ошибка загрузки картинки ${imgName}.300x120.png`))
                    resolve()
                })
        }).catch(errorHandler),

        new Promise((resolve, reject) => {
            gm(img)
                .resize('301', '300')
                .quality(80)
                .write(path.join(__dirname, 'images', `${imgName}.330x300.png`), err => {
                    if(err) reject(new Error(`Ошибка загрузки картинки ${imgName}.330x300.png`))
                    resolve()
                })
        }).catch(errorHandler),

        new Promise((resolve, reject) => {
            gm(img)
                .resize('70', '70')
                .quality(80)
                .write(path.join(__dirname, 'images', `${imgName}.70x70.png`), err => {
                    if(err) reject(new Error(`Ошибка загрузки картинки ${imgName}.70x70.png`))
                    resolve()
                })
        }).catch(errorHandler),

        new Promise((resolve, reject) => {
            gm(img)
                .resize('70', '70')
                .quality(80)
                .write(path.join(__dirname, 'images', `${imgName}.70x70.png.webp`), err => {
                    if(err) reject(new Error(`Ошибка загрузки картинки ${imgName}.70x70.png.webp`))
                    resolve()
                })
        }).catch(errorHandler),

        new Promise((resolve, reject) => {
            gm(img)
                .resize('60', '60')
                .quality(80)
                .write(path.join(__dirname, 'images', `${imgName}.60x60.png`), err => {
                    if(err) reject(new Error(`Ошибка загрузки картинки ${imgName}.60x60.png`))
                    resolve()
                })
        }).catch(errorHandler),

        new Promise((resolve, reject) => {
            gm(img)
                .resize('60', '60')
                .quality(80)
                .write(path.join(__dirname, 'images', `${imgName}.60x60.png.webp`), err => {
                    if(err) reject(new Error(`Ошибка загрузки картинки ${imgName}.60x60.png.webp`))
                    resolve()
                })
        }).catch(errorHandler),

        new Promise((resolve, reject) => {
            gm(img)
                .resize('55', '55')
                .quality(80)
                .write(path.join(__dirname, 'images', `${imgName}.55x55.png`), err => {
                    if(err) reject(new Error(`Ошибка загрузки картинки ${imgName}.55x55.png`))
                    resolve()
                })
        }).catch(errorHandler),

        new Promise((resolve, reject) => {
            gm(img)
                .resize('35', '35')
                .quality(80)
                .write(path.join(__dirname, 'images', `${imgName}.35x35.png`), err => {
                    if(err) reject(new Error(`Ошибка загрузки картинки ${imgName}.35x35.png`))
                    resolve()
                })
        }).catch(errorHandler),
    ])

    
    // new Promise((resolve, reject) => {
        //     gm(img)
        //         .resize('420', '420')
        //         .quality(80)
        //         .toBuffer('webp', (err, buffer) => {
        //             if(!err) {
        //                 fs.writeFile(path.join(__dirname, 'images', `${imgName}.1800x1800w.webp`), buffer)
        //                 resolve()   
        //             }
        //             reject(new Error(`Ошибка загрузки картинки ${imgName}.1800x1800w.webp`))
        //         })
        // }),
    
}



   
