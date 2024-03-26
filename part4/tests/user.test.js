const bcrypt = require('bcrypt')
const {describe, beforeEach, after, test} = require('node:test')
const assert = require('node:assert')
const app = require('../app')
const supperTest = require('supertest')
const User  = require('../models/userModel')
const helper = require('../tests/test_helper')

const api = supperTest(app)

describe('When their is initialy one user in the DB', ()=>{
    beforeEach(async()=>{
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('iyanuoluwa', 10)
        const user = new User({
            username: 'Mufidah',
            passwordHash
        })
        await user.save()
    })

    test('Return the proper status code if username  is null or undefind', async()=>{

        const userAtStart = await helper.userInDB()
        const newUser = {
            username:'',
            password:'',
            name:'ogunkunle'
        }
        await api.post('/api/users')
        .send(newUser)
        .expect(400)

        const userAtEnd = await helper.userInDB()
        assert.strictEqual(userAtEnd.length, userAtStart.length)
    })

    test('Create Succed with fresh username', async()=>{
        const userAtStart = await helper.userInDB()
        const newUser = {
            username: 'Adeyemi',
            password:'iyanu3200',
            name:'Mufidat'
        }
        await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const userAtEnd = await helper.userInDB()
        assert.strictEqual(userAtEnd.length, userAtStart.length + 1)
    })
    test('creation fail with proper status code if user name is taken', async()=>{
        const userAtStart = await helper.userInDB()
        console.log({userAtStart})
        const newUser = {
            username: 'Mufidah',
            password:'iyanu3200',
            name:'Omolabake'
        }
        await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
        const userAtEnd = await helper.userInDB() 
        assert.strictEqual(userAtStart.length, userAtEnd.length)
    })
})