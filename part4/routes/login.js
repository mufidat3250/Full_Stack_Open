const router = require('express').Router()
const login = require('../controller/login')

router.post('/', login)

module.exports = router