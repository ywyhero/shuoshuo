const db = require('./db');
const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
    'username': String,
    'password': String
})

const ContentSchema = new mongoose.Schema({
    'content': String,
    'time': Date,
    'username': String,
    'count': Number
})

exports.Login = db.model('Login', LoginSchema)

exports.Content = db.model('Content', ContentSchema)