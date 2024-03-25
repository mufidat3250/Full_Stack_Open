const logger = require('./logger')

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
    }
    next(error)

} 
module.exports = {
    errorHandler, requestLogger, unknownEndpoint
}