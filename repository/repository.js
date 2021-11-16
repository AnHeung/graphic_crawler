const Axios = require('axios');
const { SLACK_API_URL, HOTDEAL_API_URL , API_KEY, API_KEY_VALUE} = require('../appConstants');
Axios.defaults.headers[API_KEY] = API_KEY_VALUE

const addKeyword = async keywordData => {

    const params = { keyword: keywordData }

    return await Axios.post(`${HOTDEAL_API_URL}keyword`, params)
        .then(true)
        .catch(e => {
            console.error(e)
            return false
        })

}

const sendSlackMsg = async (type, data) => {

    const params = { type, data }

    console.log(`API_KEY : ${API_KEY}`)
    console.log(`API_KEY_VALUE: ${process.env.API_KEY_VALUE}`)
    console.log(`headers : ${Axios.defaults.headers}`)


    return await Axios.post(SLACK_API_URL, params)
        .then(true)
        .catch(e => {
            console.error(e)
            return false
        })
}

const getHotdealDatas = async () => {

    try {
        const response = await Axios.get(`${HOTDEAL_API_URL}data`)
            .catch(e => {
                throw new Error(e)
            })
        if (response) {
            const hotDealDatas = response.data.data || []
            return hotDealDatas
        }
        return false
    } catch (e) {
        console.error(e)
        return false
    }
}

const addHotDealDatas = async datas => {
    
    const params = { datas: datas }

    return await Axios.post(`${HOTDEAL_API_URL}data`, params)
    .then(true)
    .catch(e => {
        console.error(e)
        return false
    })
}

const getKeywords = async category => {

    const params = { category: category }

    try {
        const response = await Axios.get(`${HOTDEAL_API_URL}keyword`, { params })
            .catch(e => {
                throw new Error(e)
            })
        if (response) {
            const regexs = response.data.data || []
            return regexs
        }
        return false
    } catch (e) {
        console.error(e)
        return false
    }
}

module.exports = {
    getKeywords: getKeywords,
    addKeyword: addKeyword,
    sendSlackMsg, sendSlackMsg,
    getHotdealDatas:getHotdealDatas,
    addHotDealDatas:addHotDealDatas
}