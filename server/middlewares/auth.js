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
        done(null, res.data)
      })
      .catch((err) => {
        console.error(err)
        done(err.errno)
      })
  })

  app.get('/', (req, res, next) => {
    if (req.isAuthenticated() || req.path.startsWith('/login') || req.path.startsWith('/auth')) {
      res.redirect('/profile/' + req.user.id)
    } else {
      res.redirect('/login')
    }
  })
    
  app.get('/auth/google',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] })
  )

  app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
      console.log('user:', req.user)
      res.redirect('/profile/' + req.user.id)
    }
  )
  
  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback'
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
}