const moment = require('moment')
const HttpStatusCode = require('../constants/httpStatus')

const RessponseMessage = {
  success: (res, data, message, note = null) => {
    res.status(HttpStatusCode.OK).json({
      statusCode: HttpStatusCode.OK,
      message,
      content: data,
      dateTime: moment().format('YYYY-MM-DDTHH:mm:ss.SSSSZ'),
      messageConstants: note
    })
  },
  created: (res, data, message, note = null) => {
    res.status(HttpStatusCode.CREATED).json({
      statusCode: HttpStatusCode.CREATED,
      message,
      content: data,
      dateTime: moment().format('YYYY-MM-DDTHH:mm:ss.SSSSZ'),
      messageConstants: note
    })
  },
  noContent: (res, data, message, note = null) => {
    res.status(HttpStatusCode.NO_CONTENT).json({
      statusCode: HttpStatusCode.NO_CONTENT,
      message,
      content: data,
      dateTime: moment().format('YYYY-MM-DDTHH:mm:ss.SSSSZ'),
      messageConstants: note
    })
  },
  badRequest: (res, data, message, note = null) => {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      statusCode: HttpStatusCode.BAD_REQUEST,
      message,
      content: data,
      dateTime: moment().format('YYYY-MM-DDTHH:mm:ss.SSSSZ'),
      messageConstants: note
    })
  },
  unauthorized: (res, data, message, note = null) => {
    res.status(HttpStatusCode.UN_AUTHORIZED).json({
      statusCode: HttpStatusCode.UN_AUTHORIZED,
      message,
      content: data,
      dateTime: moment().format('YYYY-MM-DDTHH:mm:ss.SSSSZ'),
      messageConstants: note
    })
  },
  forbindden: (res, data, message, note = null) => {
    res.status(HttpStatusCode.FORBIDDEN).json({
      statusCode: HttpStatusCode.FORBIDDEN,
      message,
      content: data,
      dateTime: moment().format('YYYY-MM-DDTHH:mm:ss.SSSSZ'),
      messageConstants: note
    })
  },
  notFound: (res, data, message, note = null) => {
    res.status(HttpStatusCode.NOT_FOUND).json({
      statusCode: HttpStatusCode.NOT_FOUND,
      message,
      content: data,
      dateTime: moment().format('YYYY-MM-DDTHH:mm:ss.SSSSZ'),
      messageConstants: note
    })
  },
  noAcceptable: (res, data, message, note = null) => {
    res.status(HttpStatusCode.NO_ACCEPTABLE).json({
      statusCode: HttpStatusCode.NO_ACCEPTABLE,
      message,
      content: data,
      dateTime: moment().format('YYYY-MM-DDTHH:mm:ss.SSSSZ'),
      messageConstants: note
    })
  },
  conflict: (res, data, message, note = null) => {
    res.status(HttpStatusCode.CONFLICT).json({
      statusCode: HttpStatusCode.CONFLICT,
      message,
      content: data,
      dateTime: moment().format('YYYY-MM-DDTHH:mm:ss.SSSSZ'),
      messageConstants: note
    })
  },
  error: (res, message, note = null) => {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      message,
      dateTime: moment().format('YYYY-MM-DDTHH:mm:ss.SSSSZ'),
      messageConstants: note
    })
  }
}

module.exports = RessponseMessage
