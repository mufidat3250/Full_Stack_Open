require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGO_URL
mongoose.connect(url, { useNewUrlParser: true , useUnifiedTopology: true}).then((res)=> {
  console.log('database connected successful')
}).catch((err)=> {
  console.log('something went wrong while connecting to database')
})

const todoSchema = new mongoose.Schema({
  text: String,
  done: Boolean
})

module.exports = mongoose.model('Todo', todoSchema)