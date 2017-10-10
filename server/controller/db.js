const mongoose = require('mongoose');
const db = mongoose.createConnection('mongodb://localhost/ywy/vine')

db.once('open', () => {
    console.log('数据库连接成功')
})
db.once('error', () => {
    console.log('数据库连接失败')
})

module.exports = db