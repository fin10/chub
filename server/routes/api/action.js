import express from 'express'

import { User, Series } from '../../model'

const router = express.Router()

router.post('/awesome', (req, res) => {
  if (!req.user) return res.status(500).send('Login needed.')

  const { userId, seriesId } = req.query

  User.findOne({ id: userId })
      .then(user => {
        if (!user) return Promise.reject(new Error(userId + ' not found.'))
        return Series.findOne({ id: seriesId, owner: user._id })
      })
      .then(series => {
        if (!series) return Promise.reject(new Error(seriesId + ' not found.'))
        
        let promise = null
        let awesomes = series.awesomes
        if (awesomes.some(id => id.equals(req.user._id))) {
          awesomes.pull(req.user._id)
          promise = series.update({$pull: { awesomes: req.user._id }})
        } else {
          awesomes.push(req.user._id)
          promise = series.update({$push: { awesomes: req.user._id }})
        }
        
        return promise.then(() => {
          res.json(awesomes)
        })
      })
      .catch(err => {
        console.error(err.message)
        res.status(500).send(err.message)
      })
})

router.post('/follow', (req, res) => {
  if (!req.user) return res.status(500).send('Login needed.')

  const { userId, seriesId } = req.query

  User.findOne({ id: userId })
      .then(user => {
        if (!user) return Promise.reject(new Error(userId + ' not found.'))
        return Series.findOne({ id: seriesId, owner: user._id })
      })
      .then(series => {
        if (!series) return Promise.reject(new Error(seriesId + ' not found.'))
        
        let promise = null
        let follows = series.follows
        if (follows.some(id => id.equals(req.user._id))) {
          follows.pull(req.user._id)
          promise = series.update({$pull: { follows: req.user._id }})
        } else {
          follows.push(req.user._id)
          promise = series.update({$push: { follows: req.user._id }})
        }

        return promise.then(() => {
          res.json(follows)
        })
      })
      .catch(err => {
        console.error(err.message)
        res.status(500).send(err.message)
      })
})

router.post('/folk', (req, res) => {
  if (!req.user) return res.status(500).send('Login needed.')

  const { userId, seriesId } = req.query

  User.findOne({ id: userId })
      .then(user => {
        if (!user) return Promise.reject(new Error(userId + ' not found.'))
        return Series.findOne({ id: seriesId, owner: user._id })
      })
      .then(series => {
        if (!series) return Promise.reject(new Error(seriesId + ' not found.'))
        
        let promise = null
        let folks = series.folks
        if (folks.some(id => id.equals(req.user._id))) {
          folks.pull(req.user._id)
          promise = series.update({$pull: { folks: req.user._id }})
                          .then(() => User.findByIdAndUpdate(req.user._id, {$pull: { series: series._id }}))
        } else {
          folks.push(req.user._id)
          promise = series.update({$push: { folks: req.user._id }})
                          .then(() => User.findByIdAndUpdate(req.user._id, {$push: { series: series._id }}))
        }

        return promise.then(() => {
          res.json(folks)
        })
      })
      .catch(err => {
        console.error(err.message)
        res.status(500).send(err.message)
      })
})

export default router