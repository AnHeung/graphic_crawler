const quasarzone_crawler = require('./quasarzone_crawler');
const ruriweb_crawler = require('./ruliweb_crawler');

exports.run = async ()=>{
    try {
        console.log('*** graphic_card_crawler start ***')
        await quasarzone_crawler.run()
        await ruriweb_crawler.run()
        console.log('*** graphic_card_crawler end ***')
    } catch (error) {
        console.error(error)
        process.exit()
    } 
}
