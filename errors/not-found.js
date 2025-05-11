const {StatusCodes} = require('http-status-codes')
const CustomAPIError = require('../errors/custom-api')

class NotFoundError extends CustomAPIError{
  constructor(message){
    super(message)
    this.statusCode = StatusCodes.NOT_FOUND
  }
}

module.exports = NotFoundError