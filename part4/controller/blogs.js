require('dotenv').config()
const Blog = require("../models/blogModel");
const User = require('../models/userModel');
const jwt = require('jsonwebtoken')

const getBlog = async(req, res, next) => {
  try {
    const response = await Blog.find({}).populate('user')
    res.json(response)
    
  } catch (error) {
      next(error)
  }
};

const createBlog = async(req, res, next) => {
  try {
    const body = req.body
    if(!body.title || !body.url){
      return res.status(400).send({
        error: "title or url is missing",
    })
    }
    if(!body.likes){
      body.likes = 0
    }
    console.log(req)

    const decodedToken = jwt.verify(req.token, process.env.SECRET, { expiresIn: 60*60 }
    )
    let user = await User.findById(decodedToken.id)
    const newBlog = {
      title: body.title,
      author:body.author,
      url:body.url,
      likes:body.likes,
      user:user._id
    }
    const blog = new Blog(newBlog);
    const saveBlog = await blog.save()
    user.blogs = user.blogs.concat(saveBlog.id)
    await user.save()
    res.status(201).json(saveBlog) 
    
   } catch (error) {
    console.log(error)
    next(error)
  }
};
const deleteBlog = async(request, response, next) => {
 try {
  const id = request.params.id
  const blogToDelete = await Blog.findByIdAndDelete(id)
  response.status(204).json(blogToDelete)
 } catch (error) {
  console.log(error)
  next(error)
 }
}

const getSingleBlog = async(req, res, next) => {
    try {
      const id = req.params.id
  const blog = await Blog.findById(id)
  if(blog){
    res.status(200).json(blog)
  }else {
    res.status(400).end()
  }
  } catch (error) {
      console.log(error)
      next(error)
    }
}

const updateBlog = async(req, res, next) => {
  try {
    const id = req.params.id
    const body = req.body
    const blogObject = {
        likes: body.likes & Number(body.likes) + 1  
      }
    const blog = await Blog.findByIdAndUpdate(id, blogObject, {new: true, runValidators: true})
    res.status(200).json(blog)

  } catch (error) {
    console.log(error)
    next(error)
  }
}


module.exports = {
  getBlog,
  createBlog,
  deleteBlog,
  getSingleBlog,
  updateBlog
};
