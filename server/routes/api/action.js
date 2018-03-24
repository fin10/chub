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
        
        let awesomes = series.awesomes
        if (0 == awesomes.filter(id => id.equals(req.user._id)).length) {
          awesomes = awesomes.concat([req.user._id])
        } else {
          awesomes = awesomes.filter(id => !id.equals(req.user._id))
        }

        return series.update({
          awesomes: awesomes
        }).then(() => {
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
        
        let follows = series.follows
        if (0 == follows.filter(id => id.equals(req.user._id)).length) {
          follows = follows.concat([req.user._id])
        } else {
          follows = follows.filter(id => !id.equals(req.user._id))
        }

        return series.update({
          follows: follows
        }).then(() => {
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
        
        let folks = series.folks
        if (0 == folks.filter(id => id.equals(req.user._id)).length) {
          folks = folks.concat([req.user._id])
        } else {
          folks = folks.filter(id => !id.equals(req.user._id))
        }

        return series.update({
          folks: folks
        }).then(() => {
          res.json(folks)
        })
      })
      .catch(err => {
        console.error(err.message)
        res.status(500).send(err.message)
      })
})

export default router