const { sendSlackMsg } = require('./slack');
const { getCompareData, getSiteDomInfo } = require('./util/util');
const { ruliwebUrl } = require('./appConstants');
const {saveSearchData } = require('./util/files');
const {ruliweb} = require('./appConstants');

exports.run = async () => {

    const $ = await getSiteDomInfo(ruliwebUrl)

    // await addKeyword({category : 'ruliweb', regex: '(이베이|ebay|뉴에그|newegg)' ,siteUrl:ruliwebUrl})
    // await addKeyword({category : 'quasarzone', regex: '(이베이|ebay|뉴에그|newegg)' ,siteUrl:'https://quasarzone.com/bbs/qb_saleinfo'})
    
    if ($) {

        const crawlerData = Array.from($('td.subject'))
            .map(data => {
                const title = $(data).find('a.deco').text().replace(/([\t|\n|\s])/gi, "")
                const url = $(data).find('a.deco').attr('href')
                const category = "루리웹"
                const date = $(data).find('span.time').text().replace(/([\t|\n|\s])/gi, "")
                return { category, title, url, date }
            })
           
            const result = await getCompareData(crawlerData , ruliweb)
            
        if (result.length > 0) {
            await saveSearchData(result)
            await sendSlackMsg(result)
        }
    }
}


