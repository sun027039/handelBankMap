/*
 * @Author: zhihui.sun
 * @Date: 2018-11-13 18:02:57
 * @LastEditors: zhihui.sun
 * @LastEditTime: 2018-11-14 09:42:14
 */

const express = require('express')
const app     = express()
const doGetlngLat   = require('../../untils/getLngLats')

function list(req, res) {
    var res = res
    var req = req
    let code = req.query.code
    doGetlngLat(code, data => {
      res.send({
        msg: "success",
        data: data,
        code: 1
      })
    })
}

app.get('/getHandleBank', function (req, res) {
    list(req, res)
})
module.exports = app

