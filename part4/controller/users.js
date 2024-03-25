const bcrypt = require('bcrypt')
const User = require('../models/userModel')

const getAllUsers = async(request, response, next) => {
    try {
        const allUser = await User.find({})
        response.status(200).json(allUser)
    } catch (error) {
        next(error)
    }
}

const createUser = async(request, response, next)=> {
    try {
        const {username,  name, password} = request.body

        const saltRound = 10
        const passwordHash = await bcrypt.hash(password, saltRound)
    
        const user = new User({
            username,
            name,
            passwordHash
        })
    
        const savedUser = await user.save()
         response.status(201).json(savedUser)
    } catch (error) {
        next(error)
    }
}

module.exports = {createUser, getAllUsers}