const Axios = require('axios');
const cheerio = require('cheerio');
const {getSearchData } = require('./files');
const {getKeywords } = require('../repository/repository');

// exports.filterWord = (title) => {
//     if (title) return /(ASUS | 에이수스 | 이엠텍 | 에브가 | Evga | Emtek).+ (3080)/.exec(title)
//     else return false
// }

//필터값을 목록을 리스트로 수정
const filterWord = (title , formats)=>{
 return  formats.some(format=>{
        const regex = new RegExp(format.regex,"gmi")
        if(title) return regex.exec(title)
        return false
    })
}

exports.getCompareData = async (arr , site)=>{

    if(arr && arr.length > 0){

        const previousSearchData = await getSearchData()
        const regexFormats = await getKeywords(site)

        return arr.reduce((acc, data) => {
            const {title} = data
            if(filterWord(title , regexFormats)){
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
