const path = require('path')
require('dotenv').config()
require('babel-register')
require('babel-polyfill')
require(path.join(__dirname, '/app.js'))

