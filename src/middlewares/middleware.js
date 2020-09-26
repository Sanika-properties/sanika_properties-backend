module.exports.isLoggedIn = (req, res, next) => {
    console.log('This is a middleware function')
    next();
}