const Axios = require('axios');
const cheerio = require('cheerio');
const { getSearchData } = require('./files');
const { getKeywords , getHotdealDatas , addHotDealDatas} = require('../repository/repository');

//필터값을 목록을 리스트로 수정
const filterWord = (title, formats) => {
    return formats.some(format => {
        const regex = new RegExp(format.regex, "gmi")
        if (title) return regex.exec(title)
        return false
    })
}

exports.getCompareData = async (arr, site) => {

    if (arr && arr.length > 0) {

        // const previousSearchData = await getSearchData()
        const previousSearchData = await getHotdealDatas() || []
        const regexFormats = await getKeywords(site)

        return arr.reduce((acc, data) => {
            const { title, date } = data
            if (filterWord(title, regexFormats)) {
                previousSearchData.find(searchData => searchData.title === title && searchData.date === date) || acc.push(data)
            }
            return acc;
        }, [])
    }
    return [];
}

const isEmpty = (text) => text && text !== ""

exports.textClean = (text) => isEmpty(text) ? text.replace(/[\n|\t|\r]/gmi, "").trim() : ""

exports.getSiteDomInfo = async url => {

    try {
       
        const site = await  Axios.get(url, { 
            headers: { "Accept-Encoding": "gzip,deflate,compress" } 
        }).catch(e => { throw new Error(e) })
        return cheerio.load(site.data)
    } catch (e) {
        console.error(`망했음 다시 시도해 ${e}`)
        return null
    }
}
