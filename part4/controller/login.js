require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/userModel')
const { response } = require('../app')


const login = async(req, res) => {
    const {username, password} = req.body
    const user = await User.findOne({username})
    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)
    console.log(passwordCorrect)
    if(!(user && passwordCorrect)){
        console.log('user must be provided')
        return res.status(401).json({
            error: 'Invalid username or password'
        })
    }else{
        const userForToken = {
            username: user.username,
            id: user._id
        }
        const token = jwt.sign(userForToken, process.env.SECRET)
        res.status(200)
        .json({token, username:user.username, name:user.name})
    }
   
}

module.exports = login
