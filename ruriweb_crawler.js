const { sendSlackMsg } = require('./slack');
const { filterWord } = require('./util');

(async () => {

    const ruliwebUrl = 'https://m.ruliweb.com/market/board/1020'
    
    const cheerio = require('cheerio');

    const baseUrl = 'https://m.ruliweb.com/'

    const axios = require('axios');

    const site = await axios.get(ruliwebUrl).catch(err => {
        console.error(`망했음 다시 시도해 ${err}`)
    })

    const $ = cheerio.load(site.data)

    const result = Array.from($('td.subject'))
        .map(data => {
            const title = $(data).find('a.deco').text().replace(/([\t|\n|\s])/gi, "")
            const url =  $(data).find('a.deco').attr('href')
            const category = "루리웹"
            const date = $(data).find('span.time').text().replace(/([\t|\n|\s])/gi, "")
            return { category, title, url, date }
        })
        .filter(({title})=>{
            return filterWord(title)
        })
        
    if (result.length > 0) await sendSlackMsg(result)

})()


