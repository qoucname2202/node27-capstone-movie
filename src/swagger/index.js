/**
 * @swagger
 * /api/v1/auth/signup:
 *  post:
 *      tags: [Auth]
 *      parameters:
 *      - in: body
 *        name: model
 *        schema:
 *           properties:
 *             account:
 *               type: string
 *             password:
 *               type: string
 *             confirmPassword:
 *               type: string
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             mobile_no:
 *               type: string
 *             gender:
 *               type: string
 *      responses:
 *          200:
 *              description: Success
 */

/**
 * @swagger
 * /api/v1/auth/signin:
 *  post:
 *      tags: [Auth]
 *      parameters:
 *      - in: body
 *        name: model
 *        schema:
 *           properties:
 *             account:
 *               type: string
 *             password:
 *               type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/auth/signout:
 *  post:
 *      tags: [Auth]
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/users/all-user:
 *  get:
 *      tags: [User]
 *      parameters:
 *       - in: query
 *         name: keyword
 *         type: string
 *       - in: header
 *         description: Please enter Bearer [token]
 *         name: Authorization
 *         required: true
 *         type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/users/user-types:
 *  get:
 *      tags: [User]
 *      parameters:
 *       - in: header
 *         description: Please enter Bearer [token]
 *         name: Authorization
 *         required: true
 *         type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/users/pagination:
 *  get:
 *      tags: [User]
 *      parameters:
 *       - in: query
 *         name: keyword
 *         type: string
 *       - in: query
 *         name: page
 *         type: integer
 *       - in: query
 *         name: limit
 *         type: integer
 *       - in: header
 *         description: Please enter Bearer [token]
 *         name: Authorization
 *         required: true
 *         type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/users/search:
 *  get:
 *      tags: [User]
 *      parameters:
 *       - in: query
 *         name: keyword
 *         type: string
 *       - in: header
 *         description: Please enter Bearer [token]
 *         name: Authorization
 *         required: true
 *         type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/users/search-paging:
 *  get:
 *      tags: [User]
 *      parameters:
 *       - in: query
 *         name: keyword
 *         type: string
 *       - in: query
 *         name: page
 *         type: integer
 *         default: 1
 *       - in: query
 *         name: limit
 *         type: integer
 *         default: 1
 *       - in: header
 *         description: Please enter Bearer [token]
 *         name: Authorization
 *         required: true
 *         type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/users/profile:
 *  get:
 *      tags: [User]
 *      parameters:
 *       - in: header
 *         description: Please enter Bearer [token]
 *         name: Authorization
 *         required: true
 *         type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/users/account:
 *  get:
 *      tags: [User]
 *      parameters:
 *       - in: query
 *         name: keyword
 *         type: string
 *       - in: header
 *         description: Please enter Bearer [token]
 *         name: Authorization
 *         required: true
 *         type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/users/movie-favorite:
 *  get:
 *      tags: [User]
 *      parameters:
 *       - in: header
 *         description: Please enter Bearer [token]
 *         name: Authorization
 *         required: true
 *         type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/users/movie-rating:
 *  get:
 *      tags: [User]
 *      parameters:
 *       - in: header
 *         description: Please enter Bearer [token]
 *         name: Authorization
 *         required: true
 *         type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/users/forgot-password:
 *  get:
 *      tags: [User]
 *      parameters:
 *       - in: query
 *         name: email
 *         type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/users/refresh-token:
 *  post:
 *      tags: [User]
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/users/reset-password:
 *  put:
 *      tags: [User]
 *      parameters:
 *      - in: body
 *        name: model
 *        schema:
 *           properties:
 *             newPassword:
 *               type: string
 *             confirmNewPassword:
 *               type: string
 *             token:
 *               type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/users/insert:
 *  post:
 *      tags: [User]
 *      parameters:
 *      - in: body
 *        name: model
 *        schema:
 *           properties:
 *             account:
 *               type: string
 *             password:
 *               type: string
 *             confirmPassword:
 *               type: string
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             mobile_no:
 *               type: string
 *             gender:
 *               type: string
 *             user_type:
 *               type: string
 *      - in: header
 *        description: Please enter Bearer [token]
 *        name: Authorization
 *        required: true
 *        type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/users/update:
 *  put:
 *      tags: [User]
 *      parameters:
 *      - in: body
 *        name: model
 *        schema:
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             mobile_no:
 *               type: string
 *             gender:
 *               type: string
 *      - in: header
 *        description: Please enter Bearer [token]
 *        name: Authorization
 *        required: true
 *        type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/users/update-admin:
 *  put:
 *      tags: [User]
 *      parameters:
 *      - in: query
 *        name: account
 *        type: string
 *      - in: body
 *        name: model
 *        schema:
 *           properties:
 *             account:
 *               type: string
 *             password:
 *               type: string
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             mobile_no:
 *               type: string
 *             gender:
 *               type: string
 *             user_type:
 *               type: string
 *      - in: header
 *        description: Please enter Bearer [token]
 *        name: Authorization
 *        required: true
 *        type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/users/delete:
 *  delete:
 *      tags: [User]
 *      parameters:
 *      - in: query
 *        name: account
 *        type: string
 *      - in: header
 *        description: Please enter Bearer [token]
 *        name: Authorization
 *        required: true
 *        type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/users/like:
 *  post:
 *      tags: [User]
 *      parameters:
 *      - in: query
 *        name: movie_id
 *        type: integer
 *      - in: header
 *        description: Please enter Bearer [token]
 *        name: Authorization
 *        required: true
 *        type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/users/unlike:
 *  post:
 *      tags: [User]
 *      parameters:
 *      - in: query
 *        name: movie_id
 *        type: integer
 *      - in: header
 *        description: Please enter Bearer [token]
 *        name: Authorization
 *        required: true
 *        type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/users/rating:
 *  post:
 *      tags: [User]
 *      parameters:
 *      - in: query
 *        name: movie_id
 *        type: integer
 *      - in: body
 *        name: model
 *        schema:
 *           properties:
 *             amount:
 *               type: integer
 *      - in: header
 *        description: Please enter Bearer [token]
 *        name: Authorization
 *        required: true
 *        type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/users/upload-avatar:
 *  post:
 *      tags: [User]
 *      consumes:
 *         multipart/form-data
 *      parameters:
 *       - in: header
 *         description: Please enter Bearer [token]
 *         name: Authorization
 *         required: true
 *         type: string
 *       - in: formData
 *         description: The uploaded file data
 *         name: avatarURL
 *         required: true
 *         type: file
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/users/test-token:
 *  post:
 *      tags: [User]
 *      parameters:
 *       - in: header
 *         description: Please enter Bearer [token]
 *         name: Authorization
 *         required: true
 *         type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/movies/banner:
 *  get:
 *      tags: [Movie]
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/movies/search:
 *  get:
 *      tags: [Movie]
 *      parameters:
 *       - in: query
 *         name: movie_name
 *         type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/movies/all-movie:
 *  get:
 *      tags: [Movie]
 *      parameters:
 *       - in: query
 *         name: movie_name
 *         type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/movies/pagination:
 *  get:
 *      tags: [Movie]
 *      parameters:
 *       - in: query
 *         name: keyword
 *         type: string
 *       - in: query
 *         name: page
 *         type: integer
 *       - in: query
 *         name: limit
 *         type: integer
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/movies/users-like:
 *  get:
 *      tags: [Movie]
 *      parameters:
 *      - in: query
 *        name: movie_id
 *        type: integer
 *      - in: header
 *        description: Please enter Bearer [token]
 *        name: Authorization
 *        required: true
 *        type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/movies/users-rating:
 *  get:
 *      tags: [Movie]
 *      parameters:
 *      - in: query
 *        name: movie_id
 *        type: integer
 *      - in: header
 *        description: Please enter Bearer [token]
 *        name: Authorization
 *        required: true
 *        type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/movies/paging-movie-by-date:
 *  get:
 *      tags: [Movie]
 *      parameters:
 *       - in: query
 *         name: fromDate
 *         type: string
 *       - in: query
 *         name: toDate
 *         type: string
 *       - in: header
 *         description: Please enter Bearer [token]
 *         name: Authorization
 *         required: true
 *         type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/movies/directors:
 *  get:
 *      tags: [Movie]
 *      parameters:
 *       - in: query
 *         name: movie_id
 *         type: integer
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/movies/genres:
 *  get:
 *      tags: [Movie]
 *      parameters:
 *       - in: query
 *         name: movie_id
 *         type: integer
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/movies/tags:
 *  get:
 *      tags: [Movie]
 *      parameters:
 *       - in: query
 *         name: movie_id
 *         type: integer
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/movies/upload-poster:
 *  post:
 *      tags: [Movie]
 *      consumes:
 *         multipart/form-data
 *      parameters:
 *       - in: query
 *         name: movie_id
 *         type: integer
 *       - in: formData
 *         description: The uploaded file data
 *         name: posterURL
 *         required: true
 *         type: file
 *       - in: header
 *         description: Please enter Bearer [token]
 *         name: Authorization
 *         required: true
 *         type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/movies/upload-backdrops:
 *  post:
 *      tags: [Movie]
 *      consumes:
 *         multipart/form-data
 *      parameters:
 *       - in: query
 *         name: movie_id
 *         type: integer
 *       - in: formData
 *         description: The uploaded file data
 *         name: backdropsURL
 *         required: true
 *         type: file
 *       - in: header
 *         description: Please enter Bearer [token]
 *         name: Authorization
 *         required: true
 *         type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/movies/insert:
 *  post:
 *      tags: [Movie]
 *      parameters:
 *      - in: body
 *        name: model
 *        schema:
 *           properties:
 *             movie_name:
 *               type: string
 *             trailer:
 *               type: string
 *             overview:
 *               type: string
 *             runtime:
 *               type: number
 *             age_id:
 *               type: number
 *             release_date:
 *               type: string
 *             comming_soon:
 *               type: string
 *             now_showing:
 *               type: string
 *      - in: header
 *        description: Please enter Bearer [token]
 *        name: Authorization
 *        required: true
 *        type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/movies/update:
 *  put:
 *      tags: [Movie]
 *      parameters:
 *      - in: query
 *        name: movie_id
 *        type: integer
 *      - in: body
 *        name: model
 *        schema:
 *           properties:
 *             movie_name:
 *               type: string
 *             trailer:
 *               type: string
 *             short_desc:
 *               type: string
 *             overview:
 *               type: string
 *             poster:
 *               type: string
 *             backdrops:
 *               type: string
 *             runtime:
 *               type: number
 *             country:
 *               type: string
 *             language:
 *               type: string
 *             age_id:
 *               type: number
 *             release_date:
 *               type: string
 *             hot:
 *               type: boolean
 *               default: false
 *             comming_soon:
 *               type: boolean
 *             now_showing:
 *               type: boolean
 *               default: false
 *      - in: header
 *        description: Please enter Bearer [token]
 *        name: Authorization
 *        required: true
 *        type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/movies/delete:
 *  delete:
 *      tags: [Movie]
 *      parameters:
 *      - in: query
 *        name: movie_id
 *        type: integer
 *      - in: header
 *        description: Please enter Bearer [token]
 *        name: Authorization
 *        required: true
 *        type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/actors/all-actor:
 *  get:
 *      tags: [Actor]
 *      parameters:
 *       - in: query
 *         name: actor_name
 *         type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/actors/insert:
 *  post:
 *      tags: [Actor]
 *      parameters:
 *      - in: body
 *        name: model
 *        schema:
 *           properties:
 *             full_name:
 *               type: string
 *             gender:
 *               type: string
 *             birth_day:
 *               type: string
 *             place_of_birth:
 *               type: string
 *             bio:
 *               type: string
 *             avatar:
 *               type: string
 *      - in: header
 *        description: Please enter Bearer [token]
 *        name: Authorization
 *        required: true
 *        type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/actors/update:
 *  put:
 *      tags: [Actor]
 *      parameters:
 *      - in: query
 *        name: actor_id
 *        type: integer
 *      - in: body
 *        name: model
 *        schema:
 *           properties:
 *             full_name:
 *               type: string
 *             alias:
 *               type: string
 *             gender:
 *               type: string
 *             birth_day:
 *               type: string
 *             place_of_birth:
 *               type: string
 *             bio:
 *               type: string
 *             avatar:
 *               type: string
 *      - in: header
 *        description: Please enter Bearer [token]
 *        name: Authorization
 *        required: true
 *        type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/actors/delete:
 *  delete:
 *      tags: [Actor]
 *      parameters:
 *      - in: query
 *        name: actor_id
 *        type: integer
 *      - in: header
 *        description: Please enter Bearer [token]
 *        name: Authorization
 *        required: true
 *        type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/actors/profile:
 *  get:
 *      tags: [Actor]
 *      parameters:
 *      - in: query
 *        name: actor_id
 *        type: integer
 *      - in: header
 *        description: Please enter Bearer [token]
 *        name: Authorization
 *        required: true
 *        type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/actors/movie-acting:
 *  get:
 *      tags: [Actor]
 *      parameters:
 *      - in: query
 *        name: actor_id
 *        type: integer
 *      - in: header
 *        description: Please enter Bearer [token]
 *        name: Authorization
 *        required: true
 *        type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/actors/upload-avatar:
 *  post:
 *      tags: [Actor]
 *      consumes:
 *         multipart/form-data
 *      parameters:
 *       - in: query
 *         name: actor_id
 *         type: integer
 *       - in: header
 *         description: Please enter Bearer [token]
 *         name: Authorization
 *         required: true
 *         type: string
 *       - in: formData
 *         description: The uploaded file avatar actor
 *         name: actURL
 *         required: true
 *         type: file
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/comments/all-comment:
 *  get:
 *      tags: [Comment]
 *      parameters:
 *       - in: query
 *         name: movie_id
 *         type: integer
 *       - in: header
 *         description: Please enter Bearer [token]
 *         name: Authorization
 *         required: true
 *         type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/comments/insert:
 *  post:
 *      tags: [Comment]
 *      parameters:
 *      - in: body
 *        name: model
 *        schema:
 *           properties:
 *             movie_id:
 *               type: integer
 *             content:
 *               type: string
 *      - in: header
 *        description: Please enter Bearer [token]
 *        name: Authorization
 *        required: true
 *        type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/comments/update:
 *  put:
 *      tags: [Comment]
 *      parameters:
 *      - in: query
 *        name: comment_id
 *        type: integer
 *      - in: body
 *        name: model
 *        schema:
 *           properties:
 *             movie_id:
 *               type: integer
 *             content:
 *               type: string
 *             comment_star:
 *               type: integer
 *      - in: header
 *        description: Please enter Bearer [token]
 *        name: Authorization
 *        required: true
 *        type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/comments/delete:
 *  delete:
 *      tags: [Comment]
 *      parameters:
 *      - in: query
 *        name: comment_id
 *        type: integer
 *      - in: header
 *        description: Please enter Bearer [token]
 *        name: Authorization
 *        required: true
 *        type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/comments/users:
 *  get:
 *      tags: [Comment]
 *      parameters:
 *       - in: query
 *         name: movie_id
 *         type: integer
 *       - in: header
 *         description: Please enter Bearer [token]
 *         name: Authorization
 *         required: true
 *         type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/ages/all:
 *  get:
 *      tags: [Age]
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/ages/type:
 *  get:
 *      tags: [Age]
 *      parameters:
 *       - in: query
 *         name: age_id
 *         type: integer
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/ages/insert:
 *  post:
 *      tags: [Age]
 *      parameters:
 *      - in: body
 *        name: model
 *        schema:
 *           properties:
 *             age_type_name:
 *               type: integer
 *             description:
 *               type: string
 *      - in: header
 *        description: Please enter Bearer [token]
 *        name: Authorization
 *        required: true
 *        type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/ages/update:
 *  put:
 *      tags: [Age]
 *      parameters:
 *      - in: query
 *        name: age_id
 *        type: integer
 *      - in: query
 *        name: age_type_name
 *        type: string
 *      - in: body
 *        name: model
 *        schema:
 *           properties:
 *             description:
 *               type: string
 *      - in: header
 *        description: Please enter Bearer [token]
 *        name: Authorization
 *        required: true
 *        type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/ages/delete:
 *  delete:
 *      tags: [Age]
 *      parameters:
 *      - in: query
 *        name: age_id
 *        type: integer
 *      - in: header
 *        description: Please enter Bearer [token]
 *        name: Authorization
 *        required: true
 *        type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/ages/movies:
 *  get:
 *      tags: [Age]
 *      parameters:
 *       - in: query
 *         name: age_id
 *         type: integer
 *       - in: header
 *         description: Please enter Bearer [token]
 *         name: Authorization
 *         required: true
 *         type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/genres/all-genres:
 *  get:
 *      tags: [Genres]
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/genres/search:
 *  get:
 *      tags: [Genres]
 *      parameters:
 *      - in: query
 *        name: genres_id
 *        type: integer
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/genres/insert:
 *  post:
 *      tags: [Genres]
 *      parameters:
 *      - in: body
 *        name: model
 *        schema:
 *           properties:
 *             genres_type:
 *               type: string
 *      - in: header
 *        description: Please enter Bearer [token]
 *        name: Authorization
 *        required: true
 *        type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/genres/update:
 *  put:
 *      tags: [Genres]
 *      parameters:
 *      - in: query
 *        name: genres_id
 *        type: integer
 *      - in: body
 *        name: model
 *        schema:
 *           properties:
 *             genres_type:
 *               type: string
 *      - in: header
 *        description: Please enter Bearer [token]
 *        name: Authorization
 *        required: true
 *        type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/genres/delete:
 *  delete:
 *      tags: [Genres]
 *      parameters:
 *      - in: query
 *        name: genres_id
 *        type: integer
 *      - in: header
 *        description: Please enter Bearer [token]
 *        name: Authorization
 *        required: true
 *        type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/genres/movies:
 *  get:
 *      tags: [Genres]
 *      parameters:
 *      - in: query
 *        name: genres_id
 *        type: integer
 *      - in: header
 *        description: Please enter Bearer [token]
 *        name: Authorization
 *        required: true
 *        type: string
 *      responses:
 *          200:
 *              description: success
 */
