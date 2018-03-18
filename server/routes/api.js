import express from 'express'
import userApi from './api/user'
import seriesApi from './api/series'

const router = express.Router()

router.use('/user', userApi)
router.use('/series', seriesApi)

module.exports = router;
