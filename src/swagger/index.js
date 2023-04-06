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
