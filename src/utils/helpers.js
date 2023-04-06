const moment = require('moment')
const helpers = {
  regexPassword: /^(?=.*\d)(?=.*[A-Z])(?=.*[@$!%*#?&])([a-zA-Z0-9@$!%*#?&]){8,}$/,
  regexPhoneNumber: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
  profileUser: (data) => {
    let { user_id, account, name, email, mobile_no, gender, user_type_user_user_typeTouser_type } = data
    let { user_type, type_name } = user_type_user_user_typeTouser_type
    let userSchema = {
      user_id,
      account,
      name,
      email,
      mobile_no,
      gender: gender === true ? 'male' : 'female',
      user_type,
      type_name
    }
    return userSchema
  },
  movieLikeLst: (detailsLikeLst) => {
    let likeLstNew = []
    detailsLikeLst.forEach((item) => {
      let { movie, date_like } = item
      let { movie_id, movie_name, alias, trailer, poster, runtime, release_date } = movie
      let newMovieSchema = {
        movie_id,
        movie_details: {
          movie_name,
          alias,
          trailer,
          poster,
          runtime,
          release_date
        },
        date_like
      }
      likeLstNew.push(newMovieSchema)
    })
    return likeLstNew
  },
  movieRatingLst: (detailsRatingLst) => {
    let ratingLstNew = []
    detailsRatingLst.forEach((item) => {
      let { amount, movie, date_rate } = item
      let { movie_id, movie_name, alias, trailer, poster, runtime, release_date } = movie
      let newMovieSchema = {
        movie_id,
        amount,
        movie_details: {
          movie_name,
          alias,
          trailer,
          poster,
          runtime,
          release_date
        },
        date_rate
      }
      ratingLstNew.push(newMovieSchema)
    })
    return ratingLstNew
  },
  profileUserLike: (likeLst) => {
    return likeLst.map((item) => {
      let { user_id, date_like, user } = item
      let { account, name, email, mobile_no, gender, user_type, avatar, created_at } = user
      return {
        user_id,
        profile: {
          account,
          name,
          email,
          mobile_no,
          gender: gender === true ? 'male' : 'female',
          user_type: user_type === 'USER' ? 'Người dùng' : 'Người Quản Trị',
          avatar,
          created_at
        },
        date_like
      }
    })
  },
  profileUserRating: (rateLst) => {
    return rateLst.map((item) => {
      let { user_id, date_rate, amount, user } = item
      let { account, name, email, mobile_no, gender, user_type, avatar, created_at } = user
      return {
        user_id,
        amount,
        profile: {
          account,
          name,
          email,
          mobile_no,
          gender: gender === true ? 'male' : 'female',
          user_type: user_type === 'USER' ? 'Người dùng' : 'Người Quản Trị',
          avatar,
          created_at
        },
        date_rate
      }
    })
  },
  getDatesInRange: (startDate, endDate) => {
    const date = new Date(startDate.getTime())
    const dates = []
    while (date <= endDate) {
      dates.push(moment(new Date(date)).format('DD/MM/YYYY'))
      date.setDate(date.getDate() + 1)
    }
    return dates
  }
}
module.exports = helpers
