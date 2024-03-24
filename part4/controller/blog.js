const { response } = require("../app");
const Blog = require("../models/blogModel");
const getBlog = (req, res) => {
  Blog.find({}).then((blogs) => {
    res.json(blogs);
  });
};

const createBlog = async(req, res) => {
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
    const blog = new Blog(body);
    const saveBlog = await blog.save()
    res.status(201).json(saveBlog) 
    
   } catch (error) {
    console.log(error)
  }
};
const deleteBlog = async(request, response) => {
 try {
  const id = request.params.id
  const blogToDelete = await Blog.findByIdAndDelete(id)
  response.status(204).json(blogToDelete)
 } catch (error) {
  console.log(error)
 }
}

const getSingleBlog = async(req, res) => {
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
    }
}

const updateBlog = async(req, res) => {
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
  }
}


module.exports = {
  getBlog,
  createBlog,
  deleteBlog,
  getSingleBlog,
  updateBlog
};
