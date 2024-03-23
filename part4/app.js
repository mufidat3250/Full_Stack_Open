const express = require('express')
const router = require('./routes/blog')
const cors = require('cors')
const app = express() 
app.use(cors())
app.use(express.json())

app.use('/api/blogs', router)

module.exports = app