import express from 'express'

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
  const userId = req.user._id

  User.findById(userId)
    .then(user => {
      if (!user) return Promise.reject(req.user.id + ' not found.')

      const newSeries = new Series({
        id: title.replace(/[~!@#$%^&*()+`\\<>?/'":;\[\]{}]/g, '').replace(/\s/g, '-'),
        title: title,
        description: desc,
        owner: user,
      })

      newSeries.save()
        .then(series => {
          user.update({ series: user.series.concat([series._id]) })
            .then(() => {
              res.send(series)
            })
        }).catch(err => {
          console.error(err)
          res.status(500).send(err.message)
        })
    })
    .catch(err => {
      console.error(err)
      res.status(500).send(err.message)
    })
})

router.get('/:userId/:seriesId', (req, res) => {
  const { userId, seriesId } = req.params

  User.findOne({ id: userId })
    .then(user => {
      return Series.findOne({ id: seriesId, owner: user._id }).populate(['owner', 'works'])
    })
    .then(series => {
      res.json(series)
    })
    .catch(err => {
      console.error(err)
      res.send(err.message)
    })
})

export default router