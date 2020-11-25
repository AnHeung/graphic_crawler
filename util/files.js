const fs = require('fs');
const defaultPath = './searchData.json'

const saveSearchData = async (searchDataArr) => {

    const searchJson = await getSearchData()

    const addData = searchDataArr.reduce((acc, { title, url, category, date }) => {
        if (!isExist(searchJson,title)) {
            acc.push({ title, url, category, date })
        }
        return acc
    }, [])

    return new Promise(res => {
        fs.writeFile(defaultPath, JSON.stringify([...searchJson,...addData]), e => {
            if (e) {
                throw new Error(e)
            }
            res()
        })
    })
}

function isExist(arr , title){
    if(arr && arr.length > 0 ){
        return arr.find(data => title === data.title)
    }
    return false
}

async function isFileExist() {
    return new Promise((res, rej) => {
        fs.stat(defaultPath, e => {
            if (e) return res(false)
            res(true)
        })
    })
}

const getSearchData = async () => {
    if (await isFileExist()) {
        const json = fs.readFileSync(defaultPath, 'utf-8')
        if (json) {
            return JSON.parse(json)
        }
        return []
    } else {
        return []
    }
}

module.exports = {
    getSearchData:getSearchData,
    saveSearchData:saveSearchData
}

