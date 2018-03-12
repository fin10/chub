import express from 'express'
import path from 'path'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import util from 'util'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from '../webpack.dev.config.js'

import passport from 'passport'
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'
import axios from 'axios'

import Api from './routes/api'

const host = process.env.HOST || 'localhost'
const port = process.env.PORT || '3000'

axios.defaults.baseURL = util.format('http://%s:%s', host, port)

const app = express()

const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'production'
if (env == 'development') {
  console.log('Server is running on development mode.')
  const compiler = webpack(config)
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
  }))
  app.use(webpackHotMiddleware(compiler))

  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next()

    const filename = path.join(config.output.path, 'index.html')
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) return next(err)
      res.set('content-type', 'text/html')
      res.send(result)      
      res.end()
    })
  })
} else {
  app.use('/', express.static(path.resolve(__dirname, '../dist')))
}

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => { console.log('mongodb is connected.') });
mongoose.connect('mongodb://' + process.env.MONGO_DB_HOST + '/chub')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
  done(null, user.id);
})

passport.deserializeUser((id, done) => {
  axios.get('/api/user/' + id)
    .then((res) => {
      done(null, res.data)
    })
    .catch((err) => {
      console.error(err)
      done(err.errno)
    })
})

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/api/auth/google/callback'
  }, 
  (accessToken, refreshToken, profile, done) => {
    axios.post('/api/user/createOrGet', { profile: profile })
      .then((res) => {
        done(null, res.data)
      })
      .catch((err) => {
        console.error(err)
        done(err.code)
      })
  })
)

app.use('/api', Api)

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