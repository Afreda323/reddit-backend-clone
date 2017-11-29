import bodyParser from 'koa-bodyparser'
import Koa from 'koa'
import logger from 'koa-logger'
import helmet from 'koa-helmet'
import mount from 'koa-mount'
import cors from '@koa/cors'
import mongoose from 'mongoose'
import api from './routes'

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
