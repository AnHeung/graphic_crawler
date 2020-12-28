const quasarzone_crawler = require('./crawler/quasarzone_crawler');
const ruriweb_crawler = require('./crawler/ruliweb_crawler');
const clien_crawler = require('./crawler/clien_crawler');

(async ()=>{
    try {
        console.log('*** graphic_card_crawler start ***')
        await quasarzone_crawler.run()
        await ruriweb_crawler.run()
        await clien_crawler.run()
        console.log('*** graphic_card_crawler end ***')
    } catch (error) {
        console.error(error)
        process.exit()
    } 
})()
