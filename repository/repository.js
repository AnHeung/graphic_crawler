const Axios = require('axios');
require('dotenv').config()

exports.addKeyword = async keywordData => {

    const searchApiUrl = process.env.SEARCH_API_URL
    const params = { keyword: keywordData }

    return await Axios.post(searchApiUrl, params)
        .then(true)
        .catch(e => {
            console.error(e)
            return false
        })

}

exports.getKeyword = async category => {

    const searchApiUrl = process.env.SEARCH_API_URL
    const params = { category: category }

    try {

        const response = await Axios.get(searchApiUrl, { params })
            .catch(e => {
                throw new Error(e)
            })
            if(response){
                const regex = response.data.data.regex
                return regex
            }
            return false
    } catch (e) {
        console.error(e)
        return false
    }



}