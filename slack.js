const webHookUrl = 'https://hooks.slack.com/services/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'
const channel = '#graphic_info'
const username = "graphic_crawler"
const Slack = require('slack-node');
const Axios = require('axios');


const slack = new Slack();
slack.setWebhook(webHookUrl);
const send = async (message) => {
    slack.webhook({
        channel, // 전송될 슬랙 채널
        username, //슬랙에 표시될 이름
        text: message
    }, function (err, response) {
        console.log(response);
    });
}

exports.sendSlackMsg = async (crawlerData) => {

    const result = await Axios.post(webHookUrl, JSON.stringify(configMessageBody(crawlerData)))
        .catch(err => {
            console.error(err)
        })
    if(result){
        console.log(`업데이트 완료 :${crawlerData}`)
    }
}

// function makeBlocks(mangaData) {

//     return blocks = mangaData.reduce((acc, data) => {

//         const { title, link, date, thumbnail, comicLink } = data
//         acc.push({
//             "type": "section",
//             "text": {
//                 "type": "mrkdwn",
//                 "text": `<${link}> \n ${title} \n ${date}`  
//             },
//             "accessory": {
//                 "type": "image",
//                 "image_url": thumbnail,
//                 "alt_text": title
//             }
//         })
//         return acc;
//     }, [])
// }

// //링크보내기가 get 방식으로 밖에 안되서 조립하는 로직
// function makeUrlLink (params){

//     const batchLink = 'localhost:4500/manatoki/batch'
    
//     const keyValueArr = Object.keys(params)
    
//     let isFirst = true

//     const url =  keyValueArr.reduce((acc, key)=>{
        
//         const value = params[key]

//         if(isFirst){
//            acc = `${acc}?${key}=${value}`
//            isFirst = false
//         }else{
//             acc = `${acc}&${key}=${value}`
//         }
//         return acc
//     },batchLink)

//     return encodeURI(url)
// }

function makeAttachment(mangaData) {

    return mangaData.reduce((acc, data) => {

        const {category, title , url , date}  = data
       
        const attchment =  // attachments, here we also use long attachment to use more space
        {
            "color": "#2eb886",
            "title_link": url,
            "fields": [
                {
                    "title": "사이트",
                    "value": category,
                    "short": false,
                },
                {
                    "title": "제목",
                    "value": title,
                    "short": false,
                },
                {
                    "title": "업데이트 날짜",
                    "value": date,
                    "short": false,
                },
            ],
            "actions": [ // Slack supports many kind of different types, we'll use buttons here
                {
                    "type": "button",
                    "text": "보러가기", // text on the button 
                    "style": "danger",
                    "url": url // url the button will take the user if clicked
                }
            ]
        }
        
        acc.push(attchment)
        return acc;
    }, [])
}

function configMessageBody(crawlerData) {

    const attchment = makeAttachment(crawlerData  )

    return {
        "attachments": attchment
    }
}