import express from 'express'
import passport from 'passport'
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'
import axios from 'axios'

export default (app) => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.serializeUser((user, done) => {
    done(null, user.id);
  })

  passport.deserializeUser((id, done) => {
    axios.get('/api/user/' + id)
      .then((res) => {
        done(null, res.data.user)
      })
      .catch((err) => {
        console.error(err)
        done(err.errno)
      })
  })

  app.get('/', (req, res, next) => {
    if (req.isAuthenticated() || req.path.startsWith('/login') || req.path.startsWith('/auth')) {
      next()
    } else {
      res.redirect('/login')
    }
  })

  app.get('/login', (req, res, next) => {
    if (req.isAuthenticated()) {
      res.redirect('/')
    } else {
      next()
    }
  })

  app.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/login')
  })

  const router = express.Router()
  
  router.get('/user', (req, res) => {
    return res.json(req.user)
  })
    
  router.get('/google',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.profile.emails.read'] })
  )

  router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
      res.redirect('/')
    }
  )
  
  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback'
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

  app.use('/auth', router)
}