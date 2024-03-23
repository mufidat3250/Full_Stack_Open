const Blog = require("../models/blogModel");
const getBlog = (req, res) => {
  Blog.find({}).then((blogs) => {
    res.json(blogs);
  });
};

const createBlog = async(req, res) => {
  const blog = new Blog(req.body);
  console.log(res.body)
  const saveBlog = await blog.save()
  res.send(201).json(saveBlog) 
};
const deleteBlog = async(request, response) => {
  const id = request.params.id
  const blogToDelete = await Blog.findByIdAndDelete(id)
  response.status(204).json(blogToDelete)
}

const getSingleBlog = async(request, response) => {
  const id = request.params.id
  const blog = await Blog.findById(id)
  response.status(200).json(blog)
}

module.exports = {
  getBlog,
  createBlog,
  deleteBlog,
  getSingleBlog
};
