const dummy = (blogs) => {
    return 1
}
const totalLikes = (blogs) => {
    return blogs.reduce((pre, cur) => pre += cur.likes, 0)
}
const favoriteBlog = (blogs) => {
    return blogs.reduce((pre, cur) => pre.likes > cur.likes? 
    {  title: pre.title, author: pre.author, likes: pre.likes  } 
    : {  title: cur.title, author: cur.author, likes: cur.likes } , {})
}
const mostBlogs = (blogs) => {
    let max = {}
    blogs.reduce((pre, cur) => {
        if(pre[cur.author]) {
            pre[cur.author].blogs += 1
            max.blogs < pre[cur.author].blogs && (max = pre[cur.author])
        }else{
            pre[cur.author] = {
                author: cur.author,
                blogs: 1
            }
            !max.blogs && (max = pre[cur.author])
        }
        
        return pre
    }, {})
    return max
}
const mostLikes = (blogs) => {
    let max = {}
    blogs.reduce((pre, cur) => {
        if(pre[cur.author]) {
            pre[cur.author].likes += cur.likes
            max.likes < pre[cur.author].likes && (max = pre[cur.author])
        }else{
            pre[cur.author] = {
                author: cur.author,
                likes: cur.likes
            }
            !max.likes && (max = pre[cur.author])
        }
        
        return pre
    }, {})
    return max
}
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}