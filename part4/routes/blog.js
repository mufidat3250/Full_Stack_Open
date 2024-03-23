const router = require('express').Router()
const {getBlog, createBlog, deleteBlog, getSingleBlog}  = require('../controller/blog')

router.get('/', getBlog)
router.post('/', createBlog)
router.get('/:id', getSingleBlog)
router.delete('/:id', deleteBlog)


module.exports = router