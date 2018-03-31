import express from 'express'
import keyGen from '../../util/key-generator'

import { User, Series } from '../../model'

const router = express.Router()

router.post('/new', (req, res) => {
  if (!req.body.title || req.body.title.length == 0) {
    return res.status(500).send('title should not be empty.')
  }

  if (!req.user) {
    return res.status(500).send('Login needed.')
  }

  const title = req.body.title
  const desc = req.body.desc
  const tags = req.body.tags ? [...new Set(req.body.tags)] : []

  new Series({
    id: keyGen(title),
    title: title,
    description: desc,
    owner: req.user._id,
    tags: tags
  }).save()
    .then(series => {
      res.send(series)
    })
    .catch(err => {
      console.error(err.message)
      res.status(500).send(err.message)
    })
})

router.get('/:userId/:seriesId', (req, res) => {
  const { userId, seriesId } = req.params

  User.findOne({ id: userId })
    .then(user => {
      if (!user) return Promise.reject(new Error(userId + ' not found.'))
      return Series.findOne({ id: seriesId, owner: user._id }).populate({ path: 'works', 'populate': { path: 'owner' } })
    })
    .then(series => {
      res.json({
        login: req.user,
        series: series
      })
    })
    .catch(err => {
      console.error(err.message)
      res.status(500).send(err.message)
    })
})

router.get('/:userId', (req, res) => {
  const { userId } = req.params

  User.findOne({ id: userId }).populate({ path: 'series', 'populate': { path: 'owner' } })
    .then(user => {
      if (!user) return Promise.reject(new Error(userId + ' not found.'))
      res.json({
        login: req.user,
        series: user.series
      })
    })
    .catch(err => {
      console.error(err.message)
      res.status(500).send(err.message)
    })
})

router.get('/', (req, res) => {
  const { limit } = req.query

  let promise = Series.find()
  if (limit) promise = promise.limit(Number.parseInt(limit))

  promise.then(series => res.json(series))
        .catch(err => {
          console.error(err)
          res.status(500).send(err.message)
        })
})

export default router