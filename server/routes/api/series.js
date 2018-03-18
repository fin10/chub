import express from 'express'

import { User, Series } from '../../model'

const router = express.Router()

router.post('/new', (req, res) => {
  if (!req.body.title || req.body.title.length == 0) {
    return res.status(500).send(new Error('title is empty.'))
  }

  if (!req.user) {
    return res.status(500).send(new Error('Need to login.'))
  }

  const title = req.body.title
  const desc = req.body.desc
  const owner = req.user._id

  User.findById(owner)
    .then(user => {
      if (!user) return Promise.reject(new Error(owner + ' not found.'))

      const newSeries = new Series({
        title: title,
        description: desc,
        owner: owner,
        creationTime: Date.now()
      })

      newSeries.save()
        .then(series => {
          user.update({ series: user.series.concat([series._id]) })
            .then(() => {
              res.send(series)
            })
        })
        .catch(err => {
          console.error(err)
          res.send(err)
        })
    })
    .catch(err => {
      console.error(err)
      res.send(err)
    })
})

router.get('/:id', (req, res) => {
  Series.findById(req.params.id)
    .populate('owner')
    .then((series) => {
      res.json(series)
    })
    .catch(err => {
      console.error(err)
      res.send(err)
    })
})

export default router