const jwt = require('jsonwebtoken')
const logger = require('./logger')
const User = require('../models/userModel')

const requestLogger = (request, response, next) => {
    logger.info("Method:", request.method)
    logger.info("Path:", request.path)
    logger.info("Body:", request.body)
    logger.info('---')
    next()
}
const unknownEndpoint = (request, response) => {
    response.status(404).send({error:"Unknown endpoint"})
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if(authorization && authorization.startsWith('Bearer ')){
        request["token"] = authorization.substr(7)
    }
    next()
}

const tokenValidator = async(request, response, next) => {
    const token = request.token
    if(!token){
        return response.status(401).json({error: 'token missing'})
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET, { expiresIn: 60*60 })
    if(!decodedToken){
        response.status(401).json({error: "Invalid token"})
    }
    next()
}

const userExtractor = async(request, response, next) => {
    if(request.token){
        const decodedToken = jwt.verify(request.token, process.env.SECRET, { expiresIn: 60*60 })
        const user = await User.findById(decodedToken.id)
        request["user"] = user
    }else{
        return response.status(401).send({error:'Token must be provided'})
    }
    next()
}


const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
    if(error.name === "CastError"){
        response.status('400').send({
            error:"malformed Id"
        })
    }else if (error.name === "ValidationError"){
        response.status("400").send({
            error: error.message
        })
    }else if (error.name === "MongoServerError" && error.message.includes('E11000 duplicate key error')){
        return response.status(400).json({error:"expected `username` to be unique"})
    }else if(error.name === 'JsonWebTokenError'){
        return response.status(400).json({error: "jwt must be provided"})
    }else if(error.name === 'SyntaxError'){
        return response.status(400).json({message:'Syntax Error', error: error.message})
    }else if (error.name === 'TokenExpiredError'){
        return response.status(400).json({
            error: 'token expired'
        })
    }
    next(error)

} 

module.exports = {
    errorHandler, requestLogger, unknownEndpoint, tokenExtractor,tokenValidator, userExtractor
}
