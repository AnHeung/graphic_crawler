const { getCompareData, getSiteDomInfo } = require('../util/util');
const { quasarzone, quasarzoneBaseUrl, quasarzoneUrl ,type} = require('../appConstants')
const {saveSearchData } = require('../util/files');
const {sendSlackMsg} = require('../repository/repository');

exports.run = async () => {

    const $ = await getSiteDomInfo(quasarzoneUrl);

    if ($) {

        const crawlerData = Array.from($('div.market-info-list-cont'))
            .map(data => {
                const title = $(data).find('a').text().replace(/([\t|\n])/gi, "")
                const url = quasarzoneBaseUrl + $(data).find('a').attr('href')
                const category = "퀘이사존"
                const date = $(data).find('span.date').text().replace(/([\t|\n|\s])/gi, "")
                return { category, title, url, date }
            })
           
            const result = await getCompareData(crawlerData , quasarzone)

            if (result.length > 0) {
                await saveSearchData(result)
                await sendSlackMsg(type, result)
            }
    }
}