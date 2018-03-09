import express from 'express'
import path from 'path'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from '../webpack.dev.config.js'

import index from './routes/index'
import users from './routes/users'

const app = express()

const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'production'
if (env == 'development') {
  console.log('Server is running on development mode.')
  const compiler = webpack(config)
  app.use(webpackDevMiddleware(compiler))
  app.use(webpackHotMiddleware(compiler))
} else {
  app.use('/', express.static(path.resolve(__dirname, '../dist')))
}

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(cookieParser())

app.use('/', index)
app.use('/users', users)

app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use(function (err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.send(err)
})

const host = process.env.HOST || 'localhost'
const port = process.env.PORT || '3000'

app.listen(port, host, () => {
  console.log('Backend server is listening on port', port)
})