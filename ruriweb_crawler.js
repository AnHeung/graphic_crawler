const { sendSlackMsg } = require('./slack');
const { filterWord, getSiteDomInfo } = require('./util');
const { ruliwebUrl } = require('./appConstants');

exports.run = async () => {

    const $ = await getSiteDomInfo(ruliwebUrl)

    if ($) {

        const result = Array.from($('td.subject'))
            .map(data => {
                const title = $(data).find('a.deco').text().replace(/([\t|\n|\s])/gi, "")
                const url = $(data).find('a.deco').attr('href')
                const category = "루리웹"
                const date = $(data).find('span.time').text().replace(/([\t|\n|\s])/gi, "")
                return { category, title, url, date }
            })
            .filter(({ title }) => {
                return filterWord(title)
            })

        if (result.length > 0) await sendSlackMsg(result)

    }

}


