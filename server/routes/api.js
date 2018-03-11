import express from 'express'
import userApi from '../api/user'
import authApi from '../api/auth'

const router = express.Router()

router.use('/auth', authApi)
router.use('/user', userApi)

module.exports = router;
