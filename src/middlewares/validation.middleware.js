const Joi = require('joi')
const { regexPassword, regexPhoneNumber } = require('../utils/helpers')
const ValidateMessage = require('../constants/message')

const validators = {
  signinValidate: (data) => {
    const userSchema = Joi.object({
      account: Joi.string().min(3).max(10).required().messages({
        'string.empty': ValidateMessage.ERROR_ACCOUNT.EMPTY,
        'string.min': ValidateMessage.ERROR_ACCOUNT.MIN_LENGTH,
        'string.max': ValidateMessage.ERROR_ACCOUNT.MAX_LENGTH,
        'string.base': ValidateMessage.ERROR_ACCOUNT.ACCOUNT_FORMAT
      }),
      password: Joi.string().min(8).pattern(regexPassword).required().messages({
        'string.empty': ValidateMessage.ERROR_PASSWORD.EMPTY,
        'string.min': ValidateMessage.ERROR_PASSWORD.LENGTH,
        'string.pattern.base': ValidateMessage.ERROR_PASSWORD.PATTERN
      })
    })
    return userSchema.validate(data, { stripUnknown: true, abortEarly: false })
  },
  signupValidate: (data) => {
    const userSchema = Joi.object({
      account: Joi.string().min(3).max(10).required().messages({
        'string.empty': ValidateMessage.ERROR_ACCOUNT.EMPTY,
        'string.min': ValidateMessage.ERROR_ACCOUNT.MIN_LENGTH,
        'string.max': ValidateMessage.ERROR_ACCOUNT.MAX_LENGTH,
        'string.base': ValidateMessage.ERROR_ACCOUNT.ACCOUNT_FORMAT
      }),
      password: Joi.string().min(8).pattern(regexPassword).required().messages({
        'string.empty': ValidateMessage.ERROR_PASSWORD.EMPTY,
        'string.min': ValidateMessage.ERROR_PASSWORD.LENGTH,
        'string.pattern.base': ValidateMessage.ERROR_PASSWORD.PATTERN
      }),
      confirmPassword: Joi.any()
        .equal(Joi.ref('password'))
        .required()
        .options({ messages: { 'any.only': 'Confirm password does not match!' } }),
      name: Joi.string().min(3).max(30).required().messages({
        'string.empty': ValidateMessage.ERROR_NAME.EMPTY,
        'string.min': ValidateMessage.ERROR_NAME.MIN_LENGTH,
        'string.max': ValidateMessage.ERROR_NAME.MAX_LENGTH,
        'string.base': ValidateMessage.ERROR_NAME.NAME_FORMAT
      }),
      email: Joi.string().email().required().messages({
        'string.empty': ValidateMessage.ERROR_EMAIL.EMPTY,
        'string.email': ValidateMessage.ERROR_EMAIL.EMAIL_FORMAT
      }),
      mobile_no: Joi.string().max(10).pattern(regexPhoneNumber).required().messages({
        'string.empty': ValidateMessage.ERROR_PHONE.EMPTY,
        'string.max': ValidateMessage.ERROR_PHONE.MAX_LENGTH,
        'string.pattern.base': ValidateMessage.ERROR_PHONE.PATTERN
      }),
      gender: Joi.string().valid('male', 'female').required().messages({
        'string.empty': ValidateMessage.ERROR_GENDER.EMPTY,
        'string.base': ValidateMessage.ERROR_GENDER.GENDER_FORMAT,
        'any.only': ValidateMessage.ERROR_GENDER.GENDER_DIFF
      })
    })
    return userSchema.validate(data, { stripUnknown: true, abortEarly: false })
  },
  forgotPassword: (data) => {
    const userSchema = Joi.object({
      email: Joi.string().email().required().messages({
        'string.empty': ValidateMessage.ERROR_EMAIL.EMPTY,
        'string.email': ValidateMessage.ERROR_EMAIL.EMAIL_FORMAT
      })
    })
    return userSchema.validate(data, { stripUnknown: true, abortEarly: false })
  },
  resetPassword: (data) => {
    const userSchema = Joi.object({
      newPassword: Joi.string().min(8).pattern(regexPassword).required().messages({
        'string.empty': ValidateMessage.ERROR_NEW_PASSWORD.EMPTY,
        'string.min': ValidateMessage.ERROR_NEW_PASSWORD.LENGTH,
        'string.pattern.base': ValidateMessage.ERROR_NEW_PASSWORD.PATTERN
      }),
      confirmNewPassword: Joi.any()
        .equal(Joi.ref('newPassword'))
        .required()
        .options({ messages: { 'any.only': 'Confirm new password does not match!' } }),
      token: Joi.string().min(3).max(250).required().messages({
        'string.empty': ValidateMessage.ERROR_TOKEN.EMPTY,
        'string.min': ValidateMessage.ERROR_TOKEN.MIN_LENGTH,
        'string.max': ValidateMessage.ERROR_TOKEN.MAX_LENGTH,
        'string.base': ValidateMessage.ERROR_TOKEN.NAME_FORMAT
      })
    })
    return userSchema.validate(data, { stripUnknown: true, abortEarly: false })
  },
  insertUserValidate: (data) => {
    const userSchema = Joi.object({
      account: Joi.string().min(3).max(10).required().messages({
        'string.empty': ValidateMessage.ERROR_ACCOUNT.EMPTY,
        'string.min': ValidateMessage.ERROR_ACCOUNT.MIN_LENGTH,
        'string.max': ValidateMessage.ERROR_ACCOUNT.MAX_LENGTH,
        'string.base': ValidateMessage.ERROR_ACCOUNT.ACCOUNT_FORMAT
      }),
      password: Joi.string().min(8).pattern(regexPassword).required().messages({
        'string.empty': ValidateMessage.ERROR_PASSWORD.EMPTY,
        'string.min': ValidateMessage.ERROR_PASSWORD.LENGTH,
        'string.pattern.base': ValidateMessage.ERROR_PASSWORD.PATTERN
      }),
      confirmPassword: Joi.any()
        .equal(Joi.ref('password'))
        .required()
        .options({ messages: { 'any.only': 'Confirm password does not match!' } }),
      name: Joi.string().min(3).max(30).required().messages({
        'string.empty': ValidateMessage.ERROR_NAME.EMPTY,
        'string.min': ValidateMessage.ERROR_NAME.MIN_LENGTH,
        'string.max': ValidateMessage.ERROR_NAME.MAX_LENGTH,
        'string.base': ValidateMessage.ERROR_NAME.NAME_FORMAT
      }),
      email: Joi.string().email().required().messages({
        'string.empty': ValidateMessage.ERROR_EMAIL.EMPTY,
        'string.email': ValidateMessage.ERROR_EMAIL.EMAIL_FORMAT
      }),
      mobile_no: Joi.string().max(10).pattern(regexPhoneNumber).required().messages({
        'string.empty': ValidateMessage.ERROR_PHONE.EMPTY,
        'string.max': ValidateMessage.ERROR_PHONE.MAX_LENGTH,
        'string.pattern.base': ValidateMessage.ERROR_PHONE.PATTERN
      }),
      gender: Joi.string().valid('male', 'female').required().messages({
        'string.empty': ValidateMessage.ERROR_GENDER.EMPTY,
        'string.base': ValidateMessage.ERROR_GENDER.GENDER_FORMAT,
        'any.only': ValidateMessage.ERROR_GENDER.GENDER_DIFF
      }),
      user_type: Joi.string().valid('USER', 'ADMIN').required().messages({
        'string.empty': ValidateMessage.ERROR_USER_TYPE.EMPTY,
        'string.base': ValidateMessage.ERROR_USER_TYPE.USER_TYPE_FORMAT,
        'any.only': ValidateMessage.ERROR_USER_TYPE.USER_TYPE_DIFF
      })
    })
    return userSchema.validate(data, { stripUnknown: true, abortEarly: false })
  },
  updateUserValidate: (data) => {
    const userSchema = Joi.object({
      name: Joi.string().min(3).max(30).required().messages({
        'string.empty': ValidateMessage.ERROR_NAME.EMPTY,
        'string.min': ValidateMessage.ERROR_NAME.MIN_LENGTH,
        'string.max': ValidateMessage.ERROR_NAME.MAX_LENGTH,
        'string.base': ValidateMessage.ERROR_NAME.NAME_FORMAT
      }),
      email: Joi.string().email().required().messages({
        'string.empty': ValidateMessage.ERROR_EMAIL.EMPTY,
        'string.email': ValidateMessage.ERROR_EMAIL.EMAIL_FORMAT
      }),
      mobile_no: Joi.string().max(10).pattern(regexPhoneNumber).required().messages({
        'string.empty': ValidateMessage.ERROR_PHONE.EMPTY,
        'string.max': ValidateMessage.ERROR_PHONE.MAX_LENGTH,
        'string.pattern.base': ValidateMessage.ERROR_PHONE.PATTERN
      }),
      gender: Joi.string().valid('male', 'female').required().messages({
        'string.empty': ValidateMessage.ERROR_GENDER.EMPTY,
        'string.base': ValidateMessage.ERROR_GENDER.GENDER_FORMAT,
        'any.only': ValidateMessage.ERROR_GENDER.GENDER_DIFF
      })
    })
    return userSchema.validate(data, { stripUnknown: true, abortEarly: false })
  },
  updateAdminValidate: (data) => {
    const userSchema = Joi.object({
      account: Joi.string().min(3).max(10).required().messages({
        'string.empty': ValidateMessage.ERROR_ACCOUNT.EMPTY,
        'string.min': ValidateMessage.ERROR_ACCOUNT.MIN_LENGTH,
        'string.max': ValidateMessage.ERROR_ACCOUNT.MAX_LENGTH,
        'string.base': ValidateMessage.ERROR_ACCOUNT.ACCOUNT_FORMAT
      }),
      password: Joi.string().min(8).pattern(regexPassword).required().messages({
        'string.empty': ValidateMessage.ERROR_PASSWORD.EMPTY,
        'string.min': ValidateMessage.ERROR_PASSWORD.LENGTH,
        'string.pattern.base': ValidateMessage.ERROR_PASSWORD.PATTERN
      }),
      name: Joi.string().min(3).max(30).required().messages({
        'string.empty': ValidateMessage.ERROR_NAME.EMPTY,
        'string.min': ValidateMessage.ERROR_NAME.MIN_LENGTH,
        'string.max': ValidateMessage.ERROR_NAME.MAX_LENGTH,
        'string.base': ValidateMessage.ERROR_NAME.NAME_FORMAT
      }),
      email: Joi.string().email().required().messages({
        'string.empty': ValidateMessage.ERROR_EMAIL.EMPTY,
        'string.email': ValidateMessage.ERROR_EMAIL.EMAIL_FORMAT
      }),
      mobile_no: Joi.string().max(10).pattern(regexPhoneNumber).required().messages({
        'string.empty': ValidateMessage.ERROR_PHONE.EMPTY,
        'string.max': ValidateMessage.ERROR_PHONE.MAX_LENGTH,
        'string.pattern.base': ValidateMessage.ERROR_PHONE.PATTERN
      }),
      gender: Joi.string().valid('male', 'female').required().messages({
        'string.empty': ValidateMessage.ERROR_GENDER.EMPTY,
        'string.base': ValidateMessage.ERROR_GENDER.GENDER_FORMAT,
        'any.only': ValidateMessage.ERROR_GENDER.GENDER_DIFF
      }),
      user_type: Joi.string().valid('USER', 'ADMIN').required().messages({
        'string.empty': ValidateMessage.ERROR_USER_TYPE.EMPTY,
        'string.base': ValidateMessage.ERROR_USER_TYPE.USER_TYPE_FORMAT,
        'any.only': ValidateMessage.ERROR_USER_TYPE.USER_TYPE_DIFF
      })
    })
    return userSchema.validate(data, { stripUnknown: true, abortEarly: false })
  },
  commentValidate: (data) => {
    const commentSchema = Joi.object({
      image_id: Joi.number().integer().required().messages({
        'number.empty': ValidateMessage.ERROR_ID_NUMB.EMPTY,
        'number.base': ValidateMessage.ERROR_ID_NUMB.NUMB_FORMAT
      }),
      content: Joi.string().min(3).required().messages({
        'string.empty': ValidateMessage.ERROR_CONTENT.EMPTY,
        'string.min': ValidateMessage.ERROR_CONTENT.MIN_LENGTH,
        'string.base': ValidateMessage.ERROR_CONTENT.NAME_FORMAT
      })
    })
    return commentSchema.validate(data, { stripUnknown: true, abortEarly: false })
  },
  contentValidate: (data) => {
    const commentSchema = Joi.object({
      content: Joi.string().min(3).required().messages({
        'string.empty': ValidateMessage.ERROR_CONTENT.EMPTY,
        'string.min': ValidateMessage.ERROR_CONTENT.MIN_LENGTH,
        'string.base': ValidateMessage.ERROR_CONTENT.NAME_FORMAT
      }),
      comment_star: Joi.number().integer().min(1).max(5).required().messages({
        'number.empty': ValidateMessage.ERROR_STAR_COMMENT.EMPTY,
        'number.base': ValidateMessage.ERROR_STAR_COMMENT.STAR_FORMAT,
        'number.min': ValidateMessage.ERROR_STAR_COMMENT.MIN_LENGTH,
        'number.max': ValidateMessage.ERROR_STAR_COMMENT.MAX_LENGTH
      })
    })
    return commentSchema.validate(data, { stripUnknown: true, abortEarly: false })
  },
  numberValidate: (data) => {
    const numberSchema = Joi.object({
      image_id: Joi.number().integer().required().messages({
        'number.empty': ValidateMessage.ERROR_ID_NUMB.EMPTY,
        'number.base': ValidateMessage.ERROR_ID_NUMB.NUMB_FORMAT
      })
    })
    return numberSchema.validate(data, { stripUnknown: true, abortEarly: false })
  },
  imageValidate: (data) => {
    const imageSchema = Joi.object({
      image_name: Joi.string().min(3).max(40).required().messages({
        'string.empty': ValidateMessage.ERROR_IMAGE_NAME.EMPTY,
        'string.min': ValidateMessage.ERROR_IMAGE_NAME.MIN_LENGTH,
        'string.max': ValidateMessage.ERROR_IMAGE_NAME.MAX_LENGTH,
        'string.base': ValidateMessage.ERROR_IMAGE_NAME.NAME_FORMAT
      }),
      description: Joi.string().allow(null, '').min(3).required().messages({
        'string.min': ValidateMessage.ERROR_DESC.MIN_LENGTH,
        'string.base': ValidateMessage.ERROR_DESC.DESC_FORMAT
      })
    })
    return imageSchema.validate(data, { stripUnknown: true, abortEarly: false })
  }
}

module.exports = validators
