import express from 'express'
import Url from 'url'
import Util from 'util'

import { User } from '../../model'

const router = express.Router()

router.post('/createOrGet', (req, res) => {
  if (!req.body.profile) {
    return res.status(500).send('profile is empty.')
  }

  const { profile } = req.body

  if (profile.emails.length == 0) {
    return res.status(500).send('There is no email.')
  }

  const id = profile.emails[0].value.substring(0, profile.emails[0].value.indexOf('@'))

  User.findOne({ id: id })
      .then(user => {
        if (user) return user

        let photo = null
        if (profile.photos.length > 0) {
          const url = Url.parse(profile.photos[0].value)
          photo = Util.format('%s//%s%s', url.protocol, url.hostname, url.pathname)
        }
        
        return new User({
          id: id,
          username: profile.displayName ? profile.displayName : id,
          email: profile.emails[0].value,
          photo: photo
        }).save()
      })
      .then(user => {
        res.json(user)
      })
      .catch(err => {
        console.err(err.message)
        res.status(500).send(err.message)
      })
})

router.get('/:id', (req, res) => {
  User.findOne({ id: req.params.id })
    .then(user => {
      if (!user) return Promise.reject(new Error(req.params.id + ' not found.'))
      res.json({
        login: req.user,
        user: user
      })
    })
    .catch(err => {
      console.err(err.message)
      res.status(500).send(err.message)
    })
})

router.get('/', (req, res) => {
  const { sort, limit } = req.query

  let promise = User.find()
  if (sort) promise = promise.sort(sort)
  if (limit) promise = promise.limit(Number.parseInt(limit))

  promise.then(users => res.json(users))
      .catch(err => {
        console.err(err.message)
        res.status(500).send(err.message)
      })
})

export default router