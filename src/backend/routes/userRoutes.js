import express from 'express';
import { userController } from '../controllers/userController.js';

const router = express.Router();
/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          example: 1
 *        email:
 *          type: string
 *          example: 1644218@senati.pe
 *        name:
 *          type: string
 *          example: Gian Pollito
 */

//Rutas para llamar al usuario
router.get('/',userController.getUsers);

/**
 * @swagger
 * /api/users:
 *  get:
 *    summary: Obtener todos los usuarios
 *    tags: [Users]
 *    responses:
 *      200:
 *        description: OK
 */

router.post('/',userController.createUser);

/**
 * @swagger
 * /api/users:
 *  post:
 *    summary: Crear nuevo usuario
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                example: 1644218@senati.pe
 *              name:
 *                type: string
 *                example: Gian Pollito
 *    responses:
 *      201:
 *        description: Usuario creado correctamente
 *        content:
 *          application/json:
 *            $ref: '#/components/schemas/User'
 *      400:
 *        description: Datos invalidos
 *      500:
 *        description: Error del servidor
 */

router.put('/:id', userController.updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *  put:
 *    summary: Actualizar usuario
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *        description: id del usuario que se desea actualizar
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                example: giang@gmail.com
 *              name:
 *                type: string
 *                example: gian
 *    responses:
 *      201:
 *        description: Actualizado correctamente
 *        content:
 *          application/json:
 *            $ref: '#/components/schemas/User'
 *      400:
 *        description: Datos invalidos
 *      500:
 *        description: Error del servidor
*/

router.delete('/:name', userController.deleteUser);

//Metodo para eliminar DELETE
//Metodo para modificar PATCH

export default router;
