const blogsRouter = require("express").Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
   const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
   response.json(blogs)
  })
  
blogsRouter.post('/', async (request, response) => {
    if (!request.user) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = request.user
    const body = request.body
    const blog =  new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id,
      comments: []
    })
    const result = await blog.save()
    user.blogs = user.blogs.concat(blog._id)
    await user.save({validateModifiedOnly: true})
    response.status(201).json(result)
})
blogsRouter.post('/:id/comments', async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const id = request.params.id
  const body = request.body.comment
  const blog = await Blog.findById(id)
  blog.comments =  blog.comments.concat(body)
  const result = await blog.save({validateModifiedOnly: true})
  response.status(201).json(result)
})
blogsRouter.delete('/:id', async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const id = request.params.id
  const blog = await Blog.findById(id)
  const user = request.user
  if (user._id.toString() !== blog.user.toString()) {
      return response.status(401).json({
        error: 'not same person'
      })
    }else{
      user.blogs = user.blogs.filter(blog => blog._id.toString() !== id)
      await user.save({validateModifiedOnly: true})

      await Blog.findByIdAndRemove(id)
      response.status(204).end()
    }
})
blogsRouter.put('/:id', async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const id = request.params.id
  const blog = await Blog.findById(id)
  const user = request.user
  if (user._id.toString() !== blog.user.toString()) {
      return response.status(401).json({
        error: 'not same person'
      })
  }else{
    const body = request.body
    const updateBlog = await Blog.findByIdAndUpdate(id, body, { new: true, runValidators: true })
    response.json(updateBlog)
  }
})

module.exports = blogsRouter