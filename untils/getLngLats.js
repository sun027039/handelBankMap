/*
 * @Author: zhihui.sun
 * @Date: 2018-11-13 18:02:57
 * @LastEditors: zhihui.sun
 * @LastEditTime: 2018-11-14 09:41:53
 */
const cheerio = require("cheerio")
const request = require("request");
const Iconv   = require('iconv-lite');
const axios   = require('axios');
const urlArr   = require('../config/gz_data_json');

function doGetlngLat(type, callback) {
    var url = urlArr[type].url
    console.log(url)
    request({
        url: url,
        encoding: null
    }, function (error, response, body) {
        if (response && response.statusCode == 200) {
            var body = Iconv.decode(body, 'utf-8');
            $ = cheerio.load(body);
            let $tr = $('#articlecontent > table > tbody > tr')
            let addr = []
            let addrItem = []
            $tr.each( function(){
              let $tds = $(this).find('td')
              let name = $tds.eq(2).text()
              let address = $tds.eq(3).text()
              if (!address.includes('广州')) {
                address = `广州市${address}`
              }
              if (name !== '网点名称') {
                if(addrItem.length >= 10) {
                  addr.push(addrItem)
                  addrItem = []
                }
                addrItem.push({
                  name,
                  address
                })
              }
            })
            addrItem.length > 0 && addr.push(addrItem)
           
            getLngLats(addr).then(function(data){
              let arr = []
              data.forEach(item => {
                arr = arr.concat(item)
              })
              callback && callback(arr)
            })
        } else {
            res.send({
                msg: "糟糕!!! 网络好像有点问题",
                code: 0
            })
        }
    });

}
async function getLngLats(addr) {
  for (let i in addr) {
    let addrArr = addr[i].map(value => {
      return value.address
    })
    let lnObj = await changeAddr(addrArr.join('|'))
    for (let j in addr[i]) {
      addr[i][j].lnObj = lnObj[j]
    }
  }
  return addr
}
function changeAddr (addr) {
  let url = `https://restapi.amap.com/v3/geocode/geo?address=${encodeURIComponent(addr)}&output=JSON&key=ba8cee88466feee5a1578ecc36ed1ed5&batch=true`
    return axios.get(url).then(function(data) {
      return data.data.geocodes
    })
}
module.exports = doGetlngLat;

