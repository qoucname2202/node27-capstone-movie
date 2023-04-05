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
