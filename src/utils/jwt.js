const bcrypt = require('bcrypt')
const { PrismaClient } = require('@prisma/client')
const model = new PrismaClient()
const RessponseMessage = require('../constants/response')
const { hashRounds } = require('../config')

const hashPassword = (pass) => {
  return bcrypt.hashSync(pass, Number(hashRounds))
}

const isCorrectPassword = (pass, hashPassword) => {
  return bcrypt.compareSync(pass, hashPassword)
}

module.exports = {
  hashPassword,
  isCorrectPassword
}
