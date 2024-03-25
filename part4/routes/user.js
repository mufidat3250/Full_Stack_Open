const router = require('express').Router()
const {createUser, getAllUsers} = require('../controller/users')

router.get('/', getAllUsers)
router.post('/', createUser)


module.exports = router