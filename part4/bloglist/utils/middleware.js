const jwt = require('jsonwebtoken')
const User = require('../models/user')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

const errorHandler = (error, request, response, next) => {
    if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    }else if (error.name === 'JsonWebTokenError') {
      return response.status(401).json({
        error: 'invalid token'
      })
    } else if (error.name === 'TokenExpiredError') {
      return response.status(401).json({
        error: 'token expired'
      })
    }
  
    next(error)
}

const tokenExtractor = (request, response, next) => {
  // code that extracts the token
  request.token = getTokenFrom(request)
  next()
}

const userExtractor = async (request, response, next) => {
  // if(request.method === 'GET'){
  //   request.user = {}
  //   next()
  // }else{
  //   debugger
  //   const decodedToken = jwt.verify(request.token, process.env.SECRET)
  //   const user = await User.findById(decodedToken.id)
  //   request.user = user
  //   next()
  // }
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const decodedToken = jwt.verify(authorization.substring(7), process.env.SECRET)
    if (decodedToken) {
      request.user = await User.findById(decodedToken.id)
    }
  }
  next()
 
}

module.exports = {
    errorHandler,
    tokenExtractor,
    userExtractor
}