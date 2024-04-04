require('dotenv').config()
require("express-async-errors")
const express = require('express')
const blogRouter = require('./routes/blog')
const userRouter = require('./routes/user')
const loginRouter = require('./routes/login')
const middleWare = require('./utils/middleware')
const cors = require('cors')
const app = express() 
app.use(cors())
app.use(express.json())

app.use(middleWare.requestLogger)
app.use(middleWare.tokenExtractor)
// app.use(middleWare.tokenValidator)

app.use('/api/blogs', blogRouter)
app.use('/api/users',  userRouter)
app.use('/api/login', loginRouter )
app.use(middleWare.errorHandler)
module.exports = app

