const Axios = require('axios');
const cheerio = require('cheerio');
const {getSearchData } = require('./files');
const {getKeyword } = require('../repository/repository');

// exports.filterWord = (title) => {
//     if (title) return /(ASUS | 에이수스 | 이엠텍 | 에브가 | Evga | Emtek).+ (3080)/.exec(title)
//     else return false
// }

const filterWord = (title , format)=>{
    const regex = new RegExp(format,"gmi") || '(아이폰|플스5|PS5)'
    if (title) return regex.exec(title)
    else return false
}

exports.getCompareData = async (arr , site)=>{

    if(arr && arr.length > 0){

        const previousSearchData = await getSearchData()
        const regexFormat = await getKeyword(site)

        return arr.reduce((acc, data) => {
            const {title} = data
            if(filterWord(title , regexFormat)){
                previousSearchData.find(data=> data.title === title) || acc.push(data)
            }
            return acc;    
        } ,[])
    }
    return [];
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
