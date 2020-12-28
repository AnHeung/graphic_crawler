const { getCompareData, getSiteDomInfo , textClean } = require('../util/util');
const {saveSearchData } = require('../util/files');
const {ruliweb ,ruliwebUrl, type} = require('../appConstants');
const {sendSlackMsg} = require('../repository/repository');

exports.run = async () => {

    const $ = await getSiteDomInfo(ruliwebUrl)

    if ($) {

        const crawlerData = Array.from($('td.subject'))
            .map(data => {
                const title = textClean($(data).find('a.deco').text())
                const url = $(data).find('a.deco').attr('href')
                const category = "루리웹"
                const date = textClean($(data).find('span.time').text())
                return { category, title, url, date }
            })
            const result = await getCompareData(crawlerData , ruliweb)
            
        if (result.length > 0) {
            await saveSearchData(result)
            await sendSlackMsg(type, result)
        }
    }
}


