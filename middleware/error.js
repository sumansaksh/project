const ErrHandler = require('../utils/errorHandler')

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";


    /// wrong mongodb error

    if(err.name==='CastError'){
       
        const message = `Resource not found. invalid:${err.path}`;

        err= new ErrHandler(message,400)
    }


    //jwt error 

    if(err.name==='jsonWebTokenError'){
        const message = `json web token is invalid`;

        err= new ErrHandler(message,400)
    }
//expire
    if(err.name==='TokenExpiredError'){
        const message = `json web token is Expired`;

        err= new ErrHandler(message,400)
    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message,
    })
}