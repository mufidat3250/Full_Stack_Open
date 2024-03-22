const Blog = require("../models/blogModel");
const getBlog = (req, res) => {
  Blog.find({}).then((blogs) => {
    res.json(blogs);
  });
};

const createBlog = (req, res) => {
  const blog = new Blog(req.body);
  blog.save().then((result) => {
    res.json(201).json(result);
  });
};

module.exports = {
  getBlog,
  createBlog,
};
