import express from 'express'
import User from '../model/user'

const router = express.Router()

router.post('/createOrGet', (req, res) => {
  if (!req.body.profile) {
    return res.status(500).send('profile is empty.')
  }

  const profile = req.body.profile

  User.findOne({ id: profile.id }, (err, user) => {
      if (err) return res.status(500).send(err.msg)
      if (user) return res.send(user)

      new User({
        id: profile.id,
        username: profile.displayName
      }).save((err, user) => {
        if (err) return res.status(500).send(err.msg)
        return res.send(user)
      })
  })
})

export default router