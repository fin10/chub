import express from 'express'
import path from 'path'
import logger from 'morgan'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import util from 'util'
import reactViewEngine from 'express-react-views'

import auth from './auth'
import database from './model/database'
import axios from 'axios'

import Api from './routes/api'
import App from './routes/app'

const host = process.env.HOST || 'localhost'
const port = process.env.PORT || '3000'

axios.defaults.baseURL = util.format('http://%s:%s', host, port)

const app = express()

app.set('views', path.resolve(__dirname, '../src'))
app.set('view engine', 'jsx')
app.engine('jsx', reactViewEngine.createEngine())

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({ 
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}))
app.use(cookieParser())

database()
auth(app)

app.use('/api', Api)
app.use('/', App)

app.use((req, res, next) => {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.send(err)
})

app.listen(port, host, () => {
  console.log('Backend server is listening on port', port)
})