import express from 'express'
import User from '../../model/user'
import Url from 'url'
import Util from 'util'

const router = express.Router()

router.post('/createOrGet', (req, res) => {
  if (!req.body.profile) {
    return res.status(500).send('profile is empty.')
  }

  const profile = req.body.profile

  User.findOne({ id: profile.id }, (err, user) => {
      if (err) return res.status(500).send(err.msg)
      if (user) return res.send(user)

      user = new User({
        id: profile.id,
        username: profile.displayName,
      })

      if (profile.emails.length > 0) user.email = profile.emails[0].value
      if (profile.photos.length > 0) {
        const url = Url.parse(profile.photos[0].value)
        user.photo = Util.format('%s//%s%s', url.protocol, url.hostname, url.pathname)
      }

      user.save((err, user) => {
        if (err) return res.status(500).send(err.msg)
        return res.send(user)
      })
  })
})

router.get('/:id', (req, res) => {
  User.findOne({ id: req.params.id }, (err, user) => {
      if (err) return res.status(500).send(err.msg)
      if (user) return res.send(user)
      return res.send(null)
  })
})

export default router