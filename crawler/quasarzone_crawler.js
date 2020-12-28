const { getCompareData, getSiteDomInfo  , textClean} = require('../util/util');
const { quasarzone, quasarzoneBaseUrl, quasarzoneUrl ,type} = require('../appConstants')
const {saveSearchData } = require('../util/files');
const {sendSlackMsg} = require('../repository/repository');

exports.run = async () => {

    const $ = await getSiteDomInfo(quasarzoneUrl);

    if ($) {

        const crawlerData = Array.from($('div.market-info-list-cont'))
            .map(data => {
                const title = textClean($(data).find('span.ellipsis-with-reply-cnt').text())
                const url = quasarzoneBaseUrl + $(data).find('a').attr('href')
                const category = "퀘이사존"
                const date = textClean($(data).find('span.date').text())
                return { category, title, url, date }
            })
           
            const result = await getCompareData(crawlerData , quasarzone)

            if (result.length > 0) {
                await saveSearchData(result)
                await sendSlackMsg(type, result)
            }
    }
}