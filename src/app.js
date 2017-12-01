const bodyParser = require('koa-bodyparser')
const Koa = require('koa')
const logger = require('koa-logger')
const helmet = require('koa-helmet')
const mount = require('koa-mount')
const cors = require('@koa/cors')
const mongoose = require('mongoose')
const api = require('./routes')

const { PORT, MONGO_URL } = process.env

mongoose.Promise = global.Promise
try {
  mongoose.connect(process.env.MONGO_URL, {
    useMongoClient: true,
  })
} catch (err) {
  mongoose.createConnection(process.env.MONGO_URL, {
    useMongoClient: true,
  })
}
mongoose.connection
  .once('open', () => console.log('MongoDB Initialized'))
  .on('error', err => {
    throw err
  })

// Create Koa Application
const app = new Koa()

app
  .use(logger())
  .use(bodyParser())
  .use(helmet())
  .use(cors())
  .use(mount('/api', api))

// Start the application
app.listen(PORT, () => console.log(`The server is running at ${PORT}`))
