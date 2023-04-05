const nodemailer = require('nodemailer')
const { emailAppPassword, emailName } = require('../config')

const sendMail = async ({ email, html }) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: emailName,
      pass: emailAppPassword
    }
  })
  let info = await transporter.sendMail({
    from: '"Cybersoft" <no-relply@cybersoft.com>',
    to: email,
    subject: 'Forgot password',
    html: html
  })

  return info
}

module.exports = sendMail
