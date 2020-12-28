const { getCompareData, getSiteDomInfo } = require('../util/util');
const {clienUrl , clienbaseUrl } = require('../appConstants')
const {clien, type} = require('../appConstants');
const {sendSlackMsg, addHotDealDatas} = require('../repository/repository');

exports.run = async () => {

    const $ = await getSiteDomInfo(clienUrl);

    if ($) {

        const crawlerData = Array.from($('div.list_content div.list_item'))
            .map(data => {
                const title = $(data).find('div.list_title span.list_subject').attr('title')
                const url = clienbaseUrl + $(data).find('span.list_subject a').attr('href')
                const category = "클리앙"
                const date = $(data).find('span.timestamp').text()
                return { category, title, url, date }
            })
           
            const result = await getCompareData(crawlerData , clien)

            if (result.length > 0) {
                await addHotDealDatas(result)
                await sendSlackMsg(type, result)
            }
    }
}