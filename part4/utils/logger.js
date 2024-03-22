const info = (...params) => {
    console.log(...params)
}
const error = (...error) => {
    console.log(error)
}

module.exports = {
    info, error
}