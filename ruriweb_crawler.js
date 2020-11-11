const { sendSlackMsg } = require('./slack');
const { filterWord } = require('./util');

exports.run = async () => {

    const ruliwebUrl = 'https://bbs.ruliweb.com/market/board/1020'
    
    const baseUrl = "https://bbs.ruliweb.com/"

    const cheerio = require('cheerio');

    const axios = require('axios');

    const site = await axios.get(ruliwebUrl).catch(err => {
        console.error(`망했음 다시 시도해 ${err}`)
    })

    const $ = cheerio.load(site.data)

    const result = Array.from($('tr.table_body'))
        .map(data => {
            const title = $(data).find('a.deco').text().replace(/([\t|\n|\s])/gi, "")
            const url =  $(data).find('a.deco').attr('href')
            const category = "루리웹"
            const date = $(data).find('td.time').text().replace(/([\t|\n|\s])/gi, "")
            return { category, title, url, date }
        })
        .filter(({title})=>{
            return filterWord(title)
        })
        
    if (result.length > 0) await sendSlackMsg(result)

}

