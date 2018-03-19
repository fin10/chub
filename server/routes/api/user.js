import express from 'express'
import Url from 'url'
import Util from 'util'

import { User } from '../../model'

const router = express.Router()

router.get('/current', (req, res) => {
  return res.json(req.user)
})

router.post('/createOrGet', (req, res) => {
  if (!req.body.profile) {
    return res.status(500).send('profile is empty.')
  }

  const { profile } = req.body

  if (profile.emails.length == 0) {
    return res.status(500).send('There is no email.')
  }

  const id = profile.emails[0].value.substring(0, profile.emails[0].value.indexOf('@'))

  User.findOne({ id: id }, (err, user) => {
      if (err) return Promise.reject(err)
      if (user) return user

      user = new User({
        id: id,
        username: profile.displayName,
        email: profile.emails[0].value
      })

      if (profile.photos.length > 0) {
        const url = Url.parse(profile.photos[0].value)
        user.photo = Util.format('%s//%s%s', url.protocol, url.hostname, url.pathname)
      }

      return user.save()
    })
    .then(user => {
      res.json(user)
    })
    .catch(err => {
      res.status(500).send(err.message)
    })
})

router.get('/:id', (req, res) => {
  User.findOne({ id: req.params.id })
    .populate({
      path: 'series',
      populate: { path: 'owner' }
    })
    .then(user => {
      if (!user) {
        return Promise.reject(new Error(req.params.id + ' not found.'))
      }

      res.json(user)
    })
    .catch(err => {
      res.status(500).send(err.message)
    })
})

export default router