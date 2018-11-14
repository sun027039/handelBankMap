/*
 * @Author: zhihui.sun
 * @Date: 2018-11-13 18:02:57
 * @LastEditors: zhihui.sun
 * @LastEditTime: 2018-11-14 09:41:33
 */
const express = require('express');
const app = express();
const router = express.Router();

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    next();
});

/**路由列表**/
const index = require('./index');
const gz_list = require('./routes/gz/index');

app.use('/', index);
app.use('/gz', gz_list);

app.use(router);
app.listen(80);
console.log(80);