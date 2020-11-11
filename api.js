const schedule = require('node-schedule')
const graphic_crawler = require('./graphic_crawler')
const ruriweb_crawler = require('./ruriweb_crawler')
const express = require('express')
const app = express()
const port = 5500

async function run_crawler() {
    try {
        console.log('*** run_crawler start ***')
        await graphic_crawler.run()
        await ruriweb_crawler.run()
        console.log('*** run_crawler end ***')
    } catch (error) {
        console.error(error)
        process.exit()
    } 
}

schedule.scheduleJob('*/10 * * * *', run_crawler)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})