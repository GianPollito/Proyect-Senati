import express from "express";
import { authControllers } from "../controllers/authControllers.js";
//import { autenticate } from "../middlewares/authMiddlewares.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *  securitySchemes:
 *    BearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 */

/**
 * @swagger
 * /api/auth/register:
 *  post:
 *    summary: Registrar nuevo usuario
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                example: giangarb@gmail.com
 *              name:
 *                type: string
 *                example: Gian Garb
 *              password:
 *                type: string
 *                example: Gian Patitotito
 *    responses:
 *      201:
 *        description: Usuario registrado exitosamente
 *      400:
 *        description: Datos enviados incorrectos
 *      500:
 *        description: Error interno del servidor
 */

router.post("/register", authControllers.register);

export default router;