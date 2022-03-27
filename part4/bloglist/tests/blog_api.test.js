const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
let token;
let otherToken;
beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  //  新建账号，并登录
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'test1', passwordHash })
  await user.save()

  const response =  await api.post("/api/login").send({
      username: user.username,
      password: 'sekret'
  })

  const otherPasswordHash = await bcrypt.hash('sekret', 10)
  const otherUser = new User({ username: 'test2', passwordHash: otherPasswordHash })
  await otherUser.save()

  
  const otherResponse =  await api.post("/api/login").send({
      username: otherUser.username,
      password: 'sekret'
  })

  token = response.body.token
  otherToken = otherResponse.body.token
  for (let note of helper.initialBlogs) {
    let blogObject = new Blog({...note, user: user._id})
    await blogObject.save()
    debugger
  }
})

describe('when there is initially some blogs saved',() => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
  
    const contents = response.body.map(r => r.title) 
    expect(contents).toContain(
      'Go To Statement Considered Harmful' 
    )
  })
})


describe('addition of a new blog', () => {
  test('lack token', async() => {
    const newBlog = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
    }
    debugger

    await api.post('/api/blogs').send(newBlog).expect(401)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  
  })
  test('succeeds with valid data', async() => {
    const newBlog = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
    }

    await api.post('/api/blogs').set('Authorization', `bearer ${token}`).send(newBlog).expect(201).expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
  
    const contents = response.body.map(r => r.title)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
    expect(contents).toContain(
      'Canonical string reduction'
    )
  })
  test('return own id', async() => {
    const newBlog = {
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
    }
    const returnBlog = await api.post('/api/blogs').set('Authorization', `bearer ${token}`).send(newBlog).expect(201).expect('Content-Type', /application\/json/)
    expect(returnBlog.body.id).toBeDefined()
  })
  test('lack likes and return default 0', async() => {
    const newBlog = {
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    }
    const returnBlog = await api.post('/api/blogs').set('Authorization', `bearer ${token}`).send(newBlog)
  
    expect(returnBlog.body).toHaveProperty('likes', 0)
    
  })
  test('fails with status code 400 if lack title and url ', async() => {
    const newBlog = {
      author: "Robert C. Martin"
    }
    await api.post('/api/blogs').set('Authorization', `bearer ${token}`).send(newBlog).expect(400)  
  })
})

describe('update of a blog', () => {
  test('without token', async() => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate= blogsAtStart[0]
    let updateBlog = {
      ...blogToUpdate,
      author: 'cyan'
    }
    await api.put(`/api/blogs/${blogToUpdate.id}`).send(updateBlog).expect(401)

    const blogsAtEnd = await helper.blogsInDb()

    const authors = blogsAtEnd.map(r => r.author)

    expect(authors).not.toContain("cyan")

  })
  test('wrong token', async() => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate= blogsAtStart[0]
    let updateBlog = {
      ...blogToUpdate,
      author: 'cyan'
    }
    await api.put(`/api/blogs/${blogToUpdate.id}`).set('Authorization', `bearer ${otherToken}`).send(updateBlog).expect(401)

    const blogsAtEnd = await helper.blogsInDb()

    const authors = blogsAtEnd.map(r => r.author)

    expect(authors).not.toContain("cyan")

  })
  test('succeeds with valid data', async() => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate= blogsAtStart[0]
    let updateBlog = {
      ...blogToUpdate,
      author: 'cyan'
    }
    await api.put(`/api/blogs/${blogToUpdate.id}`).set('Authorization', `bearer ${token}`).send(updateBlog).expect(200).expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    const authors = blogsAtEnd.map(r => r.author)

    expect(authors).toContain("cyan")
  })
})

describe('delete of a blog', () => {
  test('without token', async() => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(401)

    const blogsAtEnd = await helper.blogsInDb()

    const authors = blogsAtEnd.map(r => r.author)

    expect(authors).toContain(blogToDelete.author)
    expect(blogsAtEnd).not.toContain(blogsAtEnd.length)
  })
  test('wrong token', async() => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).set('Authorization', `bearer ${otherToken}`).expect(401)
    const blogsAtEnd = await helper.blogsInDb()
   
    const authors = blogsAtEnd.map(r => r.author)

    expect(authors).toContain(blogToDelete.author)
    expect(blogsAtEnd).not.toContain(blogsAtEnd.length)

  })
  test('succeeds with valid data', async() => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).set('Authorization', `bearer ${token}`).expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    const authors = blogsAtEnd.map(r => r.author)

    expect(authors).not.toContain(blogToDelete.author)
    expect(blogsAtEnd).not.toContain(blogsAtEnd.length - 1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})