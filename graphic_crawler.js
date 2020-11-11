const { sendSlackMsg } = require('./slack');
const { filterWord } = require('./util');

exports.run = async () => {

    const quasarzoneUrl = 'https://quasarzone.com/bbs/qb_saleinfo';
    const baseUrl = "https://quasarzone.com/"

    const cheerio = require('cheerio');

    const axios = require('axios');

    const site = await axios.get(quasarzoneUrl).catch(err => {
        console.error(`망했음 다시 시도해 ${err}`)
    })

    const $ = cheerio.load(site.data)

    const result = Array.from($('div.market-info-list-cont'))
        .map(data => {
            const title = $(data).find('a').text().replace(/([\t|\n|\s])/gi, "")
            const url = baseUrl + $(data).find('a').attr('href')
            const category = "퀘이사존"
            const date = $(data).find('span.date').text().replace(/([\t|\n|\s])/gi, "")
            return { category, title, url, date }
        })
        .filter(({ title }) => {
            return filterWord(title)
        })
        
    if (result.length > 0) await sendSlackMsg(result)

}
