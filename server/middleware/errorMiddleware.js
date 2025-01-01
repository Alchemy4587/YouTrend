//Unsupported Routes (404)
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404);
    next(error);
}


//Middleware to handle Errors
const errorHandler = (error, req, res, next) => {
    if(res.headerSent) {
        return next(error)
    }

    res.status(error.code || 500).json({message: error.message || "An Unknown Error Occured"})
}



module.exports = {notFound, errorHandler}