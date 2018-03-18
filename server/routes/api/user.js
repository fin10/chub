import express from 'express'
import Url from 'url'
import Util from 'util'

import { User, Series } from '../../model'

const router = express.Router()

router.post('/createOrGet', (req, res) => {
  if (!req.body.profile) {
    return res.status(500).send(new Error('profile is empty.'))
  }

  const profile = req.body.profile

  User.findOne({ id: profile.id }, (err, user) => {
      if (err) return res.status(500).send(err)
      if (user) return res.json(user)

      user = new User({
        id: profile.id,
        username: profile.displayName,
        creationTime: Date.now(),
      })

      if (profile.emails.length > 0) user.email = profile.emails[0].value
      if (profile.photos.length > 0) {
        const url = Url.parse(profile.photos[0].value)
        user.photo = Util.format('%s//%s%s', url.protocol, url.hostname, url.pathname)
      }

      user.save((err, user) => {
        if (err) return res.status(500).send(err)
        return res.json(user)
      })
  })
})

router.get('/current', (req, res) => {
  return res.json(req.user)
})

router.get('/:id', (req, res) => {
  User.findOne({ id: req.params.id })
    .populate({
      path: 'series',
      populate: { path: 'owner' }
    })
    .then(user => {
      if (!user) {
        let err = new Error('req.params.id doesn\'t exists.')
        err.statusCode = 404
        return Promise.reject(err)
      }

      res.json(user)
    })
    .catch(err => {
      res.send(err)
    })
})

export default router