const Axios = require('axios');
const {SLACK_API_URL, SEARCH_API_URL} = require('../appConstants');

const addKeyword = async keywordData => {

    const params = { keyword: keywordData }

    return await Axios.post(SEARCH_API_URL, params)
        .then(true)
        .catch(e => {
            console.error(e)
            return false
        })

}

const sendSlackMsg = async (type,data)=>{
    
    const params = { type, data}

    return await Axios.post(SLACK_API_URL, params)
        .then(true)
        .catch(e => {
            console.error(e)
            return false
        })
}

const getKeywords = async category => {

    const params = { category: category }

    try {
        const response = await Axios.get(SEARCH_API_URL, { params })
            .catch(e => {
                throw new Error(e)
            })
            if(response){
                const regexs = response.data.data || []
                return regexs
            }
            return false
    } catch (e) {
        console.error(e)
        return false
    }
}

module.exports ={
    getKeywords:getKeywords,
    addKeyword:addKeyword,
    sendSlackMsg,sendSlackMsg
}