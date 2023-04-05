const ValidateMessage = {
  ERROR_ACCOUNT: {
    EMPTY: 'Account cannot be an empty field',
    MIN_LENGTH: 'The length of the parameter should be more than 3 character',
    MAX_LENGTH: 'The length of the parameter must be a string with a maximum 10',
    ACCOUNT_FORMAT: 'Account must be a string'
  },
  ERROR_PASSWORD: {
    PATTERN: 'Password must contain at least 1 number, 1 uppercase & 1 special character @$!%*#?&',
    LENGTH: 'The length of password should be more than 8 character',
    EMPTY: 'Password cannot be an empty field'
  },
  ERROR_NEW_PASSWORD: {
    PATTERN: 'New password must contain at least 1 number, 1 uppercase & 1 special character @$!%*#?&',
    LENGTH: 'The length of password should be more than 8 character',
    EMPTY: 'New password cannot be an empty field'
  },
  ERROR_EMAIL: {
    EMAIL_FORMAT: 'Please enter a valid email address.',
    EMPTY: 'Email cannot be an empty field'
  },
  ERROR_PHONE: {
    PATTERN: 'Mobile_no must contain at least 10 number and phone has the first number 03, 05, 07, 08, 09',
    MAX_LENGTH: 'The length of Mobile_no must be a string with a maximum 10',
    EMPTY: 'Mobile_no cannot be an empty field'
  },
  ERROR_GENDER: {
    EMPTY: 'Gender cannot be an empty field!',
    GENDER_FORMAT: 'Gender must be a string!',
    GENDER_DIFF: 'Gender must be male or female'
  },
  ERROR_USER_TYPE: {
    EMPTY: 'User type cannot be an empty field!',
    USER_TYPE_FORMAT: 'User type must be a string!',
    USER_TYPE_DIFF: 'User type must be USER or ADMIN'
  },
  ERROR_ID_NUMB: {
    NUMB_FORMAT: 'Invalid field must be a number',
    EMPTY: 'Please can not be an empty field'
  },
  ERROR_NAME: {
    EMPTY: 'Name cannot be an empty field',
    MIN_LENGTH: 'The length of the parameter should be more than 3 character',
    MAX_LENGTH: 'The length of the parameter must be a string with a maximum 30',
    NAME_FORMAT: 'Name must be a string'
  },
  ERROR_IMAGE_NAME: {
    EMPTY: 'Image name cannot be an empty field',
    MIN_LENGTH: 'The length of the parameter should be more than 3 character',
    MAX_LENGTH: 'The length of the parameter must be a string with a maximum 40',
    NAME_FORMAT: 'Image name must be a string'
  },
  ERROR_DESC: {
    MIN_LENGTH: 'The length of the parameter should be more than 3 character',
    DESC_FORMAT: 'Description must be a string'
  },
  ERROR_CONTENT: {
    EMPTY: 'Content cannot be an empty field',
    MIN_LENGTH: 'The length of the parameter should be more than 3 character',
    MAX_LENGTH: 'The length of the parameter must be a string with a maximum 30',
    NAME_FORMAT: 'Content must be a string'
  },
  ERROR_STAR_COMMENT: {
    EMPTY: 'Comment star cannot be an empty field',
    MIN_LENGTH: 'The length of comment star should be more than 1 character',
    MAX_LENGTH: 'The length of comment star must be a string with a maximum 5',
    STAR_FORMAT: 'Comment star must be a number'
  },
  ERROR_TOKEN: {
    EMPTY: 'Token cannot be an empty field',
    MIN_LENGTH: 'The length of token should be more than 3 character',
    MAX_LENGTH: 'The length of token must be a string with a maximum 250',
    NAME_FORMAT: 'Token must be a string'
  }
}

module.exports = ValidateMessage
