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
  }
}
module.exports = helpers
