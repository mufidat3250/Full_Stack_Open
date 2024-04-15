const {test, after, beforeEach, describe} = require('node:test')
const assert = require('node:assert')
const mongoose = require ('mongoose')
const superTest = require('supertest')
const app = require('../app')
const Blogs = require('../models/blogModel')
const {initialBlogs, blogInDB}  = require('./test_helper')


const api = superTest(app)

describe('When thier is initially some  blog saved', ()=> {
    beforeEach(async () => {
        await Blogs.deleteMany({})
        // some Authentication needs to happen here
        let blogObject = new Blogs(initialBlogs[0])
        await blogObject.save()
        blogObject = new Blogs(initialBlogs[1])
        await blogObject.save()
    })

    test('blogs are returned as json', async()=>{
        await api.get('/api/blogs').expect(200)
        .expect('Content-Type', /application\/json/)
     })
     test('All blogs list are returned', async()=> {
        const response = await api.get('/api/blogs')
        const result = response.body.length
        
        assert.strictEqual(result, initialBlogs.length)
    })
    test('a specific blog is within the returned blogs', async()=> {
        const response = await api.get('/api/blogs')
        const contents = response.body.map((res)=> res.title)
        assert(contents.includes('Learning Local Storage'))
    })

    test('Does each blog have a unique id', async()=> {
        const blogs = await Blogs.find({})
        const allblog =  await (await api.get('/api/blogs')).body
        assert(allblog.map((blog)=> blog.id))
    })

    describe('addition of a new blog', ()=> {

        test('A valid blog can be added', async()=> {
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
            const  blogsAtEnd = await blogInDB()
            assert.strictEqual(blogsAtEnd.length, initialBlogs.length + 1)
            const contents = blogsAtEnd.map(n => n.title)
            assert(contents.includes('async/await simplifies making async calls'))
        })
        test('likes properties missing default to zero', async()=>{
            const newBlog = {
                title: "async/await simplifies making async calls",
                author: "Mufidat",
                url: "http:localhost:8000/how_to_write_test",
            }
            await api.post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-type', /application\/json/)
            const blogAtEnd = await blogInDB()
            assert.strictEqual(blogAtEnd.length, initialBlogs.length + 1)
            const contents = blogAtEnd.map(n => n.title)
            assert(contents.includes('async/await simplifies making async calls'))
        })
        
        test('blog without name or url property', async()=> {
            const newBlog = {
                author: 'Mufidat',
            }
            await api.post('/api/blogs')
            .send(newBlog)
            .expect(400)
        const response = await blogInDB()
            assert.strictEqual(response.length, initialBlogs.length)
        })
    })

    describe('View a specific blog', ()=>{
      
        test('Succed with a valid id', async()=> {
            const  blogAtStart = await blogInDB()
            const blogToView = blogAtStart[0]
            const resultBlog = await api.get(`/api/blogs/${blogToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
            assert.deepStrictEqual(resultBlog.body, blogToView)
        })
        test('Failed with status code 404 if blog does not exist', async()=>{
            const currentStateOfDB = await blogInDB()
            const id = '6600763a0375220044685559'
            await api.get(`/api/blogs${id}`)
                .expect(404)
        })

    })
    describe('deletion of a blog', ()=>{
        test('succed with status code 204 if the id is valid', async()=>{
            const blogAtStart = await blogInDB()
            const blogToDelete = blogAtStart[0]
             await api.delete(`/api/blogs/${blogToDelete.id}`)
             .expect(204)
             const blogAtEnd =  await blogInDB()
             assert.strictEqual(blogAtEnd.length, blogAtStart.length - 1)
             const content = blogAtEnd.map((t)=> t.title)
             assert(!content.includes(blogAtEnd.title))
        })
    })

    describe('Update a blog', ()=>{
        test('blog updated Successfully', async()=>{
            const allBlogs = await blogInDB()
            const blogToUpdate = allBlogs[0]
            const blogObject = {
                ...blogToUpdate,
                likes:202
            }
         await api.put(`/api/blogs/${blogToUpdate.id}`)
           .send(blogObject)
            .expect(200)
            .expect('Content-Type', /application\/json/)
            const blogAtEnd = await blogInDB()

            const likes = blogAtEnd.map((b)=> b.likes)
            assert.strictEqual(likes[0], blogObject.likes)
        })
    })
})

after(async ()=>{
    await mongoose.connection.close()
})