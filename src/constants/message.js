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
  ERROR_AMOUNT: {
    EMPTY: 'Amount cannot be an empty field',
    MIN_LENGTH: 'Amount must be greater or equal to 1',
    MAX_LENGTH: 'Amount must be less or equal to 5',
    AMOUNT_FORMAT: 'Amount must be a number'
  },
  ERROR_DATE: {
    GEATER: 'To date is must greater than from date'
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
  ERROR_TOKEN: {
    EMPTY: 'Token cannot be an empty field',
    MIN_LENGTH: 'The length of token should be more than 3 character',
    MAX_LENGTH: 'The length of token must be a string with a maximum 250',
    NAME_FORMAT: 'Token must be a string'
  },
  ERROR_MOVIE: {
    NAME: {
      EMPTY: 'Movie_name cannot be an empty field',
      MAX_LENGTH: 'The length of movie_name must be a string with a maximum 100',
      FORMAT: 'Movie_name must be a string'
    },
    TRAILER: {
      EMPTY: 'Trailer cannot be an empty field',
      FORMAT: 'Trailer must be a string'
    },
    SHORT_DESC: {
      EMPTY: 'Short description cannot be an empty field',
      FORMAT: 'Short description must be a string'
    },
    OVERVIEW: {
      EMPTY: 'Overview cannot be an empty field',
      FORMAT: 'Overview must be a string'
    },
    POSTER: {
      EMPTY: 'Poster cannot be an empty field',
      FORMAT: 'Poster must be a string'
    },
    BACKDROPS: {
      EMPTY: 'Backdrops cannot be an empty field',
      FORMAT: 'Backdrops must be a string'
    },
    RUNTIMES: {
      EMPTY: 'Runtimes cannot be an empty field',
      MIN_LENGTH: 'Runtimes must be greater or equal to 1',
      MAX_LENGTH: 'Runtimes must be less or equal to 240',
      FORMAT: 'Runtimes must be a number'
    },
    COUNTRY: {
      EMPTY: 'Country cannot be an empty field',
      MIN_LENGTH: 'The length of country should be more than 2 character',
      MAX_LENGTH: 'The length of country must be a string with a maximum 10',
      FORMAT: 'Country must be a string'
    },
    LANGUAGE: {
      EMPTY: 'Language cannot be an empty field',
      MAX_LENGTH: 'The length of language must be a string with a maximum 100',
      FORMAT: 'Language must be a string'
    },
    AGE_ID: {
      EMPTY: 'Age_id cannot be an empty field',
      MIN_LENGTH: 'Age_id must be greater or equal to 1',
      FORMAT: 'Age_id must be a number'
    },
    HOT: {
      BASE: 'Hot must be a boolean'
    },
    REALEASE_DATE: {
      BASE: 'Release_date must be a valid date'
    },
    COMMING_SOON: {
      BASE: 'Comming_soon must be a boolean'
    },
    NOW_SHOWING: {
      BASE: 'Now_showing must be a boolean'
    },
    COMMENT_MOVIE: {
      ID: {
        EMPTY: 'Movie_id cannot be an empty field',
        FORMAT: 'Movie_id must be a number'
      },
      CONTENT: {
        EMPTY: 'Content cannot be an empty field',
        MIN_LENGTH: 'The length of content should be more than 3 character',
        FORMAT: 'Content must be a string'
      },
      STAR_COMMENT: {
        EMPTY: 'Comment star cannot be an empty field',
        MIN_LENGTH: 'Comment star must be greater or equal to 1',
        MAX_LENGTH: 'Comment star must be less or equal to 5',
        FORMAT: 'Comment star must be a number'
      },
      ID_COMMENT: {
        EMPTY: 'Comment_id cannot be an empty field',
        FORMAT: 'Comment_id must be a number'
      }
    }
  },
  ERROR_ACTOR: {
    ID: {
      FORMAT: 'Invalid actor_id must be a number',
      EMPTY: 'Actor_id can not be an empty field'
    },
    NAME: {
      EMPTY: 'Actor_name cannot be an empty field!',
      MAX_LENGTH: 'The length of actor_name must be a string with a maximum 30!',
      FORMAT: 'Actor_name must be a string!'
    },
    ALIAS: {
      EMPTY: 'Alias cannot be an empty field!',
      MAX_LENGTH: 'The length of alias must be a string with a maximum 40!',
      FORMAT: 'Alias must be a string!'
    },
    BIRTHDAY: {
      BASE: 'Birth_day must be a valid date!'
    },
    GENDER: {
      EMPTY: 'Gender cannot be an empty field!',
      FORMAT: 'Gender must be a string!',
      DIFF: 'Gender must be male or female!'
    },
    ADDRESS: {
      EMPTY: 'Place_of_birth cannot be an empty field!',
      FORMAT: 'Place_of_birth must be a string!'
    },
    BIO: {
      EMPTY: 'Bio cannot be an empty field!',
      FORMAT: 'Bio must be a string!'
    },
    AVATAR: {
      EMPTY: 'Avatar cannot be an empty field!',
      FORMAT: 'Avatar must be a string!'
    }
  },
  ERROR_AGE_TYPE: {
    ID: {
      FORMAT: 'Invalid age_type_id must be a number',
      EMPTY: 'Age_type_id can not be an empty field'
    },
    NAME: {
      EMPTY: 'Age_type_name cannot be an empty field!',
      MAX_LENGTH: 'The length of age_type_name must be a string with a maximum 5!',
      FORMAT: 'Age_type_name must be a string!'
    },
    DESC: {
      EMPTY: 'Description cannot be an empty field!',
      MIN_LENGTH: 'The length of the parameter should be more than 3 character',
      FORMAT: 'Description must be a string'
    }
  }
}

module.exports = ValidateMessage
