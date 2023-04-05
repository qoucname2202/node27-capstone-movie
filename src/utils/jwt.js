const bcrypt = require('bcrypt')
const { PrismaClient } = require('@prisma/client')
const model = new PrismaClient()
const RessponseMessage = require('../constants/response')
const { hashRounds } = require('../config')

const hashPassword = (pass) => {
  return bcrypt.hashSync(pass, Number(hashRounds))
}

module.exports = {
  hashPassword
}
