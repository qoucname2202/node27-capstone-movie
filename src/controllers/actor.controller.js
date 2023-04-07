const RessponseMessage = require('../constants/response')
const validators = require('../middlewares/validation.middleware')
const { PrismaClient } = require('@prisma/client')
const model = new PrismaClient()
const moment = require('moment')
const slugify = require('slugify')

const actorController = {
  // Get all actor
  getAllActor: async (req, res) => {
    try {
      let { actor_name } = req.query
      let actorLst = await model.actor.findMany({
        where: {
          full_name: {
            contains: actor_name || ''
          }
        }
      })
      let result = actorLst.map((actorItem) => {
        let { act_id, full_name, alias, gender, birth_day, place_of_birth, avatar, bio, created_at } = actorItem
        let actorSchema = {
          act_id,
          act_name: full_name,
          alias,
          gender: gender === true ? 'male' : 'female',
          birth_day: moment(birth_day).format('DD/MM/YYYY'),
          place_of_birth,
          avatar,
          bio,
          created_at
        }
        return actorSchema
      })
      return RessponseMessage.success(res, result, 'Get all actor successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Insert actor
  insertActor: async (req, res) => {
    try {
      let { error, value } = await validators.insertActorValidate(req.body)
      if (!error) {
        let { full_name, gender, birth_day, place_of_birth, bio, avatar } = value
        let alias = slugify(full_name, { replacement: '-', remove: undefined, lower: true, trim: true })
        let actorSchema = {
          full_name,
          alias,
          gender: gender === 'male' ? true : false,
          birth_day: moment(birth_day).format('YYYY/MM/DD'),
          place_of_birth,
          bio,
          avatar,
          created_at: moment().format('YYYY-MM-DDTHH:mm:ss.SSSSSZ')
        }
        let result = await model.actor.create({ data: actorSchema })
        return RessponseMessage.success(res, result, 'Insert actor successfully!')
      } else {
        return RessponseMessage.badRequest(res, '', error.details[0].message)
      }
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Update actor
  updateActor: async (req, res) => {
    try {
      let { actor_id } = req.query
      let actorExist = await model.actor.findUnique({
        where: {
          act_id: Number(actor_id)
        }
      })
      if (actorExist) {
        let { error, value } = await validators.updateActorValidate(req.body)
        if (!error) {
          let { full_name, gender, birth_day, place_of_birth, bio, avatar, alias } = value
          let actorSchema = {
            full_name,
            alias,
            gender: gender === 'male' ? true : false,
            birth_day: moment(birth_day).format('YYYY/MM/DD'),
            place_of_birth,
            bio,
            avatar,
            updated_at: moment().format('YYYY-MM-DDTHH:mm:ss.SSSSSZ')
          }
          let result = await model.actor.update({
            where: {
              act_id: Number(actor_id)
            },
            data: actorSchema
          })
          return RessponseMessage.success(res, result, 'Update actor successfully!')
        } else {
          return RessponseMessage.badRequest(res, '', error.details[0].message)
        }
      } else {
        return RessponseMessage.badRequest(res, '', 'Actor does not exists!')
      }
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Delete actor
  deleteActor: async (req, res) => {
    try {
      let { actor_id } = req.query
      let { error, value } = await validators.actorIdValidate({ actor_id })
      if (!error) {
        let checkActor = await model.actor.findUnique({
          where: {
            act_id: Number(actor_id)
          }
        })
        if (checkActor) {
          await model.actor.delete({
            where: {
              act_id: Number(actor_id)
            }
          })
          return RessponseMessage.success(res, '', 'Delete actor successfully!')
        } else {
          return RessponseMessage.conflict(
            res,
            {
              actor_id: actor_id
            },
            'Actor does not exists!'
          )
        }
      } else {
        return RessponseMessage.badRequest(res, '', error.details[0].message)
      }
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Get profile actor
  getProfileActor: async (req, res) => {
    try {
      let { actor_id } = req.query
      let { error, value } = await validators.actorIdValidate({ actor_id })
      if (!error) {
        let actorExist = await model.actor.findUnique({
          where: {
            act_id: Number(actor_id)
          },
          select: {
            act_id: true,
            full_name: true,
            alias: true,
            gender: true,
            birth_day: true,
            place_of_birth: true,
            avatar: true,
            bio: true,
            created_at: true
          }
        })
        if (actorExist !== null) {
          let { act_id, full_name, alias, gender, birth_day, place_of_birth, avatar, bio, created_at } = actorExist
          let actorSchema = {
            actor_id: act_id,
            actor_name: full_name,
            alias,
            gender: gender === true ? 'male' : 'female',
            birth_day: moment(birth_day).format('DD/MM/YYYY'),
            place_of_birth,
            avatar,
            bio,
            created_at
          }
          return RessponseMessage.success(res, actorSchema, 'Successfully!')
        } else {
          return RessponseMessage.badRequest(res, '', 'Actor does not exist!')
        }
      } else {
        return RessponseMessage.badRequest(res, '', error.details[0].message)
      }
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Get movie list actor is acting
  getMovieActing: async (req, res) => {
    try {
      let { actor_id } = req.query
      let { error } = await validators.actorIdValidate({ actor_id })
      if (!error) {
        let actorExist = await model.actor.findUnique({
          where: {
            act_id: Number(actor_id)
          }
        })
        if (actorExist) {
          let movieCastLst = await model.movie_cast.findMany({
            where: {
              act_id: Number(actor_id)
            },
            include: {
              movie: true
            }
          })
          let result = movieCastLst.map((item) => {
            let { updated_at, is_removed, overview, backdrops, language, country, hot, age_id, ...movieItem } =
              item.movie
            return movieItem
          })
          return RessponseMessage.success(res, result, 'Successfully')
        } else {
          return RessponseMessage.badRequest(res, '', 'Actor does not exist!')
        }
      } else {
        return RessponseMessage.badRequest(res, '', error.details[0].message)
      }
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  }
}

module.exports = actorController
