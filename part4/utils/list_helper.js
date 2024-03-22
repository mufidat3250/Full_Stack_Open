const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogPost) =>{
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return blogPost.reduce(reducer, 0)
}


const blogs = [
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12
      },
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 10
      },
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 6
      }
]

const favoriteBlog = (blogs) => {
    let blogWithHigestLike = blogs[0]
    for( let blog of blogs){
        if(blog.likes > blogWithHigestLike.likes){
            blogWithHigestLike = blog
        }
    }
    return blogWithHigestLike
}

const mostBlog = (blogs) => {
    // ways to get unique object 
    const uniqueBlog = new Set(blogs.map((blog)=> blog.author))
    const bloggersCount = []
    for(let b of uniqueBlog){
        const filteredBlog = blogs.filter((blog)=> blog.author === b)
        const  blogger = filteredBlog.reduce((acc, cur)=> {
            return {
                author: cur.author,
                blogs: acc.blogs + 1 
            }
        }, {author: '', blogs: 0})
        bloggersCount.push(blogger)
    }
    return  bloggersCount.sort((a, b)=> b.blogs - a.blogs)[0]
}


const mostlikes = (blogs) => {
    const uniqueBlog = new Set(blogs.map((blog)=> blog.author))
    const bloggerscount = []
    for(let b of uniqueBlog){
        const filteredBlog = blogs.filter((blog)=> blog.author === b)
        const bloggerWithMostLikes = filteredBlog.reduce((acc, cur)=> {
            return {
                author: cur.author,
                likes: acc.likes + cur.likes
            }
        }, {author:'', likes:0}) 
        bloggerscount.push(bloggerWithMostLikes)
    }

    return bloggerscount.sort((a, b)=> b.likes - a.likes)[0]
}



module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlog,
    mostlikes
}
