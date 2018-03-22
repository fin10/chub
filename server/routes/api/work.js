import express from 'express'
import keyGen from '../../util/key-generator'

import { User, Series, Work, Contents, workTypes } from '../../model'

const router = express.Router()

router.get('/types', (req, res) => {
  return res.send(workTypes)
})

router.post('/new', (req, res) => {
  if (!req.user) {
    return res.status(500).send('Login needed.')
  }

  const {
    userId, seriesId, title, type, contents
  } = req.body

  User.findOne({ id: userId })
    .then(user => {
      return Series.findOne({ id: seriesId, owner: user._id })
    })
    .then(series => {
      if (!series) return Promise.reject(userId + '/' + seriesId + ' not found.')

      return new Contents({
        body: contents
      }).save()
        .then(contents => {
          return new Work({
            id: keyGen(title),
            title: title,
            type: type,
            owner: req.user._id,
            series: series._id,
            contents: contents._id
          }).save()
        })
        .then(work => {
          return series.update({ works: series.works.concat([work]) })
                      .then(() => {
                        res.send(work)
                      })
        })
    })
    .catch(err => {
      console.error(err)
      res.status(500).send(err.message)
    })
})

router.get('/:userId/:seriesId/:workId', (req, res) => {
  const { userId, seriesId, workId } = req.params

  User.findOne({ id: userId })
    .then(user => {
      if (!user) return Promise.reject(userId + ' not found.')
      return Series.findOne({ id: seriesId, owner: user._id })
    })
    .then(series => {
      if (!series) return Promise.reject(series + ' not found.')
      return Work.findOne({ id: workId, series: series._id })
                .populate(['contents', 'owner', {path: 'series', populate: {path: 'owner'}}])
    })
    .then(work => {
      res.json(work)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send(err.message)
    })
})

export default router