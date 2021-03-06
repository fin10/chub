import express from 'express'
import path from 'path'
import logger from 'morgan'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import Util from 'util'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import authMiddleware from './middlewares/auth'
import dbMiddleware from './middlewares/database'
import axios from 'axios'

import Api from './routes/api'

const host = process.env.HOST || 'localhost'
const port = process.env.PORT || '3000'
const env = process.env.NODE_ENV

axios.defaults.baseURL = Util.format('http://%s:%s', host, port)

const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({ 
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}))
app.use(cookieParser())

authMiddleware(app)
dbMiddleware()

app.use('/static', express.static(path.join(__dirname, '../public')))
app.use('/api', Api)

app.get('/', (req, res) => {
  res.redirect('/discovery')
})

if (env == 'development') {
  console.log('Server is running on development mode.')
  const config = require('../webpack.dev.config')
  const compiler = webpack(config)

  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
  }))

  app.use(webpackHotMiddleware(compiler))

  app.get('*', (req, res, next) => {
    const filename = path.join(config.output.path, 'index.html')
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) return next(err)
      res.set('content-type', 'text/html')
      res.send(result)      
      res.end()
    })
  })
} else {
  const dist = path.resolve(__dirname, '../dist')
  app.use(express.static(dist))
  app.get('*', (req, res) => res.sendFile(path.join(dist, 'index.html')))
}

app.use((req, res, next) => {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.send(err)
})

app.listen(port, host, () => {
  console.log('Backend server is listening on port', port)
})