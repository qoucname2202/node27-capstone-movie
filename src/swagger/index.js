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
 * /api/v1/users/all-users:
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
 * /api/v1/users/refresh-token:
 *  post:
 *      tags: [User]
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
