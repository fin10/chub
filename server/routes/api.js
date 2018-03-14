import express from 'express'
import userApi from './api/user'

const router = express.Router()

router.use('/user', userApi)

module.exports = router;
