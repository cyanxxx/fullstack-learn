const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
})

describe("login", () => {
    test("login and return token", async() => {
        const usersAtEnd = await helper.usersInDb()
        const response = await api.post("/api/login").send({
            username: usersAtEnd[0].username,
            password: 'sekret'
        }).expect(200)
        expect(response.body.token).toBeDefined()
    })    
})