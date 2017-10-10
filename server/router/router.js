const Schemas = require('./../controller/schema');
const formidable = require('formidable');

exports.register = (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields) => {
        if (err) {
            cosole.log(err)
            return
        }
        if (!fields.username) {
            res.json({
                'code': -1,
                'msg': '用户名不能为空'
            })
            return
        }
        if (!fields.password) {
            res.json({
                'code': -2,
                'msg': '密码不能为空'
            })
            return
        }
        Schemas.Login.findOne({ username: fields.username }, (err, result) => {
            if (err) {
                console.log(err)
                return
            }
            if (result) {
                res.json({
                    'code': -5,
                    'msg': '用户名已存在'
                })
            } else {
                Schemas.Login.create(fields, (err) => {
                    if (err) {
                        console.log(err)
                        return
                    }
                    res.json({ 'code': 1 })
                })

            }
        })

    })
}

exports.login = (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields) => {
        if (err) {
            console.log(err)
            return
        }
        if (!fields.username) {
            res.json({
                'code': -1,
                'msg': '用户名不能为空'
            })
            return
        }
        if (!fields.password) {
            res.json({
                'code': -2,
                'msg': '密码不能为空'
            })
            return
        }
        let username = fields.username;
        Schemas.Login.findOne({ username: username }, (err, result) => {
            if (err) {
                console.log(err)
                return;
            }
            if (!result) {
                res.json({
                    'code': -5,
                    'msg': '登录名不存在'
                })
                return
            }
            if (result.password === fields.password) {
                req.session.username = result.username;
                res.json({ 'code': 1 })
            } else {
                res.json({
                    'code': -1,
                    'msg': '登录名或密码错误'
                })
            }
        })

    })
}

exports.loginOut = (req, res) => {
    req.session.username = null;
    res.json({
        'code': 1
    })
}

exports.userInfo = (req, res) => {
    if (!req.session.username) {
        res.json({
            'code': -1,
        })
        return
    }
    res.json({
        'code': 1,
        'username': req.session.username
    })
}

exports.public = (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields) => {
        if (err) {
            console.log(err)
            return
        }
        fields["time"] = new Date();
        fields["username"] = req.session.username;
        fields["count"] = 0;
        Schemas.Content.create(fields, (err) => {
            if (err) {
                console.log(err)
                return;
            }
            res.json({
                'code': 1
            })
        })
    })
}

exports.lists = (req, res) => {
    let form = new formidable.IncomingForm();
    let lists = [];
    Schemas.Content.find({}, (err, result) => {
        if (err) {
            console.log(err);
            return
        }
        let total = result.length;
        form.parse(req, (err, fields) => {
            let query = Schemas.Content.find({});
            query.limit(fields.limit || 10);
            query.skip(fields.skip * fields.limit || 0);
            query.sort({ 'time': -1 })
            query.exec(function(err, docs) {
                for (let doc of docs) {
                    lists.push({
                        'username': doc.username,
                        'content': doc.content,
                        'count': doc.count
                    })
                }
                res.json({
                    'lists': lists,
                    'total': total
                })
            })
        })
    })
}
exports.remove = (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields) => {
        if (err) {
            console.log(err)
            return
        }
        Schemas.Content.remove({ 'content': fields.content }, (err, docs) => {
            if (err) {
                console.log(err)
                return
            }
            res.json({
                "code": 1
            })
        })
    })
}

exports.my = (req, res) => {
    let form = new formidable.IncomingForm();
    Schemas.Content.find({ 'username': req.session.username }, (err, result) => {
        if (err) {
            console.log(err);
            return
        }
        let total = result.length;
        form.parse(req, (err, fields) => {
            if (err) {
                console.log(err)
                return
            }
            let query = Schemas.Content.find({ 'username': req.session.username })
            query.sort({ "time": -1 })
            query.limit(fields.limit || 10)
            query.skip(fields.skip * fields.limit || 0)
            query.exec((err, docs) => {
                if (err) {
                    console.log(err)
                    return
                }
                res.json({
                    "code": 1,
                    "lists": docs,
                    'total': total
                })
            })
        })

    })
}

exports.allmembers = (req, res) => {
    let form = new formidable.IncomingForm();
    Schemas.Login.find({}, (err, result) => {
        if (err) {
            console.log(err)
            return
        }
        let total = result.length;
        form.parse(req, (err, fields) => {
            if (err) {
                console.log(err)
                return
            }
            let query = Schemas.Login.find({})
            query.sort({ "time": -1 })
            query.limit(fields.limit || 10)
            query.skip(fields.skip * fields.limit || 0)
            query.exec((err, docs) => {
                if (err) {
                    console.log(err)
                    return
                }
                res.json({
                    "code": 1,
                    "lists": docs,
                    'total': total
                })
            })
        })
    })
}

exports.like = (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields) => {
        if (err) {
            console.log(err)
            return
        }
        Schemas.Content.update({ 'content': fields.content }, { 'count': fields.count }, (err, docs) => {
            if (err) {
                console.log(err)
                return
            }
            res.json({ 'code': 1 })
        })
    })
}

exports.member = (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields) => {
        if (err) {
            console.log(err)
            return
        }
        let query = Schemas.Content.find({ 'username': fields.username })
        query.sort({ 'time': -1 });
        query.limit(fields.limit || 10);
        query.skip(fields.limit * fields.skip || 0)
        query.exec((err, result) => {
            if (err) {
                console.log(err)
                return
            }
            res.json({
                'code': 1,
                'lists': result
            })
        })
    })
}