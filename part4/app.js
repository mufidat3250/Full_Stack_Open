const express = require('express')
const router = require('./routes/blog')
const middleWare = require('./utils/middleware')
const cors = require('cors')
const app = express() 
app.use(cors())
app.use(express.json())
app.use(middleWare.requestLogger)

app.use('/api/blogs', router)
app.use(middleWare.errorHandler)
module.exports = app