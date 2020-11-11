const Axios = require('axios');
const cheerio = require('cheerio');

exports.filterWord = (title) => {
    if (title) return /(ASUS | 에이수스 | 이엠텍 | 에브가 | Evga | Emtek).+ (3080)/.exec(title)
    else return false
}

exports.textClean = (text) => text.replace(/([\t|\n|\s])/gi, "")

exports.getSiteDomInfo = async url => {

    try {
        const site = await Axios.get(url).catch(e => {throw new Error(e)})
        return cheerio.load(site.data)
    }catch(e){
        console.error(`망했음 다시 시도해 ${e}`)
        return null    
    }
}
