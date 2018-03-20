import express from 'express'
import userApi from './api/user'
import seriesApi from './api/series'
import workApi from './api/work'

const router = express.Router()

router.use('/user', userApi)
router.use('/series', seriesApi)
router.use('/work', workApi)

module.exports = router;
