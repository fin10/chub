import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  res.redirect('/profile/' + req.user.id)
})

router.get('/', (req, res) => {
  res.render('containers/App')
})

router.get('/login', (req, res) => {
  res.render('containers/Login')
})

router.get('/profile/:id', (req, res) => {
  res.render('containers/Profile', { 
    id: req.params.id, 
    user: req.user 
  })
})

module.exports = router;
