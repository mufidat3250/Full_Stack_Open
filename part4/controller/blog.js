const Blog = require("../models/blogModel");
const getBlog = (req, res) => {
  Blog.find({}).then((blogs) => {
    res.json(blogs);
  });
};

const createBlog = async(req, res) => {
  try {
    const body = req.body
    if(!body.name || !body.author){
     return res.status(400).json({message:'Name or Author is missing'})
    }
    if(!body.likes){
      body.likes = 0
      console.log(body)
    }
    const blog = new Blog(body);
  const saveBlog = await blog.save()
  res.status(201).json(saveBlog) 
  } catch (error) {
    console.log(error)
  }
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
