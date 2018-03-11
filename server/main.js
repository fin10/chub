import express from 'express'
import path from 'path'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from '../webpack.dev.config.js'

import passport from 'passport'
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'
import axios from 'axios'

import Api from './routes/api'

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
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(passport.initialize())

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => { console.log('mongodb is connected.') });
mongoose.connect('mongodb://' + process.env.MONGO_DB_HOST + '/chub')

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/api/auth/google/callback'
  }, 
  (accessToken, refreshToken, profile, done) => {
    axios.post('http://localhost:3000/api/user/createOrGet', { profile: profile })
      .then((res) => {
        // console.log(res)
        done(null, res)
      })
      .catch((err) => {
        console.error(err)
        done(err.errno)
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

const host = process.env.HOST || 'localhost'
const port = process.env.PORT || '3000'

app.listen(port, host, () => {
  console.log('Backend server is listening on port', port)
})