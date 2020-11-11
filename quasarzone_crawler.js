
const { sendSlackMsg } = require('./slack');
const { filterWord , getSiteDomInfo} = require('./util');
const { quasarzoneBaseUrl, quasarzoneUrl } = require('./appConstants')

exports.run = async () => {

    const $ = await getSiteDomInfo(quasarzoneUrl);

    if ($) {
        const result = Array.from($('div.market-info-list-cont'))
            .map(data => {
                const title = $(data).find('a').text().replace(/([\t|\n|\s])/gi, "")
                const url = quasarzoneBaseUrl + $(data).find('a').attr('href')
                const category = "퀘이사존"
                const date = $(data).find('span.date').text().replace(/([\t|\n|\s])/gi, "")
                return { category, title, url, date }
            })
            .filter(({ title }) => {
                return filterWord(title)
            })

        if (result.length > 0) await sendSlackMsg(result)
    }

}
