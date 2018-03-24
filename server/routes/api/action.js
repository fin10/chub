import express from 'express'

import { User, Series } from '../../model'

const router = express.Router()

router.post('/awesome', (req, res) => {
  const { userId, seriesId } = req.query
  
  res.status(500).send('Not implemented yet.')
})

router.post('/follow', (req, res) => {
  res.status(500).send('Not implemented yet.')
})

router.post('/folk', (req, res) => {
  res.status(500).send('Not implemented yet.')
})

export default router