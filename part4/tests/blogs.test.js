// const {test, describe} = require('node:test')
// const  assert = require('node:assert')
// const listHelper = require('../utils/list_helper')
//  const blogs = require('../data')  

// test('dummy return one', ()=> {
//     const blogs = []

//     const result  = listHelper.dummy(blogs)
//     assert.strictEqual(result, 1)
// })

// describe('total likes', ()=> {

//     test('of empty list', ()=> {
//         const blogs = []
//         const result = listHelper.totalLikes(blogs)
//         assert.strictEqual(result, 0)
//     })
//     test('When list have only one blog, equal the likes of that', ()=>{
//         const listWithOneBlog = [
//             {
//               _id: '5a422aa71b54a676234d17f8',
//               title: 'Go To Statement Considered Harmful',
//               author: 'Edsger W. Dijkstra',
//               url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
//               likes: 5,
//               __v: 0
//             }
//           ]
//           const result = listHelper.totalLikes(listWithOneBlog)
//           assert.strictEqual(result, 5)
//     })
//     test('of a bigger list is calculated right', ()=>{
       
//           const sum = blogs.reduce((acc, cur)=> acc + cur.likes, 0)

//           const result = listHelper.totalLikes(blogs)
//           assert.strictEqual(result, sum)
//     })

// })

// describe('Favorite blog', ()=>{
//     test('With most likes', ()=> {
  
//         let blogWithHigestLike = blogs[0]
//         for( let blog of blogs){
//             if(blog.likes > blogWithHigestLike.likes){
//                 blogWithHigestLike = blog
//             }
//         }
    
//         const result = listHelper.favoriteBlog(blogs)
//         assert.deepStrictEqual(result, blogWithHigestLike)
//     })
// })

// describe('Most blogs', ()=>{
//     test('to returns the author who has the largest amount of blogs', ()=>{
     
//       const uniqueBlog = new Set(blogs.map((blog)=> blog.author))
//       const bloggersCount = []
//       for(let b of uniqueBlog){
//           const filteredBlog = blogs.filter((blog)=> blog.author === b)
//           const  blogger = filteredBlog.reduce((acc, cur)=> {
//               return {
//                   author: cur.author,
//                   blogs: acc.blogs + 1 
//               }
//           }, {author: '', blogs: 0})
//           bloggersCount.push(blogger)
//       }
//       const mostblog = bloggersCount.sort((a, b)=> b.blogs - a.blogs)[0]
//       const result = listHelper.mostBlog(blogs)
//       assert.deepStrictEqual(result, mostblog)
//     })
// })

// describe('Most Likes', ()=> {
//   test('for blog posts that have the largest amount of likes', ()=>{
//     const uniqueBlog = new Set(blogs.map((blog)=> blog.author))
//     const bloggerscount = []
//     for(let b of uniqueBlog){
//         const filteredBlog = blogs.filter((blog)=> blog.author === b)
//         const bloggerWithMostLikes = filteredBlog.reduce((acc, cur)=> {
//             return {
//                 author: cur.author,
//                 likes: acc.likes + cur.likes
//             }
//         }, {author:'', likes:0}) 
//         bloggerscount.push(bloggerWithMostLikes)
//     }
//     const authorWithMostLike = bloggerscount.sort((a, b)=> b.likes - a.likes)[0]
//     const result = listHelper.mostlikes(blogs)
//     assert.deepStrictEqual(result, authorWithMostLike)
    
//   })
  
// })