require('dotenv').config()
const Axios = require('axios');

exports.sendSlackMsg = async (crawlerData) => {

    const result = await Axios.post(process.env.SLACK_WEBHOOK_URL, JSON.stringify(configMessageBody(crawlerData)))
        .catch(err => {
            console.error(err)
        })
    if(result){
        console.log(`업데이트 완료 :${crawlerData}`)
    }
}

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