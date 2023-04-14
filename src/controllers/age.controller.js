const RessponseMessage = require('../constants/response')
const validators = require('../middlewares/validation.middleware')
const { PrismaClient } = require('@prisma/client')
const model = new PrismaClient()
const moment = require('moment')

const ageTypeController = {
  // Get all age type
  getAllAgeType: async (req, res) => {
    try {
      let ageTypeLst = await model.age_type.findMany()
      let result = ageTypeLst.map((ageItem) => {
        let { is_removed, ...other } = ageItem
        let { age_id, age_type_name, description, created_at } = other
        return {
          age_id,
          age_name: age_type_name,
          description,
          created_at
        }
      })
      return RessponseMessage.success(res, result, 'Get all age type successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Get age type by age_type_id
  getAgeTypeById: async (req, res) => {
    try {
      let { age_id } = req.query
      let { error } = await validators.ageTypeIdValidate({ age_id: Number(age_id) })
      if (!error) {
        let ageTypeExist = await model.age_type.findUnique({
          where: {
            age_id: Number(age_id)
          }
        })
        if (ageTypeExist) {
          let result = await model.age_type.findUnique({
            where: {
              age_id: Number(age_id)
            }
          })
          if (result) {
            let { is_removed, ...itemRes } = result
            return RessponseMessage.success(res, itemRes, 'Successfully!')
          }
        } else {
          return RessponseMessage.badRequest(res, '', 'Age type does not exist!')
        }
      } else {
        return RessponseMessage.badRequest(res, '', error.details[0].message)
      }
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Insert age
  insertAgeType: async (req, res) => {
    try {
      let { error, value } = await validators.ageTypeValidate(req.body)
      if (!error) {
        let ageTypeExist = await model.age_type.findFirst({
          where: {
            age_type_name: value?.age_type_name
          }
        })
        if (!ageTypeExist) {
          let ageTypeSchema = {
            age_type_name: value?.age_type_name,
            description: value?.description,
            created_at: moment().format('YYYY-MM-DDTHH:mm:ss.SSSSSZ')
          }
          let result = await model.age_type.create({ data: value })
          if (result) {
            return RessponseMessage.created(res, ageTypeSchema, 'Insert age type successfully!')
          }
        } else {
          return RessponseMessage.badRequest(res, '', 'Age type has already!')
        }
      } else {
        return RessponseMessage.badRequest(res, '', error.details[0].message)
      }
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Update age
  updateAgeType: async (req, res) => {
    try {
      let { age_id, age_type_name } = req.query
      let { description } = req.body
      let ageTypeExist = await model.age_type.findFirst({
        where: {
          age_id: Number(age_id),
          age_type_name: age_type_name
        }
      })
      if (ageTypeExist) {
        let { error, value } = await validators.updateAgeTypeValidate({ description })
        if (!error) {
          let result = await model.age_type.update({
            where: {
              age_id: Number(age_id)
            },
            data: {
              description: value?.description
            }
          })
          if (result) {
            return RessponseMessage.success(
              res,
              {
                description
              },
              'Update age_type successfully!'
            )
          }
        } else {
          return RessponseMessage.badRequest(res, '', error.details[0].message)
        }
      } else {
        return RessponseMessage.badRequest(res, '', 'Age type does not exist!')
      }
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Delete age
  deleteAgeType: async (req, res) => {
    try {
      let { age_id } = req.query
      let { error } = await validators.ageTypeIdValidate({ age_id: Number(age_id) })
      if (!error) {
        let ageTypeExist = await model.age_type.findUnique({
          where: {
            age_id: Number(age_id)
          }
        })
        if (ageTypeExist) {
          let result = await model.age_type.delete({
            where: {
              age_id: +age_id
            }
          })
          if (result) {
            return RessponseMessage.success(res, 'Delete age_type successfully!')
          }
        } else {
          return RessponseMessage.badRequest(
            res,
            {
              age_id: +age_id
            },
            'Age type does not exist!'
          )
        }
      } else {
        return RessponseMessage.badRequest(res, '', error.details[0].message)
      }
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Get movie by age type
  getMovieByAgeType: async (req, res) => {
    try {
      let { age_id } = req.query
      let { error } = await validators.ageTypeIdValidate({ age_id: Number(age_id) })
      if (!error) {
        let ageTypeExist = await model.age_type.findUnique({
          where: {
            age_id: Number(age_id)
          }
        })
        if (ageTypeExist) {
          let movieLst = await model.movie.findMany({
            where: {
              age_id: +age_id
            },
            include: {
              age_type: true
            }
          })
          let result = movieLst.map((movieItem) => {
            let { age_type, ...other } = movieItem
            let { age_type_name, description } = age_type
            let { updated_at, is_removed, country, backdrops, age_id, overview, ...movie } = other
            return {
              ...movie,
              age_type: {
                type_name: age_type_name,
                desc: description
              }
            }
          })
          if (result) {
            return RessponseMessage.success(res, result, 'Successfully!')
          }
        } else {
          return RessponseMessage.badRequest(
            res,
            {
              age_id: +age_id
            },
            'Age type does not exist!'
          )
        }
      } else {
        return RessponseMessage.badRequest(res, '', error.details[0].message)
      }
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  }
}

module.exports = ageTypeController
