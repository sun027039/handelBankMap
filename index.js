/*
 * @Author: zhihui.sun
 * @Date: 2018-11-13 18:02:57
 * @LastEditors: zhihui.sun
 * @LastEditTime: 2018-11-14 09:41:41
 */
var express = require('express');
var app = express();
var ejs = require('ejs');
const doGetlngLat   = require('./untils/getLngLats');
let options   = require('./config/gz_data_json');

app.engine('html',ejs.__express);
app.set('view engine','html');
app.set('views', './views'); //设置模板路径
//app.set('view engine', '.html');

//app.set('views', __dirname + 'views');
var lngLatdata = []
options = Object.keys(options).map(key => {
    return {
        key,
        value: options[key].name
    }
})
doGetlngLat(options[0].key, data => {
    lngLatdata = data
})
app.get('/', function(req, res) {
    res.header("Content-Type:text/html; charset=utf-8");
    res.render('index', {
        title: '地图定点',
        options: options,
        data: JSON.stringify(lngLatdata)
    });

});

module.exports = app