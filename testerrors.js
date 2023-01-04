import request from "request"
import https from "node:https"

// process.on('uncaughtException', err => {
//     console.log(err.message)
// })

async function errors (url) {
    // await request.get(url)
    // .on('response', res => {
    //     console.log(res.statusCode)
    // })
    // .on('data', chunk => {console.log(chunk.toString())})
    // .on('error', e => {
    //     console.log(e.message)
    // })
    try{
        
    } catch(e) {
        console.log(e.message)
    }

    await https.get(url, (res) => {
        res.on('data', chunk => {
            console.log(chunk.toString())
        })
        res.on('error', err => {
            console.log(err)
        })
    })
    .on('response', (res) => {
        if(res.statusCode < 200 || res.statusCode >=300) {
            // console.log(res.statusCode)
            // new Error ('Ссылка отдает неверный')
            res.emit('error', `Ссылка отдает неверный код: ${res.statusCode}`)
        }
    })
    .on('error', e => {
        console.log(e.message)
    })
    
}

errors('https://www.youtube.co')
errors('https://jsonplaceholder.typicode.com/todos/1')



    

