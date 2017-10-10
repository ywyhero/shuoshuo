const express = require('express');
const app = express();
const path = require('path')
const router = require('./router/router');
const session = require('express-session')

app.use(session({
    secret: "!@#$%^&*()",
    name: 'sessionId',
    cookie: { maxAge: 800000 }, //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true
}))

// 访问静态资源文件 这里是访问所有dist目录下的静态资源文件
app.use(express.static(path.resolve(__dirname, '../dist')))
    // 因为是单页应用 所有请求都走/dist/index.html
app.get('*', function(req, res) {
    const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
    res.send(html)
})

app.post('/api/register', router.register)
app.post('/api/login', router.login)
app.post('/api/loginout', router.loginOut)
app.post('/api/user', router.userInfo)
app.post('/api/public', router.public)
app.post('/api/lists', router.lists)
app.post('/api/remove', router.remove)
app.post('/api/my', router.my)
app.post('/api/allmembers', router.allmembers)
app.post('/api/like', router.like)
app.post('/api/member', router.member)


app.listen(9999)