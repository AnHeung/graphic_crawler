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
const SEARCH_API_URL = process.env.SEARCH_API_URL

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
    SEARCH_API_URL:SEARCH_API_URL
}