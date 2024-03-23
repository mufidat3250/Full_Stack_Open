const {test, after, beforeEach} = require('node:test')
const assert = require('node:assert')
const mongoose = require ('mongoose')
const superTest = require('supertest')
const app = require('../app')
const Blogs = require('../models/blogModel')
const {initialBlogs, blogInDB}  = require('./test_helper')


const api = superTest(app)


beforeEach(async () => {
    await Blogs.deleteMany({})
    let blogObject = new Blogs(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blogs(initialBlogs[1])
    await blogObject.save()

})

test('blogs are returned as json', async()=>{
   let getAllblog =  await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
   console.log(getAllblog, 'all blog post')
})

test('All blogs list are returned', async()=> {
    const response = await api.get('/api/blogs')
    const result = response.body.length
    
    assert.strictEqual(result, initialBlogs.length)
})

test('a specific blog is within the returned note', async()=> {
    const response = await api.get('/api/blogs')
    const contents = response.body.map((res)=> res.title)
    assert(contents.includes('Node testing eexplained'))
})

test.only('A valid blog can be added', async()=> {
    const  blogsAtEnd = await blogInDB()
    const newBlog = {
        title: "async/await simplifies making async calls",
        author: "Mufidat",
        url: "http:localhost:8000/how_to_write_test",
        likes: 5,
    }
    await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
    

    
    console.log(blogsAtEnd, blogsAtEnd.length , initialBlogs.length + 1)
    assert.strictEqual(blogsAtEnd.length, initialBlogs.length + 1)
    const contents = blogsAtEnd.map(n => n.title)
    assert(contents.includes('async/await simplifies making async calls'))
})


after(async ()=>{
    await mongoose.connection.close()
})