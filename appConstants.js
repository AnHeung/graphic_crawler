require('dotenv-flow').config({
    node_env: process.env.NODE_ENV || 'dev',
    silent: true
});

const type = 'hotdeal';
const quasarzoneBaseUrl = "https://quasarzone.com/";
const quasarzoneUrl = 'https://quasarzone.com/bbs/qb_saleinfo';
const quasarzone = 'quasarzone'
const ruliwebUrl = 'https://m.ruliweb.com/market/board/1020';
const ruliweb = 'ruliweb'
const clienUrl = 'https://www.clien.net/service/board/jirum'
const clienbaseUrl = 'https://www.clien.net'
const clien = 'clien'
const SLACK_API_URL = process.env.SLACK_API_URL
const HOTDEAL_API_URL = process.env.HOTDEAL_API_URL
const API_KEY = process.env.API_KEY
const API_KEY_VALUE = process.env.API_KEY_VALUE

module.exports = {
    type:type,
    quasarzoneBaseUrl: quasarzoneBaseUrl,
    quasarzone: quasarzone,
    quasarzoneUrl: quasarzoneUrl,
    ruliweb: ruliweb,
    ruliwebUrl, ruliwebUrl,
    clienUrl: clienUrl,
    clienbaseUrl: clienbaseUrl,
    clien: clien,
    SLACK_API_URL:SLACK_API_URL,
    HOTDEAL_API_URL:HOTDEAL_API_URL,
    API_KEY_VALUE:API_KEY_VALUE,
    API_KEY : API_KEY
}