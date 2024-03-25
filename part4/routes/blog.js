const router = require('express').Router()
const {getBlog, createBlog, deleteBlog, getSingleBlog, updateBlog}  = require('../controller/blogs')

router.get('/', getBlog)
router.post('/', createBlog)
router.get('/:id', getSingleBlog)
router.delete('/:id', deleteBlog)
router.put('/:id', updateBlog)


module.exports = router