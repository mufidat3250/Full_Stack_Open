require('dotenv').config()
const logger = require('./utils/logger')
const config = require('./utils/config')
const app = require('./app')

const PORT = process.env.PORT
app.listen(PORT, ()=> {
    logger.info(`Server running on port ${config.PORT}`)
})

