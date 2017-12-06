const bodyParser = require('koa-bodyparser')
const Koa = require('koa')
const logger = require('koa-logger')
const helmet = require('koa-helmet')
const mount = require('koa-mount')
const cors = require('@koa/cors')
const mongoose = require('mongoose')
const api = require('./routes')

const { PORT, MONGO_URL, API_BASE } = process.env
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
  .once('open', () => console.log(`MongoDB Initialized`))
  .on('error', err => {
    throw err
  })

// Create Koa Application
const app = new Koa()

app
  .use(async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      ctx.status = err.status || 500
      ctx.body = err.message
      ctx.app.emit('error', err, ctx)
    }
  })
  .use(logger())
  .use(bodyParser())
  .use(helmet())
  .use(cors())
  .use(mount(API_BASE, api))
  console.log(`API mounted.`)
  console.log(`Base URL: ${API_BASE}`)
// Start the application
app.listen(PORT, () => console.log(`Server Port: ${PORT}`))
