const helpers = {
  regexPassword: /^(?=.*\d)(?=.*[A-Z])(?=.*[@$!%*#?&])([a-zA-Z0-9@$!%*#?&]){8,}$/,
  regexPhoneNumber: /(84|0[3|5|7|8|9])+([0-9]{8})\b/
}
module.exports = helpers
