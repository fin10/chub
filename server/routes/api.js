import express from 'express'
import userApi from './api/user'
import seriesApi from './api/series'
import workApi from './api/work'
import actionApi from './api/action'

const router = express.Router()

router.use('/user', userApi)
router.use('/series', seriesApi)
router.use('/work', workApi)
router.use('/action', actionApi)

module.exports = router;
