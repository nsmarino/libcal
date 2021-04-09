const errorHandler = (error, request, response) => {
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return response.status(400).send({ error: 'malformatted id' 
      })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message 
      })
    } else if (error.name === 'JsonWebTokenError') {
      return response.status(401).json({
        error: 'invalid token'
      })
    } else {
      response.status(400).json({ success: false })
    }
  }

export default errorHandler