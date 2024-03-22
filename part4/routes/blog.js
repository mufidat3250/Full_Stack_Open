const router = require('express').Router()
const {getBlog, createBlog}  = require('../controller/blog')

router.get('/', getBlog)
router.post('/', createBlog)

module.exports = router